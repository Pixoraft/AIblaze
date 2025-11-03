# Deploy AIBlaze to Render (Web Service)

## Important: This is NOT a Static Site!

AIBlaze is a **full-stack application** with a Node.js backend that serves API endpoints. You must deploy it as a **Web Service**, not a Static Site.

## Render Deployment Configuration

### Step 1: Delete the Current Static Site
1. Go to your Render dashboard
2. Delete the "AIblaze" static site deployment

### Step 2: Create a New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Pixoraft/AIblaze`

### Step 3: Configure the Web Service

**Name:** `AIblaze`

**Environment:** `Node`

**Region:** Choose your preferred region

**Branch:** `main`

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Instance Type:** `Free` (or your preferred plan)

### Step 4: Add Environment Variable (Optional)
If you want a custom domain, add:
- **Key:** `SITE_URL`
- **Value:** `https://aiblaze.onrender.com` (or your custom domain)

### Step 5: Deploy
Click **"Create Web Service"**

The deployment will:
1. Install dependencies
2. Build the frontend and backend
3. Start the Express server on port 5000
4. Serve both the React frontend AND the API endpoints

## Why Web Service Instead of Static Site?

Your application needs:
- **Backend API** at `/api/blogs`, `/api/blogs/featured`, `/api/contact`
- **Express server** running Node.js
- **Dynamic data** served from in-memory storage

A static site deployment only serves HTML/CSS/JS files and cannot run your backend API, which is why you're getting 404 errors on the blog endpoints.

## After Deployment

Your site will be live at:
- `https://aiblaze.onrender.com` (or your custom domain)

All pages and API endpoints will work:
- Home page: `/`
- Blogs page: `/blogs`
- Individual blog: `/blog/[slug]`
- API endpoints: `/api/blogs`, `/api/blogs/featured`, etc.

## Troubleshooting

If blogs still don't load:
1. Check the logs in Render dashboard
2. Ensure the "Start Command" is `npm start` (not `npm run dev`)
3. Verify the build completed successfully
4. Make sure you're deploying from the `main` branch with the latest changes
