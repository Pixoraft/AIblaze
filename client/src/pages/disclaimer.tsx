import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { SEOHead } from "@/components/seo-head";
import { OrganizationStructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PAGE_SEO, SITE_CONFIG, ORGANIZATION_SCHEMA } from "@/lib/seo-config";

export default function Disclaimer() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-x-hidden">
      <SEOHead
        title={PAGE_SEO.disclaimer.title}
        description={PAGE_SEO.disclaimer.description}
        keywords={PAGE_SEO.disclaimer.keywords}
        canonical={`${SITE_CONFIG.url}/disclaimer`}
      />
      <OrganizationStructuredData organization={ORGANIZATION_SCHEMA} />
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Disclaimer', url: `${SITE_CONFIG.url}/disclaimer` },
      ]} />
      
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500 dark:text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Disclaimer
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Please read this carefully before using our content
          </p>
        </div>

        {/* Content */}
        <Card className="p-6 sm:p-8 md:p-10">
          <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <div className="space-y-6 text-foreground">
              <p className="text-lg leading-relaxed">
                The content on <strong>AIBlaze</strong> is for informational purposes only.
              </p>

              <p className="text-lg leading-relaxed">
                While we research thoroughly, we do not guarantee 100% accuracy of data or outcomes.
              </p>

              <p className="text-lg leading-relaxed">
                All opinions are our own and not influenced by any third-party sponsors.
                Before using any AI tool or financial method, do your own due diligence.
              </p>

              <p className="text-lg leading-relaxed font-semibold text-yellow-600 dark:text-yellow-500">
                AIBlaze will not be responsible for losses or damages resulting from information used on this site.
              </p>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  By using this website, you acknowledge that you have read and understood this disclaimer.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
