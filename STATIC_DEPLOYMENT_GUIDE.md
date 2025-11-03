# Static Site Deployment Guide for Render

## How to Deploy AIBlaze as a Static Site on Render

### Step 1: Create a New Static Site on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New"** → **"Static Site"**
3. Connect your GitHub repository

### Step 2: Configure Build Settings

Use these **exact** settings in Render:

**Build Command:**
```
npm install; npm run build
```

**Publish Directory:**
```
dist/public
```

**Auto-Deploy:**
- Set to "Yes" if you want automatic deployments on git push

### Step 3: Deploy

1. Click **"Create Static Site"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at the provided URL

### Troubleshooting

#### If blogs are not showing:

1. **Check the build logs** - Make sure the build completed successfully
2. **Verify the publish directory** - It MUST be `dist/public` (not just `dist`)
3. **Clear browser cache** - Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
4. **Check the console** - Open browser DevTools and look for any errors

#### If images are missing:

- Make sure all image files are in the `client/public/` folder before building
- Check that image paths in JSON files start with `/` (e.g., `/generated_images/...`)

### What's Included in the Static Build

✅ All blog content from `blogs-data.json`  
✅ Hero slider data from `slide.json`  
✅ All images and assets  
✅ Fully responsive design  
✅ SEO metadata and sitemap  

### Newsletter Feature

The "Subscribe Now" button currently shows "Coming Soon" - this is intentional for the static deployment. Newsletter functionality can be added later with a backend service if needed.

### Performance

Static sites on Render load extremely fast because:
- No backend server to spin up
- All content is pre-built HTML/CSS/JS
- Served from a CDN
- Zero cold starts

Your site should load in under 2 seconds worldwide! 🚀
