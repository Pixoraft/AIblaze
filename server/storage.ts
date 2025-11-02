import { type Blog, type InsertBlog, type ContactMessage, type InsertContactMessage, type Comment, type InsertComment } from "@shared/schema";
import { randomUUID } from "crypto";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export interface IStorage {
  // Blog operations
  getAllBlogs(): Promise<Blog[]>;
  getFeaturedBlogs(): Promise<Blog[]>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  getRelatedBlogs(currentBlogId: string, limit?: number): Promise<Blog[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Comment operations
  getCommentsByBlogId(blogId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
}

export class MemStorage implements IStorage {
  private blogs: Map<string, Blog>;
  private contactMessages: Map<string, ContactMessage>;
  private comments: Map<string, Comment>;

  constructor() {
    this.blogs = new Map();
    this.contactMessages = new Map();
    this.comments = new Map();
    this.loadBlogsFromFiles();
  }

  private loadBlogsFromFiles() {
    try {
      const blogsDir = join(process.cwd(), 'blogs');
      const files = readdirSync(blogsDir);
      
      files.forEach((file) => {
        if (file.endsWith('.json')) {
          const filePath = join(blogsDir, file);
          const fileContent = readFileSync(filePath, 'utf-8');
          const blogData = JSON.parse(fileContent);
          const blog: Blog = {
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
          };
          this.blogs.set(blog.id, blog);
        }
      });
    } catch (error) {
      console.error('Error loading blogs from files:', error);
    }
  }

  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getFeaturedBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values())
      .filter((blog) => blog.featured === 1)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    return Array.from(this.blogs.values()).find((blog) => blog.slug === slug);
  }

  async getRelatedBlogs(currentBlogId: string, limit: number = 2): Promise<Blog[]> {
    const currentBlog = this.blogs.get(currentBlogId);
    if (!currentBlog) return [];

    return Array.from(this.blogs.values())
      .filter((blog) => blog.id !== currentBlogId && blog.category === currentBlog.category)
      .slice(0, limit);
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = randomUUID();
    const blog: Blog = {
      id,
      slug: insertBlog.slug,
      title: insertBlog.title,
      excerpt: insertBlog.excerpt,
      content: insertBlog.content,
      author: insertBlog.author || "AIBlaze Team",
      category: insertBlog.category,
      imagePath: insertBlog.imagePath,
      readTime: insertBlog.readTime || 5,
      featured: insertBlog.featured || 0,
      publishedAt: insertBlog.publishedAt,
    };
    this.blogs.set(id, blog);
    return blog;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getCommentsByBlogId(blogId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter((comment) => comment.blogId === blogId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = {
      ...insertComment,
      id,
      createdAt: new Date().toISOString(),
    };
    this.comments.set(id, comment);
    return comment;
  }
}

export const storage = new MemStorage();
