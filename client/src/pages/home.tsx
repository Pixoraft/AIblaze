import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlogCard } from "@/components/blog-card";
import { GraduationCap, DollarSign, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import type { Blog } from "@shared/schema";
import { useEffect, useState } from "react";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch('/slide.json')
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(err => console.error('Error loading slides:', err));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const { data: featuredBlogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs/featured"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-pink-900/80" />
            </div>

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
              className={`relative z-10 max-w-5xl mx-auto px-6 text-center h-full flex flex-col items-center justify-center transition-all duration-1000 ${
                mounted && index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6 border border-white/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">AI-Powered Income Strategies</span>
              </div>

              <h1
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                data-testid="text-hero-headline"
              >
                {slide.title}
              </h1>

              <p
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
                data-testid="text-hero-subtext"
              >
                {slide.subtitle}
              </p>

              <Link href={slide.ctaLink}>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  data-testid="button-read-blogs"
                >
                  {slide.ctaText}
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all"
              data-testid="button-prev-slide"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all"
              data-testid="button-next-slide"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                data-testid={`button-slide-${index}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
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
