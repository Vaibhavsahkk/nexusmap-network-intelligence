# 🚢 NexusMap — Deployment Guide

> From local dev to live URL in 10 minutes.

---

## Deployment Target: Vercel (Free Tier)

**Why Vercel?**
- Native Next.js hosting (zero config)
- Free tier: 100GB bandwidth, serverless functions
- Automatic HTTPS
- Environment variables UI
- Git-push deploys

---

## Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: NexusMap - Professional Network Intelligence Platform"

# Create GitHub repo (public or private)
# Go to github.com/new → create "nexusmap"

git remote add origin https://github.com/YOUR_USERNAME/nexusmap.git
git push -u origin main
```

> If private repo: Add `wexa-ai` (or their GitHub handle) as collaborator.

---

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your `nexusmap` repo
4. Framework: **Next.js** (auto-detected)
5. **Environment Variables** — Add these:
   ```
   COGNODB_URI     = bolt+s://your-instance.databases.cognodb.cloud
   COGNODB_USER    = cognodb
   COGNODB_PASSWORD = your-password
   ```
6. Click **Deploy**
7. Wait 1-2 minutes → Your app is live at `nexusmap.vercel.app`

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
# Follow prompts, set env vars when asked
```

---

## Step 3: Verify Production

1. Visit `https://nexusmap.vercel.app`
2. Check `/api/health` returns healthy
3. Test search, path finding, and graph visualization
4. Verify mobile responsive layout

---

## Step 4: Custom Domain (Optional)

In Vercel dashboard:
1. Settings → Domains
2. Add `nexusmap.yourdomain.com`
3. Configure DNS as instructed

---

## Pre-Submission Checklist

- [ ] App loads at production URL
- [ ] `/api/health` returns `{"status": "healthy"}`
- [ ] Search works with real CognoDB data
- [ ] Path finder shows warm paths
- [ ] Graph visualization renders and is interactive
- [ ] Loading states visible during data fetch
- [ ] Error state works (test by temporarily wrong password)
- [ ] No `.env.local` in GitHub repo
- [ ] README has live demo link
- [ ] Screen recording created
- [ ] CognoDB instance is RUNNING (don't delete it!)

---

## Submission Email Template

```
To: hr@wexa.ai
Subject: CognoDB Assignment 2 – [Your Name]

Hi,

Please find my submission for the CognoDB take-home assignment:

GitHub: https://github.com/[username]/nexusmap
Live Demo: https://nexusmap.vercel.app
Screen Recording: [Loom/YouTube link]

Tech Stack: Next.js 15, React 19, CognoDB, react-force-graph-2d
Use Case: Professional Network Intelligence — warm path discovery

I've kept the CognoDB instance running for your review.

Thank you for the opportunity. Looking forward to discussing the implementation.

Best,
[Your Name]
```
