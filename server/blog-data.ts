import { type Blog } from "@shared/schema";
import { randomUUID } from "crypto";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

function loadBlogsFromDirectory(): Blog[] {
  const blogsDir = join(process.cwd(), "blogs");
  const files = readdirSync(blogsDir).filter(file => file.endsWith(".json"));
  
  const blogs: Blog[] = [];
  
  for (const file of files) {
    try {
      const filePath = join(blogsDir, file);
      const fileContent = readFileSync(filePath, "utf-8");
      const blogData = JSON.parse(fileContent);
      
      blogs.push({
        id: blogData.id || randomUUID(),
        slug: blogData.slug,
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: blogData.content,
        author: blogData.author || "AIBlaze Team",
        category: blogData.category,
        imagePath: blogData.imagePath,
        readTime: blogData.readTime || 5,
        featured: blogData.featured || 0,
        publishedAt: blogData.publishedAt,
      });
    } catch (error) {
      console.error(`Error loading blog file ${file}:`, error);
    }
  }
  
  return blogs;
}

export const blogData: Blog[] = loadBlogsFromDirectory();
