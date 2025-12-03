# 📋 Deployment Checklist

Use this checklist to ensure everything is set up correctly before deploying.

## ✅ Local Setup

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created with all required variables
- [ ] Supabase project created
- [ ] Database schema applied (`supabase/schema.sql`)
- [ ] OpenAI API key obtained and added
- [ ] Cron secret generated and added
- [ ] Development server runs (`npm run dev`)
- [ ] Home page loads at http://localhost:3000
- [ ] Latest Updates page works (may be empty initially)
- [ ] Chat page works and responds
- [ ] Scanner endpoint tested manually

## ✅ Supabase Configuration

- [ ] Project created on Supabase
- [ ] SQL schema from `supabase/schema.sql` executed
- [ ] Project URL copied to `.env.local`
- [ ] `anon` key copied to `.env.local`
- [ ] `service_role` key copied to `.env.local`
- [ ] Database connection tested

## ✅ API Keys

- [ ] OpenAI API key obtained from https://platform.openai.com/api-keys
- [ ] API key has sufficient credits/quota
- [ ] API key added to `.env.local`
- [ ] Chat endpoint tested successfully

## ✅ Git & GitHub

- [ ] Repository initialized (`git init`)
- [ ] `.gitignore` includes `.env.local`
- [ ] All files committed
- [ ] Repository pushed to GitHub

## ✅ Vercel Deployment

- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Environment variables added in Vercel dashboard:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `OPENAI_API_KEY`
  - [ ] `CRON_SECRET`
- [ ] First deployment successful
- [ ] Website accessible at Vercel URL

## ✅ Production Testing

- [ ] Home page loads correctly
- [ ] Navigation works (Home, Latest, Ask AI)
- [ ] Chat interface works
- [ ] Scanner endpoint accessible
- [ ] Manual scan test successful:
  ```bash
  curl -X POST https://your-app.vercel.app/api/scan \
    -H "Authorization: Bearer YOUR_CRON_SECRET"
  ```
- [ ] Data appears in Latest Updates page after scan
- [ ] Dark mode works

## ✅ Cron Job Setup

### Option A: Vercel Cron (Pro Plan Required)

- [ ] Vercel Pro plan active
- [ ] `vercel.json` contains cron configuration
- [ ] Cron job visible in Vercel dashboard
- [ ] First scheduled run completed successfully

### Option B: External Cron Service (Free Alternative)

- [ ] External cron service selected (e.g., cron-job.org, EasyCron)
- [ ] Cron job created with:
  - URL: `https://your-app.vercel.app/api/scan`
  - Method: POST
  - Header: `Authorization: Bearer YOUR_CRON_SECRET`
  - Schedule: `0 */12 * * *` (every 12 hours)
- [ ] First scheduled run completed successfully

## ✅ Monitoring

- [ ] Vercel logs accessible
- [ ] Supabase logs accessible
- [ ] Error tracking configured (optional)
- [ ] Cron job notifications set up (optional)

## 🎉 Launch

- [ ] Everything above is checked
- [ ] Website is live and functional
- [ ] Scanner runs every 12 hours
- [ ] Users can access all features

---

## 🔧 Troubleshooting

If something doesn't work:

1. Check Vercel logs
2. Check browser console for frontend errors
3. Verify all environment variables in Vercel
4. Test API endpoints manually
5. Check Supabase logs and database

---

## 🚀 Post-Launch

- [ ] Share the website URL
- [ ] Monitor first few scan runs
- [ ] Gather user feedback
- [ ] Plan customizations/improvements


