import { createClient } from '@supabase/supabase-js';

// Check for required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Log warnings if environment variables are missing (only in development)
if (process.env.NODE_ENV === 'development') {
  if (!supabaseUrl) {
    console.warn('[Supabase] Warning: NEXT_PUBLIC_SUPABASE_URL is not set');
  }
  if (!supabaseAnonKey) {
    console.warn('[Supabase] Warning: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  }
  if (!supabaseServiceKey) {
    console.warn('[Supabase] Warning: SUPABASE_SERVICE_ROLE_KEY is not set');
  }
}

// Create clients (will throw error if URL/key is invalid when actually used)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for cron jobs)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey
);

