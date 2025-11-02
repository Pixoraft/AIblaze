import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlogCard } from "@/components/blog-card";
import { GraduationCap, DollarSign, TrendingUp, Sparkles, Flame } from "lucide-react";
import type { Blog } from "@shared/schema";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: featuredBlogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs/featured"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        {/* Floating Particles Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-white/20 ${
                mounted ? "animate-float" : ""
              }`}
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6 border border-white/20">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Income Strategies</span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight flex items-center justify-center gap-4"
            data-testid="text-hero-headline"
          >
            <span>Ignite Your Earnings with AI</span>
            <Flame className="h-16 w-16 md:h-20 md:w-20 text-orange-400" />
          </h1>

          <p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            data-testid="text-hero-subtext"
          >
            Learn how to make money smarter, not harder — powered by AI.
          </p>

          <Link href="/blogs">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              data-testid="button-read-blogs"
            >
              Read Blogs
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-24 px-6" data-testid="section-featured-blogs">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Articles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the latest AI tools and strategies to boost your income
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs?.slice(0, 3).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why AIBlaze Section */}
      <section
        className="py-24 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        data-testid="section-why-aiblaze"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why AIBlaze?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your journey to financial freedom starts here
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Learn */}
            <Card className="p-8 text-center hover-elevate transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" data-testid="text-why-learn-title">
                Learn
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Master AI tools and automation techniques that top earners use
                to maximize their productivity and income potential.
              </p>
            </Card>

            {/* Earn */}
            <Card className="p-8 text-center hover-elevate transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" data-testid="text-why-earn-title">
                Earn
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate real income streams using proven AI strategies,
                whether you're a student, creator, or professional.
              </p>
            </Card>

            {/* Grow */}
            <Card className="p-8 text-center hover-elevate transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" data-testid="text-why-grow-title">
                Grow
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Scale your digital presence and build sustainable passive
                income systems that work for you 24/7.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6" data-testid="section-cta">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Income?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands learning to earn with AI
            </p>
            <Link href="/blogs">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full"
                data-testid="button-cta-explore"
              >
                Explore All Blogs
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
