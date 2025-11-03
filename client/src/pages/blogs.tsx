import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "@/components/blog-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Blog } from "@shared/schema";
import { useEffect, useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/seo-head";
import { OrganizationStructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PAGE_SEO, SITE_CONFIG, ORGANIZATION_SCHEMA } from "@/lib/seo-config";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('/blogs-data.json')
      .then(res => res.json())
      .then((data: Blog[]) => {
        setBlogs(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading blogs:', err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    const categoryParam = params.get("category");
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

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
    <div className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-x-hidden">
      <SEOHead
        title={PAGE_SEO.blogs.title}
        description={PAGE_SEO.blogs.description}
        keywords={PAGE_SEO.blogs.keywords}
        canonical={`${SITE_CONFIG.url}/blogs`}
      />
      <OrganizationStructuredData organization={ORGANIZATION_SCHEMA} />
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Blogs', url: `${SITE_CONFIG.url}/blogs` },
      ]} />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 w-full" data-testid="section-blogs-header">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent break-words">
            AI + Money Insights
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive guides on leveraging AI for financial
            growth, automation, and digital entrepreneurship
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6 sm:mb-8">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sm:pl-12 pr-10 sm:pr-12 py-4 sm:py-6 text-base sm:text-lg"
              data-testid="input-search-blogs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                data-testid="button-clear-search"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-4xl mx-auto">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              data-testid="button-category-all"
              className="rounded-full text-sm sm:text-base"
              size="sm"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-full text-sm sm:text-base whitespace-nowrap"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory) && (
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="text-xs sm:text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                  Search: "{searchQuery.length > 20 ? searchQuery.substring(0, 20) + '...' : searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1 sm:gap-2 text-xs sm:text-sm">
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
                className="text-xs sm:text-sm"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-muted-foreground" data-testid="text-results-count">
              Showing {filteredBlogs.length} of {blogs?.length || 0} blogs
            </p>
          </div>
        )}

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="h-80 sm:h-96 animate-pulse bg-muted"
                data-testid={`skeleton-blog-${i}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredBlogs.length === 0 && (
          <div className="text-center py-16 sm:py-20 md:py-24 px-4" data-testid="empty-state-blogs">
            <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
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
