import { Link } from "wouter";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Blog } from "@shared/schema";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.slug}`} data-testid={`card-blog-${blog.slug}`}>
      <Card className="overflow-hidden hover-elevate transition-all duration-300 hover:shadow-lg group">
          {/* Image */}
          <div className="relative overflow-hidden aspect-video">
            <img
              src={blog.imagePath}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-testid={`img-blog-${blog.slug}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            <Badge
              variant="secondary"
              className="mb-3"
              data-testid={`badge-category-${blog.slug}`}
            >
              {blog.category}
            </Badge>

            {/* Title */}
            <h3
              className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors"
              data-testid={`text-title-${blog.slug}`}
            >
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p
              className="text-muted-foreground mb-4 line-clamp-3"
              data-testid={`text-excerpt-${blog.slug}`}
            >
              {blog.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span data-testid={`text-date-${blog.slug}`}>
                  {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span data-testid={`text-readtime-${blog.slug}`}>
                  {blog.readTime} min read
                </span>
              </div>
            </div>

            {/* Read More */}
            <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              <span>Read More</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Card>
    </Link>
  );
}
