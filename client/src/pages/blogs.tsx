import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "@/components/blog-card";
import { Card } from "@/components/ui/card";
import type { Blog } from "@shared/schema";
import { useEffect } from "react";

export default function Blogs() {
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  useEffect(() => {
    document.title = "All Blogs - AIBlaze";
  }, []);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-testid="section-blogs-header">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI + Money Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive guides on leveraging AI for financial
            growth, automation, and digital entrepreneurship
          </p>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="h-96 animate-pulse bg-muted"
                data-testid={`skeleton-blog-${i}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!blogs || blogs.length === 0) && (
          <div className="text-center py-24" data-testid="empty-state-blogs">
            <p className="text-2xl text-muted-foreground">
              No blogs found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
