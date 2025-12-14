import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertContactMessageSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { seoByPath } from "@shared/seo";
import { getLegacyRedirectPath } from "@shared/redirects";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import fs from "fs";
import path from "path";

const SERVER_START_LASTMOD = new Date().toISOString().split("T")[0] ?? "";
const PRERENDERED_DIR = path.resolve(process.cwd(), "dist", "public", "prerendered");

function routeToPrerenderedFilename(route: string): string {
  if (route === "/") return "index.html";
  return `${route.replace(/^\//, "").replace(/\//g, "_")}.html`;
}

function formatLastmod(date: Date): string {
  const iso = date.toISOString();
  return iso.split("T")[0] ?? SERVER_START_LASTMOD;
}

function safeLastmodFromDateString(value: string | null | undefined): string | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return null;
  return formatLastmod(new Date(parsed));
}

function lastmodFromPrerendered(route: string): string | null {
  try {
    const filePath = path.join(PRERENDERED_DIR, routeToPrerenderedFilename(route));
    if (!fs.existsSync(filePath)) return null;
    const stats = fs.statSync(filePath);
    return stats.mtime ? formatLastmod(stats.mtime) : null;
  } catch {
    return null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Robots.txt route
  app.get("/robots.txt", (_req: Request, res: Response) => {
    res.header("Content-Type", "text/plain");
    res.header(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, max-age=0",
    );
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    res.send(`User-agent: *
Allow: /
Crawl-delay: 1

# Sitemap location
Sitemap: https://www.chriswongdds.com/sitemap.xml

# Preferred host to prevent duplicate content
Host: www.chriswongdds.com

# Disallow sensitive or duplicate areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*?*

# Explicitly allow public pages
Allow: /about
Allow: /services
Allow: /patient-resources
Allow: /testimonials
Allow: /patient-stories
Allow: /blog
Allow: /contact
Allow: /schedule
Allow: /zoom-whitening
Allow: /dental-veneers
Allow: /dental-implants
Allow: /invisalign
Allow: /emergency-dental
Allow: /privacy-policy
Allow: /terms
Allow: /hipaa
Allow: /accessibility

User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

# Block problematic bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /
`);
  });

  // Sitemap route
  app.get("/sitemap.xml", async (req: Request, res: Response) => {
    try {
      // Get dynamic content for the sitemap
      const blogPosts = await storage.getBlogPosts();
      
      // Set the content type
      res.header('Content-Type', 'application/xml');
      
      // Get the base URL - always use canonical https://www for production
      const host = req.get('host') || 'www.chriswongdds.com';
      const canonicalBase = 'https://www.chriswongdds.com';
      const baseUrl =
        host && host.includes('chriswongdds.com')
          ? canonicalBase
          : (process.env.BASE_URL || `${req.protocol}://${host}`);
      
      // Build the XML content
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      const noindexPaths = new Set<string>([
        "/thank-you",
        "/analytics",
        "/ga-test",
      ]);

      const priorityByPath: Record<string, string> = {
        "/": "1.0",
        "/services": "0.9",
        "/schedule": "0.9",
        "/blog": "0.8",
        "/about": "0.8",
        "/invisalign": "0.9",
        "/dental-veneers": "0.9",
        "/dental-implants": "0.9",
        "/emergency-dental": "1.0",
      };

      const changefreqByPath: Record<string, string> = {
        "/": "weekly",
        "/services": "weekly",
        "/schedule": "weekly",
        "/blog": "weekly",
      };

      const included = new Set<string>();
      const addUrl = (
        urlPath: string,
        priority: string,
        changefreq: string,
        lastmod: string,
      ) => {
        if (!urlPath.startsWith("/")) {
          urlPath = `/${urlPath}`;
        }
        if (noindexPaths.has(urlPath) || included.has(urlPath)) return;
        included.add(urlPath);
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${urlPath}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
      };

      const resolveSitemapPath = (urlPath: string): string => {
        const redirected = getLegacyRedirectPath(urlPath);
        const resolved = redirected ?? urlPath;
        return resolved.split("#")[0] ?? resolved;
      };

      const staticPaths = Array.from(
        new Set(
          Object.values(seoByPath).map((entry) => entry.canonicalPath),
        ),
      )
        .map((urlPath) => resolveSitemapPath(urlPath))
        .filter((urlPath) => urlPath && !noindexPaths.has(urlPath));

      staticPaths.forEach((urlPath) => {
        const priority = priorityByPath[urlPath] ?? "0.7";
        const changefreq = changefreqByPath[urlPath] ?? "monthly";
        const lastmod =
          lastmodFromPrerendered(urlPath) ??
          SERVER_START_LASTMOD;
        addUrl(urlPath, priority, changefreq, lastmod);
      });
      
      // Add blog post pages as canonical routes
      blogPosts.forEach((post) => {
        const route = `/blog/${post.slug}`;
        const lastmod =
          safeLastmodFromDateString(post.date) ??
          lastmodFromPrerendered(route) ??
          SERVER_START_LASTMOD;
        addUrl(route, "0.6", "monthly", lastmod);
      });
      
      // Close the XML
      xml += '</urlset>';
      
      // Send the response
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // API routes
  app.get("/api/services", async (req: Request, res: Response) => {
    try {
      const services = await storage.getServices();
      res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const service = await storage.getServiceBySlug(slug);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.status(200).json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.get("/api/blog-posts", async (req: Request, res: Response) => {
    try {
      const serviceFilter =
        typeof req.query.service === "string" ? req.query.service : undefined;
      const blogPosts = serviceFilter
        ? await storage.getBlogPostsByServiceSlug(serviceFilter)
        : await storage.getBlogPosts();
      res.status(200).json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const blogPost = await storage.getBlogPostBySlug(slug);
      
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.status(200).json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.status(200).json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/appointments", async (req: Request, res: Response) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error);
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating appointment:", error);
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error);
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Failed to create contact message" });
    }
  });

  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const subscriptionData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterSubscriptionByEmail(subscriptionData.email);
      
      if (existingSubscription) {
        return res.status(200).json({ 
          message: "Email already subscribed", 
          subscription: existingSubscription 
        });
      }
      
      const subscription = await storage.createNewsletterSubscription(subscriptionData);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error);
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating newsletter subscription:", error);
      res.status(500).json({ message: "Failed to create newsletter subscription" });
    }
  });

  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query parameter is required" });
      }
      
      const searchResults = await storage.search(query);
      res.status(200).json(searchResults);
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ message: "Failed to perform search" });
    }
  });

  // Analytics API routes - Get all appointments
  app.get("/api/appointments", async (_req: Request, res: Response) => {
    try {
      const appointments = await storage.getAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  // Analytics API routes - Get all contact messages
  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const contacts = await storage.getContactMessages();
      res.status(200).json(contacts);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
