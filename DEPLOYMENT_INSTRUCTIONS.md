# 🚀 Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to **[github.com/new](https://github.com/new)**
2. Fill in:
   - **Repository name:** `restaurant-app`
   - **Description:** Restaurant ordering system built with Next.js 16
   - **Privacy:** Public or Private (your choice)
   - **Do NOT initialize with README**
3. Click **"Create repository"**

## Step 2: Get Your Repository URL

After creating, GitHub will show you commands. Copy your HTTPS URL:
```
https://github.com/mahdees/restaurant-app.git
```

## Step 3: Push Code to GitHub

Run this command in PowerShell:
```powershell
cd c:\Users\HP\OneDrive\Desktop\resturant\my-app
&"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/mahdees/restaurant-app.git
&"C:\Program Files\Git\bin\git.exe" branch -M main
&"C:\Program Files\Git\bin\git.exe" push -u origin main
```

You may need to authenticate:
- Use your **GitHub username** (mahdees)
- Use a **Personal Access Token** (if password auth is disabled):
  - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` scope
  - Copy and paste when prompted

## Step 4: Deploy to Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Continue with GitHub"**
3. Click **"Import"** on your `restaurant-app` repository
4. Vercel will auto-detect:
   - Framework: **Next.js** ✓
   - Build Command: `npm run build` ✓
   - Output Directory: `.next` ✓
5. Click **"Deploy"**
6. Wait 2-3 minutes...
7. Get your live URL! 🎉

## Project Details

- **Framework:** Next.js 16.0.1
- **React:** 19.2.0
- **TypeScript:** Enabled
- **Styling:** Tailwind CSS 4
- **UI Library:** Radix UI
- **Status:** ✅ Production Ready
- **Build Errors:** 0
- **TypeScript Errors:** 0

## Features Included

✅ Restaurant menu with categories (burgers, sides, drinks, desserts)
✅ Shopping cart with checkout
✅ Admin dashboard with reports
✅ Contact page with map
✅ Responsive design
✅ Dark/Light theme support
✅ SSR-optimized (no window/location errors)
✅ Vercel deployment ready

Good luck! 🚀
