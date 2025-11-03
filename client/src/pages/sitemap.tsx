import { useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Map, Home, BookOpen, User, Mail, Shield, FileText, AlertTriangle } from "lucide-react";

export default function Sitemap() {
  useEffect(() => {
    document.title = "Sitemap - AIBlaze";
  }, []);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/blogs", label: "Blogs", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Mail },
    { href: "/privacy-policy", label: "Privacy Policy", icon: Shield },
    { href: "/terms-and-conditions", label: "Terms & Conditions", icon: FileText },
    { href: "/disclaimer", label: "Disclaimer", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Map className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 dark:text-blue-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Sitemap
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Find everything on AIBlaze at one place
          </p>
        </div>

        {/* Content */}
        <Card className="p-6 sm:p-8 md:p-10">
          <div className="space-y-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className="flex items-center gap-3 p-4 rounded-lg hover-elevate transition-all group"
                    data-testid={`link-sitemap-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-medium group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Updated: November 2025
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
