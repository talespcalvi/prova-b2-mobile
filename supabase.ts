import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'SUA-URL';
const supabaseAnonKey = 'SUA-ANON-KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);