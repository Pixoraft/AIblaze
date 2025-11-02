import { Card } from "@/components/ui/card";
import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About Us - AIBlaze";
  }, []);

  return (
    <div className="min-h-screen" data-testid="page-about">
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            data-testid="text-about-headline"
          >
            About AIBlaze
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Empowering the next generation of digital entrepreneurs through AI
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 hover-elevate">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4" data-testid="text-mission-title">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
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
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
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
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Accessibility */}
            <Card className="p-8 text-center hover-elevate">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Accessibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI knowledge should be available to everyone, regardless of
                technical background or experience level.
              </p>
            </Card>

            {/* Innovation */}
            <Card className="p-8 text-center hover-elevate">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We constantly explore and share the latest AI tools and
                strategies that deliver real results.
              </p>
            </Card>

            {/* Growth */}
            <Card className="p-8 text-center hover-elevate">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Growth</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to helping you grow — financially, professionally,
                and personally through AI mastery.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the AIBlaze Community
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start your journey to AI-powered income today
            </p>
            <a href="/blogs">
              <button
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-xl"
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
