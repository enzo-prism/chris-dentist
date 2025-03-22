import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertContactMessageSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
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
      const blogPosts = await storage.getBlogPosts();
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

  const httpServer = createServer(app);
  return httpServer;
}
