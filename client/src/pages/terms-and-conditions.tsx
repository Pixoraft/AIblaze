import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { SEOHead } from "@/components/seo-head";
import { OrganizationStructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PAGE_SEO, SITE_CONFIG, ORGANIZATION_SCHEMA } from "@/lib/seo-config";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-x-hidden">
      <SEOHead
        title={PAGE_SEO.terms.title}
        description={PAGE_SEO.terms.description}
        keywords={PAGE_SEO.terms.keywords}
        canonical={`${SITE_CONFIG.url}/terms-and-conditions`}
      />
      <OrganizationStructuredData organization={ORGANIZATION_SCHEMA} />
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Terms & Conditions', url: `${SITE_CONFIG.url}/terms-and-conditions` },
      ]} />
      
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-purple-500 dark:text-purple-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Effective Date: November 2025
          </p>
        </div>

        {/* Content */}
        <Card className="p-6 sm:p-8 md:p-10">
          <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Acceptance of Terms</h2>
                <p className="leading-relaxed text-muted-foreground">
                  By using <strong>AIBlaze</strong>, you agree to these Terms and Conditions. If you disagree, please discontinue use of our site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Use of Content</h2>
                <p className="leading-relaxed text-muted-foreground">
                  All content on AIBlaze (text, images, videos, tools) is owned or licensed by us.
                  You may not copy, redistribute, or modify any content without written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">User Responsibilities</h2>
                <p className="leading-relaxed text-muted-foreground mb-3">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Use our website for illegal or harmful purposes</li>
                  <li>Attempt to hack, spam, or exploit site vulnerabilities</li>
                  <li>Post offensive or misleading content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Disclaimer</h2>
                <p className="leading-relaxed text-muted-foreground">
                  AIBlaze provides content "as is."
                  We do not guarantee the accuracy or completeness of information and are not liable for any losses resulting from its use.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Third-Party Links</h2>
                <p className="leading-relaxed text-muted-foreground">
                  AIBlaze may include links to other websites.
                  We are not responsible for their content, policies, or accuracy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Limitation of Liability</h2>
                <p className="leading-relaxed text-muted-foreground mb-3">
                  AIBlaze and its creators will not be held responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Data loss or damage due to technical issues</li>
                  <li>Misuse of shared content by external users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Termination</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We reserve the right to block or remove users who violate these terms without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Governing Law</h2>
                <p className="leading-relaxed text-muted-foreground">
                  These terms shall be governed by and interpreted in accordance with Indian laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Information</h2>
                <p className="leading-relaxed text-muted-foreground">
                  For questions about these Terms, contact us at:
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  <strong>legal@aiblaze.in</strong>
                </p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
