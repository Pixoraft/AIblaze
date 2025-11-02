import { Link } from "wouter";
import { Twitter, Linkedin, Github, Flame } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-24" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AIBlaze
              </span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering creators, students, and freelancers to build digital
              income streams using AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors" 
                  data-testid="link-footer-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/blogs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors" 
                  data-testid="link-footer-blogs"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors" 
                  data-testid="link-footer-about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors" 
                  data-testid="link-footer-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover-elevate p-2 rounded-full"
                data-testid="link-social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover-elevate p-2 rounded-full"
                data-testid="link-social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover-elevate p-2 rounded-full"
                data-testid="link-social-github"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AIBlaze. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Owned by{" "}
            <a
              href="https://www.google.com/search?q=Pixocraft"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
              data-testid="link-pixocraft"
            >
              Pixocraft
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
