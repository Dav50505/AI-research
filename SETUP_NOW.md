# ⚠️ SETUP REQUIRED: Create Your .env.local File

## The Problem

You're seeing errors because the `.env.local` file with your API keys is missing!

## Quick Fix (5 minutes)

### Step 1: Create the File

Create a new file called `.env.local` in the root directory of the project.

### Step 2: Add This Content

```env
# Supabase - Get from https://supabase.com/dashboard/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# OpenAI - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-...

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
CRON_SECRET=your_random_32_character_hex_string
```

### Step 3: Get Your API Keys

#### Get Supabase Keys (2 minutes):

1. Go to https://supabase.com/dashboard
2. Create a new project (or select existing)
3. Go to **Settings → API**
4. Copy:
   - **URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

#### Get OpenAI API Key (2 minutes):

1. Go to https://platform.openai.com/api-keys
2. Click **Create new secret key**
3. Give it a name like "AI Dev Radar"
4. Copy the key → `OPENAI_API_KEY`

#### Generate Cron Secret (10 seconds):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output → `CRON_SECRET`

### Step 4: Save and Restart

1. Save `.env.local`
2. Stop the dev server (Ctrl+C)
3. Start it again:

```bash
npm run dev
```

## Verify It Works

### Test 1: Visit the home page
```
http://localhost:3000
```
Should load without errors.

### Test 2: Try the chat
```
http://localhost:3000/chat
```
Type a message and you should get a response from ChatGPT!

## What If I Don't Want to Use Supabase Yet?

The chat will work with JUST the OpenAI key! The Supabase errors won't stop the chat from working.

Just create `.env.local` with:

```env
OPENAI_API_KEY=sk-your-key-here
CRON_SECRET=some-random-string

# Temporary placeholders (chat will still work!)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
SUPABASE_SERVICE_ROLE_KEY=placeholder
```

## Still Having Issues?

Check the terminal for error messages. Common issues:

1. **"OPENAI_API_KEY is not set"** → Add your OpenAI key to `.env.local`
2. **"supabaseUrl is required"** → Add placeholder or real Supabase URL
3. **Chat not responding** → Check your OpenAI API key is valid and has credits

---

**Once you create `.env.local` with your OpenAI key, the chat will work immediately!** 🚀

