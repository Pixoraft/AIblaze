import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Twitter, Linkedin, Mail } from "lucide-react";

export interface AuthorBioProps {
  name?: string;
  role?: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export function AuthorBio({
  name = "AIBlaze Team",
  role = "AI & Digital Income Experts",
  bio = "We're passionate about democratizing AI knowledge and helping people build sustainable digital income streams. Our team researches and tests AI tools to bring you actionable insights for financial growth.",
  avatar,
  social = {
    twitter: "https://twitter.com/aiblaze",
    linkedin: "https://linkedin.com/company/aiblaze",
    email: "vivekrvt84@gmail.com",
  },
}: AuthorBioProps) {
  return (
    <Card className="p-6 sm:p-8" data-testid="card-author-bio">
      <h3 className="text-xl font-bold mb-4">About the Author</h3>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0" data-testid="avatar-author">
          {avatar && <img src={avatar} alt={name} />}
          <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h4 className="text-lg font-bold mb-1" data-testid="text-author-name">{name}</h4>
          <Badge variant="secondary" className="mb-3" data-testid="badge-author-role">
            {role}
          </Badge>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4" data-testid="text-author-bio">
            {bio}
          </p>

          <div className="flex flex-wrap gap-3">
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                data-testid="link-author-twitter"
              >
                <div className="h-8 w-8 rounded-full bg-muted hover-elevate flex items-center justify-center">
                  <Twitter className="h-4 w-4" />
                </div>
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                data-testid="link-author-linkedin"
              >
                <div className="h-8 w-8 rounded-full bg-muted hover-elevate flex items-center justify-center">
                  <Linkedin className="h-4 w-4" />
                </div>
              </a>
            )}

            {social.email && (
              <a
                href={`mailto:${social.email}`}
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                data-testid="link-author-email"
              >
                <div className="h-8 w-8 rounded-full bg-muted hover-elevate flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
