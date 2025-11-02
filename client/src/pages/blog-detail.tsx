import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { Link } from "wouter";
import type { Blog } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const { toast } = useToast();
  const [copiedLink, setCopiedLink] = useState(false);

  const { data: blog, isLoading } = useQuery<Blog>({
    queryKey: [`/api/blogs/${params?.slug}`],
    enabled: !!params?.slug,
  });

  const { data: relatedBlogs } = useQuery<Blog[]>({
    queryKey: [`/api/blogs/related/${blog?.id}`],
    enabled: !!blog?.id,
  });

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} - AIBlaze`;
    }
  }, [blog]);

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = `Check out this article: ${blog?.title}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      toast({
        title: "Link copied!",
        description: "Blog link has been copied to clipboard",
      });
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="h-96 animate-pulse bg-muted" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Blog not found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blogs">
            <Button data-testid="button-back-to-blogs" asChild>
              <span>Back to Blogs</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen" data-testid="article-blog-detail">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/blogs">
          <Button variant="ghost" className="mb-6" data-testid="button-back" asChild>
            <span>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </span>
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-video max-w-6xl mx-auto mb-12 overflow-hidden rounded-2xl">
        <img
          src={blog.imagePath}
          alt={blog.title}
          className="w-full h-full object-cover"
          data-testid="img-blog-hero"
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6">
        {/* Category & Meta */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4" data-testid="badge-category">
            {blog.category}
          </Badge>

          <h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            data-testid="text-blog-title"
          >
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span data-testid="text-blog-date">
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span data-testid="text-blog-readtime">{blog.readTime} min read</span>
            </div>
            <span data-testid="text-blog-author">By {blog.author}</span>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b">
            <span className="text-sm font-medium text-muted-foreground">Share:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnTwitter}
              data-testid="button-share-twitter"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnLinkedIn}
              data-testid="button-share-linkedin"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyLink}
              data-testid="button-share-copy"
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none mb-16"
          data-testid="content-blog"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Related Blogs */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <div className="mt-24 mb-12" data-testid="section-related-blogs">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedBlogs.slice(0, 2).map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
