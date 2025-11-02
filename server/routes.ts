import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog routes
  app.get("/api/blogs", async (_req, res) => {
    try {
      const blogs = await storage.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/featured", async (_req, res) => {
    try {
      const blogs = await storage.getFeaturedBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured blogs" });
    }
  });

  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const blog = await storage.getBlogBySlug(req.params.slug);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });

  app.get("/api/blogs/related/:id", async (req, res) => {
    try {
      const relatedBlogs = await storage.getRelatedBlogs(req.params.id);
      res.json(relatedBlogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related blogs" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid form data", details: error });
      }
      res.status(500).json({ error: "Failed to submit message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
