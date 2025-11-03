import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";
import { useState } from "react";
import { SEOHead } from "@/components/seo-head";
import { OrganizationStructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PAGE_SEO, SITE_CONFIG, ORGANIZATION_SCHEMA } from "@/lib/seo-config";

export default function Contact() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    setIsSuccess(true);
    form.reset();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen" data-testid="page-contact">
      <SEOHead
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        canonical={`${SITE_CONFIG.url}/contact`}
      />
      <OrganizationStructuredData organization={ORGANIZATION_SCHEMA} />
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Contact', url: `${SITE_CONFIG.url}/contact` },
      ]} />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            data-testid="text-contact-headline"
          >
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 px-4">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Contact Information</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                Reach out to us and we'll respond as soon as possible.
              </p>
            </div>

            <a
              href="mailto:vivekrvt84@gmail.com"
              data-testid="link-email-contact"
            >
              <Card className="p-4 sm:p-6 hover-elevate transition-all cursor-pointer">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold mb-1">Email</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                      vivekrvt84@gmail.com
                    </p>
                  </div>
                </div>
              </Card>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8">
              {isSuccess ? (
                <div
                  className="text-center py-8 sm:py-12"
                  data-testid="success-message"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 dark:text-green-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Message Sent!</h3>
                  <p className="text-sm sm:text-base text-muted-foreground px-4">
                    Thank you for contacting us. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...form.register("name")}
                      data-testid="input-name"
                      className="mt-2"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...form.register("email")}
                      data-testid="input-email"
                      className="mt-2"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us what's on your mind..."
                      rows={6}
                      {...form.register("message")}
                      data-testid="input-message"
                      className="mt-2 resize-none"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                    data-testid="button-submit"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
