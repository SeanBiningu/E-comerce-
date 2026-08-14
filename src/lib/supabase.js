import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Keep the storefront available until a real Supabase project is configured.
// createClient throws for placeholder values such as "YOUR_SUPABASE_PROJECT_URL",
// which previously prevented React from rendering anything at all.
const hasValidSupabaseUrl = (() => {
  try {
    const url = new URL(supabaseUrl);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
})();

export const supabase = hasValidSupabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
