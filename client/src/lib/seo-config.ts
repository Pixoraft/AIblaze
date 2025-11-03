export const SITE_CONFIG = {
  name: 'AIBlaze',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://aiblaze.com',
  description: 'Learn how to make money smarter, not harder — powered by AI. Discover AI tools, automation strategies, and digital income streams.',
  logo: '/favicon.png',
  ogImage: '/og-image.png',
  twitterHandle: '@aiblaze',
  author: 'AIBlaze Team',
};

export const ORGANIZATION_SCHEMA = {
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
  description: SITE_CONFIG.description,
  sameAs: [
    'https://twitter.com/aiblaze',
    'https://linkedin.com/company/aiblaze',
    'https://facebook.com/aiblaze',
  ],
};

export const SEO_KEYWORDS = {
  primary: [
    'AI tools to earn money',
    'AI side hustles',
    'AI freelancing tips',
    'make money with AI',
    'AI automation',
    'ChatGPT earnings',
    'AI productivity tools',
    'digital income AI',
  ],
  categories: {
    tools: ['AI tools', 'ChatGPT', 'Midjourney', 'AI software', 'automation tools'],
    money: ['earn money online', 'passive income', 'freelancing', 'side income', 'digital income'],
    learning: ['AI tutorials', 'AI learning', 'AI skills', 'AI education', 'AI training'],
    career: ['AI jobs', 'future of work', 'AI careers', 'remote work AI', 'AI freelancing'],
  },
};

export const PAGE_SEO = {
  home: {
    title: 'AIBlaze - Ignite Your Earnings with AI | AI Tools & Money Making Strategies',
    description: 'Discover the best AI tools and strategies to earn money in 2025. Learn ChatGPT, Midjourney, and automation techniques for students, freelancers, and creators.',
    keywords: [...SEO_KEYWORDS.primary, ...SEO_KEYWORDS.categories.tools].join(', '),
  },
  blogs: {
    title: 'AI & Money Blogs - Latest AI Tools and Earning Strategies | AIBlaze',
    description: 'Explore expert guides on AI tools, automation, freelancing, and digital income. Stay updated with the latest AI trends to boost your earnings.',
    keywords: [...SEO_KEYWORDS.primary, ...SEO_KEYWORDS.categories.learning].join(', '),
  },
  about: {
    title: 'About AIBlaze - Your Guide to AI-Powered Income | Mission & Values',
    description: 'Learn about AIBlaze\'s mission to democratize AI knowledge and help everyone earn money using artificial intelligence tools and automation.',
    keywords: 'about AIBlaze, AI education, AI mission, AI community, AI learning platform',
  },
  contact: {
    title: 'Contact AIBlaze - Get in Touch | Questions & Support',
    description: 'Have questions about AI tools or earning strategies? Contact the AIBlaze team for support, partnerships, or collaboration opportunities.',
    keywords: 'contact AIBlaze, AI support, AI questions, collaboration, partnerships',
  },
  privacy: {
    title: 'Privacy Policy - AIBlaze | Your Data Protection & Privacy',
    description: 'Read AIBlaze\'s privacy policy to understand how we protect your data and respect your privacy while you learn about AI tools.',
    keywords: 'privacy policy, data protection, user privacy, GDPR, data security',
  },
  terms: {
    title: 'Terms & Conditions - AIBlaze | User Agreement',
    description: 'Review AIBlaze\'s terms and conditions for using our platform, content, and services related to AI tools and earning strategies.',
    keywords: 'terms and conditions, user agreement, terms of service, legal terms',
  },
  disclaimer: {
    title: 'Disclaimer - AIBlaze | Important Information',
    description: 'Read important disclaimers about AIBlaze\'s content, earning estimates, and AI tool recommendations.',
    keywords: 'disclaimer, legal disclaimer, earnings disclaimer, AI tools disclaimer',
  },
  sitemap: {
    title: 'Sitemap - AIBlaze | Navigate All Pages',
    description: 'Browse all pages and blog posts on AIBlaze. Find AI tools, earning guides, and automation strategies easily.',
    keywords: 'sitemap, site navigation, all pages, content index',
  },
};
