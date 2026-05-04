import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const missing = !supabaseUrl || !supabaseAnonKey;

if (missing) {
  console.warn(
    "[Stash] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — waitlist submissions disabled. " +
    "Add them to your .env file or Vercel dashboard."
  );
}

export const supabase = missing
  ? null
  : createClient(supabaseUrl!, supabaseAnonKey!);
