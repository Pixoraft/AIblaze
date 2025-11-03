# AIBlaze - AI + Money Blog Website

## Project Overview
AIBlaze is a modern, futuristic blog website focused on teaching people how to earn money using AI tools, automation, and digital systems. The website features a stunning blue-purple gradient aesthetic with smooth animations, responsive design, and psychology-driven UX.

## Tech Stack
- **Frontend**: React with TypeScript, Tailwind CSS, Wouter (routing), React Query
- **Backend**: Express.js with TypeScript
- **Styling**: Tailwind CSS with custom gradients, Shadcn UI components
- **Fonts**: Poppins (primary), Inter (UI elements)
- **Icons**: Lucide React
- **Data**: In-memory storage with preloaded blog content

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Shadcn UI components
│   │   │   ├── theme-provider.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── blog-card.tsx
│   │   ├── pages/
│   │   │   ├── home.tsx      # Landing page with hero section
│   │   │   ├── blogs.tsx     # Blog listing page
│   │   │   ├── blog-detail.tsx  # Individual blog post
│   │   │   ├── about.tsx     # About page
│   │   │   ├── contact.tsx   # Contact form
│   │   │   └── not-found.tsx
│   │   ├── App.tsx
│   │   └── index.css
│   └── index.html
├── server/
│   ├── storage.ts   # In-memory storage with 10 preloaded blogs
│   └── routes.ts    # API endpoints
├── shared/
│   └── schema.ts    # TypeScript types and Zod schemas
└── design_guidelines.md  # Complete design system documentation
```

## Features

### Pages
1. **Home** (`/`)
   - Animated gradient hero section with "Ignite Your Earnings with AI" headline
   - Featured blog posts grid (3 columns)
   - "Why AIBlaze?" section with Learn, Earn, Grow cards
   - Call-to-action section

2. **Blogs** (`/blogs`)
   - Grid layout of all blog posts
   - Category badges, read time, publish dates
   - Hover effects with card elevation and image scaling

3. **Blog Detail** (`/blog/:slug`)
   - Full-width hero image
   - Structured content with proper HTML headings
   - Share buttons (Twitter, LinkedIn, Copy Link)
   - Related posts section

4. **About** (`/about`)
   - Mission statement
   - Company story
   - Core values (Accessibility, Innovation, Growth)

5. **Contact** (`/contact`)
   - Validated contact form (Name, Email, Message)
   - Success state with animated checkmark
   - Contact information cards

### Core Features
- **Dark Mode**: Smooth theme toggle with localStorage persistence
- **Responsive Design**: Mobile-first approach, works on all devices
- **SEO Optimized**: Meta tags, Open Graph tags, semantic HTML
- **Smooth Animations**: Fade-in effects, hover elevations, scroll animations
- **Blog Content**: 10 preloaded AI + Money blog posts with complete content

## API Endpoints

### Blogs
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/featured` - Get featured blog posts (featured=1)
- `GET /api/blogs/:slug` - Get single blog post by slug
- `GET /api/blogs/related/:id` - Get related posts by category

### Contact
- `POST /api/contact` - Submit contact form (validated with Zod)

## Blog Content
The website includes 10 comprehensive blog posts:
1. 10 Best AI Tools to Earn Money in 2025
2. How Students Can Use AI to Make ₹10,000/Month
3. Top Free AI Websites Every YouTuber Should Know
4. How to Start Freelancing with ChatGPT
5. 5 AI Chrome Extensions That Save Hours of Work
6. AI vs Human Creativity — Who Wins?
7. How I Created a Full Website Using AI in 30 Minutes
8. 7 AI Tools That Can Replace Employees
9. The Future of Jobs: AI Skills That Pay the Most
10. How to Build a Personal Brand Using AI

## Design System
- **Colors**: Blue-purple gradient theme with orange Flame accents
- **Typography**: Poppins for headings/body, Inter for UI elements
- **Components**: Shadcn UI (Button, Card, Badge, Input, Textarea, Label)
- **Animations**: Fade-in on scroll, hover elevations, smooth transitions
- **Layout**: Max-width containers, consistent spacing, card-based design

## Development
```bash
npm run dev  # Starts both Express backend and Vite frontend on port 5000
```

## Recent Changes (November 3, 2025)
- ✅ Complete implementation of AIBlaze blog website
- ✅ All pages built with futuristic design and smooth animations
- ✅ 10 preloaded blog posts with full content
- ✅ Dark mode implementation with theme toggle
- ✅ SEO optimization with meta tags and Open Graph
- ✅ Contact form with validation
- ✅ Share functionality on blog posts
- ✅ Responsive design across all breakpoints
- ✅ Fixed blog detail API queries to use correct URL paths
- ✅ Replaced all emojis with Lucide React Flame icons
- ✅ Fixed wouter Link components to avoid nested anchor tags
- 🔄 **STARTING: Full Stack SEO Optimization** (November 3, 2025)
  - Adding structured data (JSON-LD schema) for all pages
  - Implementing page-specific meta tags and SEO components
  - Creating sitemap.xml and robots.txt
  - Performance optimizations (lazy loading, preloading, compression)
  - Google Analytics and Search Console integration
  - Enhanced internal linking and content optimization
  - Author bio sections and newsletter CTAs
  - Target: Lighthouse SEO score ≥95, PageSpeed ≥90

## User Preferences
- Focus on visual excellence with futuristic blue-purple gradient aesthetic
- Psychology-driven design for user engagement and trust-building
- Clean, card-based layouts with smooth animations
- Mobile-first responsive approach
- SEO excellence for high Google rankings and AdSense approval
