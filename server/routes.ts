import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertContactMessageSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Robots.txt route
  app.get("/robots.txt", (_req: Request, res: Response) => {
    res.header('Content-Type', 'text/plain');
    res.send(`User-agent: *
Allow: /
Crawl-delay: 1

# Sitemap location
Sitemap: ${process.env.BASE_URL || `${_req.protocol}://${_req.get('host')}`}/sitemap.xml

# Disallow access to admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*?*

# Allow crawling of all public content
Allow: /
Allow: /about
Allow: /services
Allow: /patient-resources
Allow: /testimonials
Allow: /blog
Allow: /contact
Allow: /schedule
Allow: /dental-veneers
Allow: /dental-implants
Allow: /privacy-policy
Allow: /terms
Allow: /hipaa
Allow: /accessibility

# Specific bot instructions
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
Disallow: /`);
  });

  // Sitemap route
  app.get("/sitemap.xml", async (req: Request, res: Response) => {
    try {
      // Get dynamic content for the sitemap
      const [services, blogPosts] = await Promise.all([
        storage.getServices(),
        storage.getBlogPosts()
      ]);
      
      // Set the content type
      res.header('Content-Type', 'application/xml');
      
      // Get the base URL - always force HTTPS for production domains
      const host = req.get('host') || 'www.chriswongdds.com';
      let baseUrl = process.env.BASE_URL || 'https://www.chriswongdds.com';
      
      // Override to force HTTPS for production domains
      if (host && host.includes('chriswongdds.com')) {
        const normalizedHost = host.startsWith('www.') ? host : 'www.' + host;
        baseUrl = `https://${normalizedHost}`;
      } else if (!process.env.BASE_URL && !host.includes('chriswongdds.com')) {
        // For local development only
        baseUrl = `${req.protocol}://${host}`;
      }
      
      // Current date in format YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
      
      // Build the XML content
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      // Add static pages
      const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/about', priority: '0.8', changefreq: 'monthly' },
        { url: '/services', priority: '0.9', changefreq: 'weekly' },
        { url: '/dental-veneers', priority: '0.9', changefreq: 'monthly' },
        { url: '/dental-implants', priority: '0.9', changefreq: 'monthly' },
        { url: '/invisalign', priority: '0.9', changefreq: 'monthly' },
        { url: '/emergency-dental', priority: '1.0', changefreq: 'monthly' },
        { url: '/patient-resources', priority: '0.7', changefreq: 'monthly' },
        { url: '/testimonials', priority: '0.6', changefreq: 'monthly' },
        { url: '/patient-stories', priority: '0.7', changefreq: 'monthly' },
        { url: '/blog', priority: '0.8', changefreq: 'weekly' },
        { url: '/contact', priority: '0.7', changefreq: 'monthly' },
        { url: '/schedule', priority: '0.9', changefreq: 'weekly' },
        { url: '/thank-you', priority: '0.3', changefreq: 'monthly' },
        { url: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
        { url: '/terms', priority: '0.4', changefreq: 'yearly' },
        { url: '/hipaa', priority: '0.4', changefreq: 'yearly' },
        { url: '/accessibility', priority: '0.4', changefreq: 'yearly' }
      ];
      
      // Add static pages to the sitemap
      staticPages.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
      });
      
      // Add service pages using anchor links since they're on the services page
      services.forEach(service => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/services#${service.slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += '  </url>\n';
      });
      
      // Add blog post pages using anchor links since they're on the blog page
      blogPosts.forEach(post => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/blog#${post.slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += '  </url>\n';
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
