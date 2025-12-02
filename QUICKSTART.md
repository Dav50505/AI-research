# 🚀 Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create .env.local

Create a `.env.local` file in the root directory with:

```env
# Supabase (get from https://supabase.com/dashboard/project/_/settings/api)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# OpenAI API Key
OPENAI_API_KEY=sk-...

# Cron Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
CRON_SECRET=your_random_secret_here
```

## Step 3: Set Up Supabase Database

1. Go to https://supabase.com/dashboard
2. Create a new project
3. Go to SQL Editor
4. Copy and run the SQL from `supabase/schema.sql`

## Step 4: Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Step 5: Test the Scanner

```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Or visit: http://localhost:3000/api/scan?secret=YOUR_CRON_SECRET

## Step 6: Deploy to Vercel

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

Then:
1. Go to https://vercel.com/new
2. Import your repository
3. Add environment variables
4. Deploy!

---

## 🎯 Next Steps

- **Customize the prompts** in `lib/prompts.ts`
- **Adjust the cron schedule** in `vercel.json`
- **Style the UI** by editing components and `app/globals.css`

Need help? Check the full README.md for detailed instructions!

