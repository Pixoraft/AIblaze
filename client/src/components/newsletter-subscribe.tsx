import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Check, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface NewsletterSubscribeProps {
  title?: string;
  description?: string;
  variant?: "default" | "compact" | "footer";
}

export function NewsletterSubscribe({
  title = "Stay Updated with AI Insights",
  description = "Join our newsletter for weekly AI income hacks, tool reviews, and automation strategies delivered to your inbox.",
  variant = "default",
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Coming Soon!",
      description: "Newsletter subscription will be available soon. Stay tuned!",
    });
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md" data-testid="form-newsletter-compact">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isSubmitting || isSuccess}
          data-testid="input-newsletter-email"
        />
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || isSuccess || !email}
          data-testid="button-newsletter-subscribe"
        >
          {isSuccess ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Subscribed
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </>
          )}
        </Button>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="space-y-3" data-testid="section-newsletter-footer">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-lg">Weekly AI Insights</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Get the latest AI tools and money-making strategies
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            disabled={isSubmitting || isSuccess}
            data-testid="input-newsletter-email-footer"
          />
          <Button
            type="submit"
            disabled={isSubmitting || isSuccess || !email}
            size="icon"
            data-testid="button-newsletter-subscribe-footer"
          >
            {isSuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800" data-testid="card-newsletter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold" data-testid="text-newsletter-title">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground" data-testid="text-newsletter-description">
            {description}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={isSubmitting || isSuccess}
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess || !email}
              className="whitespace-nowrap"
              data-testid="button-newsletter-subscribe"
            >
              {isSuccess ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Subscribed!
                </>
              ) : isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe Now
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
