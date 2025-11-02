import { type Blog, type InsertBlog, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Blog operations
  getAllBlogs(): Promise<Blog[]>;
  getFeaturedBlogs(): Promise<Blog[]>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  getRelatedBlogs(currentBlogId: string, limit?: number): Promise<Blog[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private blogs: Map<string, Blog>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.blogs = new Map();
    this.contactMessages = new Map();
    this.seedBlogs();
  }

  private seedBlogs() {
    const blogData: Omit<Blog, "id">[] = [
      {
        slug: "10-best-ai-tools-to-earn-money-2025",
        title: "10 Best AI Tools to Earn Money in 2025",
        excerpt: "Discover the top AI tools that are helping thousands of people generate real income streams. From content creation to automation, these tools are game-changers.",
        content: `
          <h2>The AI Revolution in Income Generation</h2>
          <p>Artificial Intelligence has transformed the way we work and earn money. In 2025, AI tools have become more accessible and powerful than ever before. Whether you're a freelancer, entrepreneur, or side hustler, these tools can help you maximize your earning potential.</p>
          
          <h2>1. ChatGPT for Content Creation</h2>
          <p>ChatGPT has become an indispensable tool for writers, marketers, and content creators. From writing blog posts to crafting social media content, it can save hours of work while maintaining quality output. Many freelancers are using ChatGPT to handle multiple clients simultaneously.</p>
          
          <h2>2. Midjourney for Digital Art</h2>
          <p>Artists and designers are earning thousands by creating AI-generated artwork for clients. Midjourney allows you to create stunning visuals for websites, marketing materials, and even NFTs.</p>
          
          <h2>3. Jasper AI for Marketing</h2>
          <p>Marketing professionals are using Jasper to create compelling ad copy, email campaigns, and landing pages. Its ROI-focused approach helps businesses convert better.</p>
          
          <h2>4. Copy.ai for Sales</h2>
          <p>Sales teams leverage Copy.ai to write persuasive sales emails, product descriptions, and call scripts that convert prospects into customers.</p>
          
          <h2>5. Synthesia for Video Production</h2>
          <p>Create professional videos without cameras or actors. Synthesia is revolutionizing corporate training, marketing videos, and educational content creation.</p>
          
          <h2>Getting Started</h2>
          <p>The key to earning with AI tools is to identify your niche, master one or two tools, and consistently deliver value to clients. Start small, build your portfolio, and scale your services.</p>
        `,
        author: "AIBlaze Team",
        category: "AI Tools",
        imagePath: "/generated_images/AI_tools_earn_money_f4ef96ee.png",
        readTime: 7,
        featured: 1,
        publishedAt: "2025-01-15",
      },
      {
        slug: "students-earn-money-ai-10000-month",
        title: "How Students Can Use AI to Make ₹10,000/Month",
        excerpt: "A practical guide for students to leverage AI tools and build sustainable income streams while studying. No prior experience required.",
        content: `
          <h2>AI: The Student's Secret Weapon</h2>
          <p>As a student, balancing academics and income can be challenging. But with AI tools, you can earn substantial income without compromising your studies. Here's how students are making ₹10,000+ per month using AI.</p>
          
          <h2>Freelance Content Writing with AI</h2>
          <p>Use ChatGPT to assist with research and drafting, then add your personal touch. Students are earning ₹500-1000 per article on platforms like Upwork and Fiverr.</p>
          
          <h2>AI-Powered Social Media Management</h2>
          <p>Small businesses need social media help. Use AI tools to create content calendars, design posts, and schedule content. Charge ₹3000-5000 per client monthly.</p>
          
          <h2>Tutoring Enhanced by AI</h2>
          <p>Offer online tutoring with AI-generated study materials, quizzes, and personalized learning plans. Students pay premium for this enhanced experience.</p>
          
          <h2>Starting Your AI Side Hustle</h2>
          <p>Begin with one service, perfect it, get testimonials, and scale. Many students start earning within their first month of applying these strategies.</p>
        `,
        author: "AIBlaze Team",
        category: "Side Hustle",
        imagePath: "/generated_images/Students_earning_with_AI_e6a16dd2.png",
        readTime: 6,
        featured: 1,
        publishedAt: "2025-01-20",
      },
      {
        slug: "top-free-ai-websites-youtubers",
        title: "Top Free AI Websites Every YouTuber Should Know",
        excerpt: "Boost your YouTube channel with these free AI tools for thumbnail creation, script writing, video editing, and analytics.",
        content: `
          <h2>AI Tools That Transform YouTube Channels</h2>
          <p>Creating quality YouTube content consistently is challenging. These free AI tools help YouTubers save time and improve content quality.</p>
          
          <h2>ChatGPT for Script Writing</h2>
          <p>Generate video scripts, titles, descriptions, and even video ideas. ChatGPT helps you maintain consistency in your content calendar.</p>
          
          <h2>Canva AI for Thumbnails</h2>
          <p>Create eye-catching thumbnails that increase click-through rates. Canva's AI features make professional design accessible to everyone.</p>
          
          <h2>TubeBuddy for Analytics</h2>
          <p>While not entirely AI-based, TubeBuddy uses smart algorithms to suggest optimal posting times, keywords, and tags.</p>
          
          <h2>Descript for Video Editing</h2>
          <p>Edit videos by editing text transcripts. Remove filler words, add captions, and polish your content in record time.</p>
          
          <h2>Maximizing These Tools</h2>
          <p>The best YouTubers use these tools in combination, creating a content production workflow that's both efficient and effective.</p>
        `,
        author: "AIBlaze Team",
        category: "YouTube",
        imagePath: "/generated_images/AI_websites_for_YouTubers_33b02c25.png",
        readTime: 5,
        featured: 1,
        publishedAt: "2025-01-25",
      },
      {
        slug: "start-freelancing-with-chatgpt",
        title: "How to Start Freelancing with ChatGPT",
        excerpt: "Turn ChatGPT into your freelancing superpower. Learn how to offer high-value services using AI assistance.",
        content: `
          <h2>ChatGPT: Your Freelancing Assistant</h2>
          <p>ChatGPT isn't just a chatbot—it's a powerful tool that can help you launch and scale a freelancing career. Here's how to leverage it effectively.</p>
          
          <h2>Services You Can Offer</h2>
          <p>Content writing, copywriting, email marketing, social media management, and business consulting are all services enhanced by ChatGPT.</p>
          
          <h2>Setting Up Your Freelance Business</h2>
          <p>Create profiles on Upwork, Fiverr, and Freelancer. Use ChatGPT to craft compelling proposals that win clients.</p>
          
          <h2>Delivering Quality Work</h2>
          <p>Use ChatGPT for initial drafts and research, then add your expertise and personalization. This combination delivers superior results faster.</p>
          
          <h2>Scaling Your Income</h2>
          <p>As you gain experience, increase your rates and take on more complex projects. Many freelancers are earning $5000+ monthly using this approach.</p>
        `,
        author: "AIBlaze Team",
        category: "Freelancing",
        imagePath: "/generated_images/Freelancing_with_ChatGPT_3ab74401.png",
        readTime: 6,
        featured: 0,
        publishedAt: "2025-02-01",
      },
      {
        slug: "ai-chrome-extensions-save-hours",
        title: "5 AI Chrome Extensions That Save Hours of Work",
        excerpt: "Supercharge your browser with these AI-powered Chrome extensions that automate tasks and boost productivity exponentially.",
        content: `
          <h2>Browser Extensions That Work Magic</h2>
          <p>These AI Chrome extensions integrate seamlessly into your workflow, automating repetitive tasks and saving precious hours every day.</p>
          
          <h2>1. Notion AI</h2>
          <p>Transform your note-taking and project management with AI-powered writing assistance, summarization, and content generation right in Notion.</p>
          
          <h2>2. Grammarly</h2>
          <p>Beyond spell-checking, Grammarly's AI ensures your writing is clear, engaging, and professional across all platforms.</p>
          
          <h2>3. Compose AI</h2>
          <p>Write emails 10x faster with AI-powered autocomplete. It learns your writing style and suggests contextual completions.</p>
          
          <h2>4. Magical</h2>
          <p>Automate repetitive typing tasks with AI. Create templates that populate with context-aware information instantly.</p>
          
          <h2>5. ChatGPT Extension</h2>
          <p>Access ChatGPT from any webpage. Get instant answers, summaries, and assistance without leaving your browser.</p>
        `,
        author: "AIBlaze Team",
        category: "Productivity",
        imagePath: "/generated_images/AI_Chrome_extensions_productivity_c8529093.png",
        readTime: 5,
        featured: 0,
        publishedAt: "2025-02-05",
      },
      {
        slug: "ai-vs-human-creativity-who-wins",
        title: "AI vs Human Creativity — Who Wins?",
        excerpt: "Exploring the balance between artificial intelligence and human creativity. The answer might surprise you.",
        content: `
          <h2>The Great Debate</h2>
          <p>As AI becomes more sophisticated, many worry about creativity becoming automated. But the reality is more nuanced and exciting.</p>
          
          <h2>What AI Does Best</h2>
          <p>AI excels at processing vast amounts of data, recognizing patterns, and generating variations on existing themes. It's incredibly efficient at execution.</p>
          
          <h2>Where Humans Shine</h2>
          <p>Humans bring emotional intelligence, cultural context, and true innovation. We connect ideas in unexpected ways that AI cannot replicate.</p>
          
          <h2>The Winning Combination</h2>
          <p>The most successful creators use AI as a tool to amplify their human creativity. AI handles the grunt work while humans focus on strategy and originality.</p>
          
          <h2>The Future of Creative Work</h2>
          <p>Rather than replacement, we're seeing augmentation. Creative professionals who embrace AI are producing better work faster than ever before.</p>
        `,
        author: "AIBlaze Team",
        category: "Opinion",
        imagePath: "/generated_images/AI_vs_human_creativity_b1eb6336.png",
        readTime: 7,
        featured: 0,
        publishedAt: "2025-02-10",
      },
      {
        slug: "create-website-using-ai-30-minutes",
        title: "How I Created a Full Website Using AI in 30 Minutes",
        excerpt: "A step-by-step breakdown of building a professional website from scratch using AI tools. No coding required.",
        content: `
          <h2>The 30-Minute Website Challenge</h2>
          <p>I challenged myself to build a complete, professional website in just 30 minutes using only AI tools. Here's exactly how I did it.</p>
          
          <h2>Tools Used</h2>
          <p>ChatGPT for content, Midjourney for images, and v0.dev for design and code generation. Each tool played a crucial role.</p>
          
          <h2>Step 1: Planning (5 minutes)</h2>
          <p>Used ChatGPT to create a site structure, content outline, and color scheme. Clear planning made execution smooth.</p>
          
          <h2>Step 2: Content Creation (10 minutes)</h2>
          <p>ChatGPT generated all copy including headlines, body text, and calls-to-action. Minor edits for brand voice.</p>
          
          <h2>Step 3: Design & Development (15 minutes)</h2>
          <p>v0.dev turned my requirements into a fully functional, responsive website. Midjourney created custom images.</p>
          
          <h2>The Results</h2>
          <p>A professional website that would have taken days traditionally was completed in 30 minutes. The future of web development is here.</p>
        `,
        author: "AIBlaze Team",
        category: "Web Development",
        imagePath: "/generated_images/Website_creation_using_AI_b4c53017.png",
        readTime: 6,
        featured: 0,
        publishedAt: "2025-02-15",
      },
      {
        slug: "ai-tools-replace-employees",
        title: "7 AI Tools That Can Replace Employees",
        excerpt: "Controversial but true: these AI tools are performing tasks that previously required full-time employees. What this means for businesses and workers.",
        content: `
          <h2>The Automation Revolution</h2>
          <p>AI tools are now capable of handling entire job functions. While this raises concerns, it also creates opportunities for smarter business operations.</p>
          
          <h2>Customer Service AI</h2>
          <p>Chatbots like Intercom and Zendesk AI handle thousands of customer queries simultaneously, providing 24/7 support without human intervention.</p>
          
          <h2>Accounting Automation</h2>
          <p>Tools like QuickBooks AI and Xero automate bookkeeping, invoicing, and financial reporting with minimal human oversight.</p>
          
          <h2>Marketing AI</h2>
          <p>HubSpot AI and Marketo handle campaign creation, email sequences, and lead nurturing that previously required marketing teams.</p>
          
          <h2>The Human Element</h2>
          <p>While AI handles routine tasks, humans shift to strategy, creativity, and relationship building—higher-value activities that AI can't replace.</p>
          
          <h2>Adapting to Change</h2>
          <p>The workers who thrive are those who learn to work alongside AI, using it to multiply their impact rather than competing against it.</p>
        `,
        author: "AIBlaze Team",
        category: "Business",
        imagePath: "/generated_images/AI_tools_replacing_employees_7171a3a2.png",
        readTime: 8,
        featured: 0,
        publishedAt: "2025-02-20",
      },
      {
        slug: "future-jobs-ai-skills-highest-pay",
        title: "The Future of Jobs: AI Skills That Pay the Most",
        excerpt: "Which AI skills are most valuable in the job market? Discover the highest-paying AI competencies and how to acquire them.",
        content: `
          <h2>The AI Skills Premium</h2>
          <p>Professionals with AI skills command significant salary premiums. Here are the most lucrative AI competencies in today's market.</p>
          
          <h2>Prompt Engineering</h2>
          <p>Top prompt engineers earn $200k+ annually. This skill involves crafting effective instructions for AI systems to generate optimal outputs.</p>
          
          <h2>AI Product Management</h2>
          <p>Managing AI-powered products requires unique skills. These professionals earn $150k-250k guiding AI product development.</p>
          
          <h2>Machine Learning Operations</h2>
          <p>MLOps engineers who deploy and maintain AI systems are in high demand, with salaries reaching $180k+.</p>
          
          <h2>AI Ethics and Governance</h2>
          <p>As AI grows, so does the need for ethical oversight. Specialists in this field earn premium salaries while shaping responsible AI.</p>
          
          <h2>Learning These Skills</h2>
          <p>Many of these skills can be self-taught through online courses, hands-on practice, and portfolio building. The barrier to entry is lower than you think.</p>
        `,
        author: "AIBlaze Team",
        category: "Careers",
        imagePath: "/generated_images/Future_AI_jobs_income_6f829e2a.png",
        readTime: 7,
        featured: 0,
        publishedAt: "2025-02-25",
      },
      {
        slug: "build-personal-brand-using-ai",
        title: "How to Build a Personal Brand Using AI",
        excerpt: "Leverage AI to create compelling content, grow your audience, and establish yourself as an authority in your niche faster than ever before.",
        content: `
          <h2>Personal Branding in the AI Era</h2>
          <p>Building a personal brand used to take years. With AI tools, you can accelerate this process dramatically while maintaining authenticity.</p>
          
          <h2>Content Creation at Scale</h2>
          <p>Use ChatGPT and Jasper to maintain a consistent content calendar across platforms. Post daily without burning out.</p>
          
          <h2>Visual Brand Identity</h2>
          <p>Midjourney and DALL-E help create consistent visual content that reinforces your brand identity across all touchpoints.</p>
          
          <h2>Audience Engagement</h2>
          <p>AI tools analyze your audience's interests and suggest content topics that resonate. Engage smarter, not harder.</p>
          
          <h2>Analytics and Optimization</h2>
          <p>Use AI-powered analytics to understand what works and double down on successful content strategies.</p>
          
          <h2>Staying Authentic</h2>
          <p>The key is using AI to amplify your voice, not replace it. Add personal experiences and perspectives to AI-generated content.</p>
          
          <h2>Success Stories</h2>
          <p>Countless creators have built six-figure personal brands using these AI strategies. The opportunity is available to anyone willing to be consistent.</p>
        `,
        author: "AIBlaze Team",
        category: "Personal Branding",
        imagePath: "/generated_images/Personal_brand_building_AI_2d3dd3b9.png",
        readTime: 6,
        featured: 0,
        publishedAt: "2025-03-01",
      },
    ];

    blogData.forEach((blog) => {
      const id = randomUUID();
      this.blogs.set(id, { ...blog, id });
    });
  }

  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getFeaturedBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values())
      .filter((blog) => blog.featured === 1)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    return Array.from(this.blogs.values()).find((blog) => blog.slug === slug);
  }

  async getRelatedBlogs(currentBlogId: string, limit: number = 2): Promise<Blog[]> {
    const currentBlog = this.blogs.get(currentBlogId);
    if (!currentBlog) return [];

    return Array.from(this.blogs.values())
      .filter((blog) => blog.id !== currentBlogId && blog.category === currentBlog.category)
      .slice(0, limit);
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = randomUUID();
    const blog: Blog = { ...insertBlog, id };
    this.blogs.set(id, blog);
    return blog;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
