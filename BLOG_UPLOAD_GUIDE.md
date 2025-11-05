# 📝 How to Add New Blogs to Your Website

## ✨ Auto-Deploy System (GitHub → Render)

Your blog system is now **fully automated**! Just upload JSON files to GitHub and they'll automatically appear on your website.

## 🚀 How It Works

1. **Upload Blog JSON** → Add your blog JSON file to the `blogs/` folder in GitHub
2. **Render Auto-Deploys** → Render detects the change and rebuilds your app
3. **Blog Appears** → Your new blog is live on the website!

No code editing needed! 🎉

## 📋 Blog JSON Template

Every blog JSON file must have these fields:

```json
{
  "id": "blog-123456",
  "slug": "your-blog-url-slug",
  "title": "Your Blog Title Here",
  "excerpt": "A short description of your blog (2-3 sentences)",
  "content": "<h2>Your HTML Content</h2><p>Full blog post content in HTML format...</p>",
  "author": "AIBlaze Team",
  "category": "AI Tools",
  "imagePath": "/generated_images/your-image.png",
  "readTime": 7,
  "featured": 1,
  "publishedAt": "2025-11-04"
}
```

## 🎯 Field Explanations

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique identifier | `"blog-536260"` |
| `slug` | URL-friendly name | `"how-to-earn-money-with-ai"` |
| `title` | Blog title | `"10 Ways to Earn with AI"` |
| `excerpt` | Short description (shown on cards) | `"Discover the top AI tools..."` |
| `content` | Full HTML content | `"<h2>Intro</h2><p>Text...</p>"` |
| `author` | Author name | `"AIBlaze Team"` |
| `category` | Blog category | `"AI Tools"` |
| `imagePath` | Image URL or path | `"/generated_images/ai.png"` or external URL |
| `readTime` | Minutes to read | `7` |
| `featured` | Show on homepage? | `1` (yes) or `0` (no) |
| `publishedAt` | Publication date | `"2025-11-04"` |

## ✅ Steps to Upload a New Blog

### Option 1: GitHub Web Interface
1. Go to your GitHub repository
2. Navigate to the `blogs/` folder
3. Click "Add file" → "Upload files"
4. Upload your JSON file
5. Commit the changes
6. Render will auto-deploy in 1-2 minutes

### Option 2: Git Command Line
```bash
# Navigate to your project
cd your-project-folder

# Add your blog JSON to blogs/ folder
cp your-new-blog.json blogs/

# Commit and push
git add blogs/your-new-blog.json
git commit -m "Add new blog post"
git push origin main

# Render auto-deploys!
```

## 📌 Important Tips

1. **File Naming**: Use descriptive names like `blog-how-to-earn-money-ai.json`
2. **No Emojis**: Don't use emojis in content (design guidelines)
3. **Unique IDs**: Make sure each blog has a unique `id`
4. **Unique Slugs**: Make sure each blog has a unique `slug`
5. **Complete Content**: Don't truncate the `content` field
6. **Valid HTML**: Ensure your content HTML is properly formatted
7. **Image Paths**: Use external URLs or upload images to your CDN

## 🔍 Categories to Use

Stick to these existing categories for consistency:
- AI Tools
- Freelancing
- Income Generation
- Technology
- Tutorials

## ✨ Featured Blogs

Set `"featured": 1` to show the blog on your homepage.
Set `"featured": 0` for regular blog posts.

## 🐛 Troubleshooting

**Blog not showing up?**
1. Check the JSON syntax (use jsonlint.com)
2. Ensure all required fields are present
3. **IMPORTANT:** Make sure your Render Build Command is: `npm install && node scripts/generate-blogs-json.js && npm run build`
4. Check Render deployment logs
5. Wait 2-3 minutes for deployment
6. Clear browser cache and hard refresh (Ctrl+Shift+R)

**Image not loading?**
- Use full URLs for external images
- Or upload to your CDN and use the path

## ⚙️ First-Time Setup on Render

If blogs aren't updating automatically, you need to update your Render Build Command:

1. Go to Render Dashboard
2. Select your web service
3. Go to **Settings** → **Build & Deploy**
4. Update **Build Command** to:
   ```
   npm install && node scripts/generate-blogs-json.js && npm run build
   ```
5. Save and redeploy

This ensures blog JSON files are consolidated before each deployment.

---

**Need Help?** Check the logs or contact support!
