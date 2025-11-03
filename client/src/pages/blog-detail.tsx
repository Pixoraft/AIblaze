import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Link as LinkIcon, Check, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Blog, Comment, InsertComment } from "@shared/schema";
import { insertCommentSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { SEOHead } from "@/components/seo-head";
import { BlogPostingStructuredData, BreadcrumbStructuredData, OrganizationStructuredData } from "@/components/structured-data";
import { SITE_CONFIG, ORGANIZATION_SCHEMA } from "@/lib/seo-config";
import { AuthorBio } from "@/components/author-bio";

const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return imagePath;
};

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

  const { data: comments, isLoading: commentsLoading } = useQuery<Comment[]>({
    queryKey: [`/api/comments`, blog?.id],
    enabled: !!blog?.id,
  });

  const form = useForm<InsertComment>({
    resolver: zodResolver(insertCommentSchema),
    defaultValues: {
      blogId: blog?.id || "",
      name: "",
      email: "",
      comment: "",
    },
  });

  useEffect(() => {
    if (blog?.id) {
      form.setValue("blogId", blog.id);
    }
  }, [blog?.id, form]);

  const createCommentMutation = useMutation({
    mutationFn: async (data: InsertComment) => {
      return await apiRequest("POST", "/api/comments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/comments`, blog?.id] });
      form.reset({
        blogId: blog?.id || "",
        name: "",
        email: "",
        comment: "",
      });
      toast({
        title: "Success!",
        description: "Your comment has been posted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertComment) => {
    createCommentMutation.mutate(data);
  };

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
      <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="h-80 sm:h-96 animate-pulse bg-muted" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Blog not found</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
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
      <SEOHead
        title={`${blog.title} | AIBlaze`}
        description={blog.excerpt}
        keywords={`${blog.category}, AI tools, earn money online, ${blog.title}`}
        canonical={`${SITE_CONFIG.url}/blog/${blog.slug}`}
        ogType="article"
        article={{
          publishedTime: blog.publishedAt,
          author: 'AIBlaze Team',
          section: blog.category,
          tags: [blog.category, 'AI', 'Money', 'Technology'],
        }}
      />
      <BlogPostingStructuredData
        post={{
          headline: blog.title,
          description: blog.excerpt,
          image: getImageUrl(blog.imagePath),
          datePublished: blog.publishedAt,
          author: { name: 'AIBlaze Team' },
          publisher: ORGANIZATION_SCHEMA,
          url: `${SITE_CONFIG.url}/blog/${blog.slug}`,
          keywords: [blog.category, 'AI', 'Money'],
          articleSection: blog.category,
        }}
      />
      <OrganizationStructuredData organization={ORGANIZATION_SCHEMA} />
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Blogs', url: `${SITE_CONFIG.url}/blogs` },
        { name: blog.title, url: `${SITE_CONFIG.url}/blog/${blog.slug}` },
      ]} />
      
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <Link href="/blogs">
          <Button variant="ghost" className="mb-4 sm:mb-6" data-testid="button-back" asChild>
            <span>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </span>
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-video max-w-6xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6">
        <img
          src={getImageUrl(blog.imagePath)}
          alt={blog.title}
          className="w-full h-full object-cover rounded-lg sm:rounded-2xl"
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
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 pb-8 border-b">
            <span className="text-sm font-medium text-muted-foreground w-full sm:w-auto mb-1 sm:mb-0">Share:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnTwitter}
              data-testid="button-share-twitter"
              className="flex-shrink-0"
            >
              <Twitter className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnLinkedIn}
              data-testid="button-share-linkedin"
              className="flex-shrink-0"
            >
              <Linkedin className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyLink}
              data-testid="button-share-copy"
              className="flex-shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none mb-16 dark:prose-invert"
          data-testid="content-blog"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Author Bio */}
        <div className="mb-16">
          <AuthorBio />
        </div>

        {/* Comments Section */}
        <div className="mt-16 mb-12" data-testid="section-comments">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <MessageCircle className="h-8 w-8" />
            Comments ({comments?.length || 0})
          </h2>

          {/* Comment Form */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            data-testid="input-comment-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            data-testid="input-comment-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts..."
                          className="min-h-32"
                          {...field}
                          data-testid="input-comment-text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={createCommentMutation.isPending}
                  data-testid="button-submit-comment"
                >
                  {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
                </Button>
              </form>
            </Form>
          </Card>

          {/* Comments List */}
          {commentsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </Card>
              ))}
            </div>
          ) : comments && comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="p-6" data-testid={`card-comment-${comment.id}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold" data-testid={`text-comment-name-${comment.id}`}>
                          {comment.name}
                        </h4>
                        <span className="text-sm text-muted-foreground" data-testid={`text-comment-date-${comment.id}`}>
                          {new Date(comment.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed" data-testid={`text-comment-text-${comment.id}`}>
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No comments yet. Be the first to share your thoughts!
              </p>
            </Card>
          )}
        </div>

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
