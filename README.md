# 🔍 AI Dev Radar

**AI Dev Radar** is a Next.js 14 web application that automatically tracks and curates the latest developments in:

1. **Coding & Software Development Tools** (especially AI-assisted coding)
2. **Machine Learning & AI Learning Resources**
3. **AI Models, Frameworks, and Platforms**

The app runs an automated scanner every 2 hours to collect new information and stores it in a Supabase database. Users can view the latest updates or chat with an AI assistant to ask questions.

---

## 🚀 Features

- ✅ **Automated scanning** every 2 hours via Vercel Cron
- ✅ **Latest Updates page** with organized, filterable content
- ✅ **AI Chat Assistant** for answering questions about recent developments
- ✅ **Beautiful, responsive UI** with dark mode support
- ✅ **Full TypeScript** support
- ✅ **Edge-optimized** API routes

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI GPT-4 (or Anthropic Claude)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Scheduled Jobs:** Vercel Cron

---

## 📋 Prerequisites

Before you start, make sure you have:

1. **Node.js 18+** installed
2. A **Supabase** account ([sign up free](https://supabase.com))
3. An **OpenAI API key** ([get one here](https://platform.openai.com/api-keys))
4. A **Vercel** account (optional, for deployment)

---

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-dev-radar
npm install
```

### 2. Set Up Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to **SQL Editor** and run the schema from `supabase/schema.sql`
4. Go to **Settings > API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=sk-...

# Cron Secret (generate a random string)
CRON_SECRET=your_random_secret_string_here
```

**To generate a secure `CRON_SECRET`:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Scanner Manually

Before deploying, test the scanner endpoint:

```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Or visit:
```
http://localhost:3000/api/scan?secret=YOUR_CRON_SECRET
```

Check your Supabase database to see if the data was stored.

---

## 🌐 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **New Project**
3. Import your GitHub repository
4. Add your environment variables (same as `.env.local`)
5. Click **Deploy**

### 3. Enable Vercel Cron

Vercel Cron is configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/scan",
      "schedule": "0 */12 * * *"
    }
  ]
}
```

**Important:** Vercel Cron requires a **Pro plan** ($20/month). On the free Hobby plan, you can:

- Manually trigger scans via the test endpoint
- Use external cron services like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com)

**Example external cron:**
```
URL: https://your-app.vercel.app/api/scan
Method: POST
Headers: Authorization: Bearer YOUR_CRON_SECRET
Schedule: Every 2 hours (`0 */2 * * *`)
```

---

## 📁 Project Structure

```
ai-dev-radar/
├── app/
│   ├── api/
│   │   ├── chat/route.ts       # AI chat endpoint
│   │   ├── latest/route.ts     # Get latest scan results
│   │   └── scan/route.ts       # Scanner cron job
│   ├── chat/page.tsx           # Chat UI
│   ├── latest/page.tsx         # Latest updates UI
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── lib/
│   ├── prompts.ts              # AI system prompts
│   ├── supabase.ts             # Supabase client
│   └── types.ts                # TypeScript types
├── supabase/
│   └── schema.sql              # Database schema
├── .env.local.example          # Environment variables template
├── next.config.js              # Next.js config
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
└── vercel.json                 # Vercel cron config
```

---

## 🔧 API Endpoints

### `GET /api/latest`
Returns the most recent scanner results from the database.

**Response:**
```json
{
  "id": "uuid",
  "created_at": "2024-12-02T...",
  "run_metadata": {...},
  "coding_tools": [...],
  "ml_resources": [...],
  "ai_models": [...],
  "trends": [...]
}
```

### `POST /api/chat`
Streams AI chat responses.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "What are the latest AI coding tools?"}
  ]
}
```

**Response:** Server-Sent Events (SSE) stream

### `POST /api/scan`
Triggers the scanner job (requires `Authorization` header with cron secret).

**Headers:**
```
Authorization: Bearer YOUR_CRON_SECRET
```

---

## 🎨 Customization

### Change AI Provider

To use **Anthropic Claude** instead of OpenAI:

1. Install the Anthropic SDK:
```bash
npm install @anthropic-ai/sdk
```

2. Update `app/api/chat/route.ts` and `app/api/scan/route.ts`:
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

3. Update the API calls accordingly

### Customize Scanner Schedule

Edit `vercel.json` to change the cron schedule:

```json
{
  "crons": [
    {
      "path": "/api/scan",
      "schedule": "0 */6 * * *"  // Every 6 hours
    }
  ]
}
```

Cron syntax: `minute hour day month weekday`

### Customize Prompts

Edit `lib/prompts.ts` to change the AI assistant behavior or scanner instructions.

---

## 🐛 Troubleshooting

### Scanner Not Running

1. **Check Vercel plan:** Cron requires Pro plan
2. **Check logs:** Vercel Dashboard > Logs
3. **Verify secret:** Ensure `CRON_SECRET` matches in Vercel settings
4. **Test manually:** Use the `?secret=` query parameter

### Chat Not Working

1. **Check API key:** Verify `OPENAI_API_KEY` is correct
2. **Check logs:** Browser console and Vercel logs
3. **Test locally:** `npm run dev` and check terminal output

### Database Errors

1. **Verify Supabase URL/keys** in environment variables
2. **Check schema:** Ensure `schema.sql` was run in Supabase
3. **Test connection:** Try the `/api/latest` endpoint

---

## 📊 Database Schema

The main table is `scanner_results`:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `created_at` | TIMESTAMPTZ | When scan was run |
| `run_metadata` | JSONB | Metadata about the scan |
| `coding_tools` | JSONB | Array of coding tools |
| `ml_resources` | JSONB | Array of ML resources |
| `ai_models` | JSONB | Array of AI models |
| `trends` | JSONB | Array of trends |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

---

## 📄 License

MIT License - feel free to use this for your own projects!

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
- Database by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)

---

## 📧 Support

If you run into issues or have questions, please open an issue on GitHub.

Happy tracking! 🚀


