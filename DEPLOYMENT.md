# Deploying to Vercel

Your Next.js portfolio is ready to deploy to Vercel! Here are the steps:

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in with your GitHub account

3. **Click "Add New Project"**

4. **Import your repository** - Select your `dev-portfolio` repository

5. **Configure the project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `pnpm build` (or leave default)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `pnpm install` (or leave default)

6. **Click "Deploy"** - Vercel will automatically:
   - Install dependencies
   - Build your project
   - Deploy it to a production URL

## Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   # or
   pnpm add -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Build Settings

Your project is configured with:
- **Framework**: Next.js 16
- **Package Manager**: pnpm
- **Node Version**: 20+ (auto-detected by Vercel)

## Environment Variables

If you need any environment variables:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add your variables

## Custom Domain

After deployment:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Notes

- Vercel automatically detects Next.js projects
- Your build is already tested and working ✅
- The project will be automatically rebuilt on every push to your main branch
- Preview deployments are created for pull requests

