import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "@/components/blog-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Blog } from "@shared/schema";
import { useEffect, useState, useMemo } from "react";
import { Search, X } from "lucide-react";

export default function Blogs() {
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    document.title = "All Blogs - AIBlaze";
  }, []);

  const categories = useMemo(() => {
    if (!blogs) return [];
    const uniqueCategories = Array.from(new Set(blogs.map(blog => blog.category)));
    return uniqueCategories.sort();
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    
    return blogs.filter(blog => {
      const matchesSearch = searchQuery === "" || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === null || blog.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" data-testid="section-blogs-header">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI + Money Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive guides on leveraging AI for financial
            growth, automation, and digital entrepreneurship
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search blogs by title, content, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 py-6 text-lg"
              data-testid="input-search-blogs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                data-testid="button-clear-search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              data-testid="button-category-all"
              className="rounded-full"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory) && (
            <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-2">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="gap-2">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                data-testid="button-clear-all-filters"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="text-center mb-8">
            <p className="text-muted-foreground" data-testid="text-results-count">
              Showing {filteredBlogs.length} of {blogs?.length || 0} blogs
            </p>
          </div>
        )}

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
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredBlogs.length === 0 && (
          <div className="text-center py-24" data-testid="empty-state-blogs">
            <p className="text-2xl text-muted-foreground mb-4">
              No blogs found matching your criteria
            </p>
            {(searchQuery || selectedCategory) && (
              <Button onClick={clearFilters} variant="outline" data-testid="button-reset-filters">
                Clear filters and show all blogs
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
