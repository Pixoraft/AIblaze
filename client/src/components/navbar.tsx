import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu, X, Flame, Search } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Blog } from "@shared/schema";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: blogs } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const categories = blogs
    ? Array.from(new Set(blogs.map((blog) => blog.category))).sort()
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/blogs?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs", hasDropdown: true },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover-elevate transition-transform duration-200" 
            data-testid="link-home-logo"
          >
            <Flame className="h-6 w-6 text-orange-500" />
            <span>AIBlaze</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setShowCategoryDropdown(true)}
                onMouseLeave={() => link.hasDropdown && setShowCategoryDropdown(false)}
              >
                <Link
                  href={link.href}
                  className={`font-medium transition-colors relative ${
                    location === link.href || (link.href === "/blogs" && location.startsWith("/blogs"))
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  {(location === link.href || (link.href === "/blogs" && location.startsWith("/blogs"))) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
                  )}
                </Link>
                {link.hasDropdown && showCategoryDropdown && categories.length > 0 && (
                  <div
                    className="absolute top-full left-0 mt-2 bg-card border border-border rounded-md shadow-lg min-w-[200px] z-50 overflow-visible"
                    data-testid="dropdown-categories"
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                        Categories
                      </div>
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/blogs?category=${encodeURIComponent(category)}`}
                          className="block px-4 py-2 text-sm text-foreground hover-elevate transition-colors"
                          data-testid={`link-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48 h-9"
                data-testid="input-search"
              />
            </form>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="rounded-full"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 flex flex-col gap-4"
            data-testid="mobile-menu"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-mobile"
              />
            </form>
            
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`font-medium transition-colors block py-2 ${
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
