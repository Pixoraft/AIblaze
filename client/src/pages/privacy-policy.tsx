import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy - AIBlaze";
  }, []);

  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Last Updated: November 2025
          </p>
        </div>

        {/* Content */}
        <Card className="p-6 sm:p-8 md:p-10">
          <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 Introduction</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Welcome to <strong>AIBlaze</strong> — your trusted source for AI insights, tools, and innovation.
                  We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 Information We Collect</h2>
                <p className="leading-relaxed text-muted-foreground mb-3">
                  We may collect the following information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Personal details (like name, email address, etc.) when you contact us or subscribe to our newsletter.</li>
                  <li>Usage data (IP address, browser type, pages visited, time spent) to improve website performance.</li>
                  <li>Cookies and tracking tools for analytics and personalization.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 How We Use Your Information</h2>
                <p className="leading-relaxed text-muted-foreground mb-3">
                  We use your data to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Improve user experience and website content</li>
                  <li>Communicate updates, newsletters, and offers (if you subscribe)</li>
                  <li>Ensure site security and performance monitoring</li>
                  <li>Comply with applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 Cookies</h2>
                <p className="leading-relaxed text-muted-foreground">
                  AIBlaze uses cookies to personalize content and analyze traffic.
                  You can disable cookies in your browser settings, but some site features may not work properly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 Data Protection</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Your data is stored securely. We do not sell or share your personal information with third parties, except as required by law or for analytics (e.g., Google Analytics).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 External Links</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Our website may contain links to other sites. We are not responsible for their privacy policies or content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 Your Rights (GDPR Compliance)</h2>
                <p className="leading-relaxed text-muted-foreground mb-3">
                  If you are from the EU or other regions with data protection laws, you have rights to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access your data</li>
                  <li>Request deletion or correction</li>
                  <li>Withdraw consent</li>
                </ul>
                <p className="leading-relaxed text-muted-foreground mt-3">
                  To exercise your rights, contact us at <strong>privacy@aiblaze.in</strong>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 Updates to this Policy</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We may update this Privacy Policy from time to time. Please review it periodically for changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">🔹 Contact Us</h2>
                <p className="leading-relaxed text-muted-foreground">
                  For any privacy-related questions:
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  📩 Email: <strong>contact@aiblaze.in</strong>
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  🌐 Website: <strong>https://aiblaze.pixocraft.in</strong>
                </p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
