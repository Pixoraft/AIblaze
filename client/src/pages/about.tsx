import { Card } from "@/components/ui/card";
import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";
import { SEOHead } from "@/components/seo-head";
import { OrganizationStructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PAGE_SEO, SITE_CONFIG, ORGANIZATION_SCHEMA } from "@/lib/seo-config";

export default function About() {
  return (
    <div className="min-h-screen" data-testid="page-about">
      <SEOHead
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        keywords={PAGE_SEO.about.keywords}
        canonical={`${SITE_CONFIG.url}/about`}
      />
      <OrganizationStructuredData organization={ORGANIZATION_SCHEMA} />
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'About', url: `${SITE_CONFIG.url}/about` },
      ]} />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            data-testid="text-about-headline"
          >
            About AIBlaze
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed px-4">
            Empowering the next generation of digital entrepreneurs through AI
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 md:p-10 lg:p-12 hover-elevate">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Target className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" data-testid="text-mission-title">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  To empower creators, students, and freelancers to build
                  sustainable digital income streams using AI. We believe that
                  artificial intelligence is not just a tool for large
                  corporations — it's a democratizing force that can help anyone
                  achieve financial independence.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Our Story</h2>
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>
              AIBlaze was born from a simple observation: while AI tools are
              revolutionizing industries, most people don't know how to leverage
              them for personal financial growth.
            </p>
            <p>
              We started this platform to bridge that gap — creating accessible,
              practical content that shows real people how to use AI to earn
              money, save time, and scale their ventures. Whether you're a
              student looking to make extra income, a creator wanting to
              automate your workflow, or a professional exploring new revenue
              streams, AIBlaze is your guide.
            </p>
            <p>
              Our team consists of AI enthusiasts, digital marketers,
              entrepreneurs, and educators who have successfully used AI tools
              to transform their own careers. Now, we're sharing everything
              we've learned with you.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Accessibility */}
            <Card className="p-6 sm:p-8 text-center hover-elevate">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Accessibility</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                AI knowledge should be available to everyone, regardless of
                technical background or experience level.
              </p>
            </Card>

            {/* Innovation */}
            <Card className="p-6 sm:p-8 text-center hover-elevate">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Lightbulb className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Innovation</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We constantly explore and share the latest AI tools and
                strategies that deliver real results.
              </p>
            </Card>

            {/* Growth */}
            <Card className="p-6 sm:p-8 text-center hover-elevate">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Growth</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We're committed to helping you grow — financially, professionally,
                and personally through AI mastery.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-10 md:p-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none text-white text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Join the AIBlaze Community
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90">
              Start your journey to AI-powered income today
            </p>
            <a href="/blogs">
              <button
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-xl"
                data-testid="button-about-cta"
              >
                Explore Our Content
              </button>
            </a>
          </Card>
        </div>
      </section>
    </div>
  );
}
