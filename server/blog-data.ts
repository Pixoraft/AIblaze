import { type Blog } from "@shared/schema";
import { randomUUID } from "crypto";

import blog1 from "../blogs/blog-10-best-ai-tools-to-earn-money-2025.json" with { type: "json" };
import blog2 from "../blogs/blog-ai-chrome-extensions-save-hours.json" with { type: "json" };
import blog3 from "../blogs/blog-ai-tools-replace-employees.json" with { type: "json" };
import blog4 from "../blogs/blog-ai-vs-human-creativity-who-wins.json" with { type: "json" };
import blog5 from "../blogs/blog-build-personal-brand-using-ai.json" with { type: "json" };
import blog6 from "../blogs/blog-create-website-using-ai-30-minutes.json" with { type: "json" };
import blog7 from "../blogs/blog-future-jobs-ai-skills-highest-pay.json" with { type: "json" };
import blog8 from "../blogs/blog-start-freelancing-with-chatgpt.json" with { type: "json" };
import blog9 from "../blogs/blog-students-earn-money-ai-10000-month.json" with { type: "json" };
import blog10 from "../blogs/blog-top-free-ai-websites-youtubers.json" with { type: "json" };

const rawBlogs = [blog1, blog2, blog3, blog4, blog5, blog6, blog7, blog8, blog9, blog10];

export const blogData: Blog[] = rawBlogs.map((blogData) => ({
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
}));
