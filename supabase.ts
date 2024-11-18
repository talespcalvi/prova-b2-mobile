import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas credenciais do Supabase
const supabaseUrl = 'https://hileqiojakcfrlblvvqr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbGVxaW9qYWtjZnJsYmx2dnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzI3MjYsImV4cCI6MjA0NzUwODcyNn0.duU63r6P0urvOIiyZc-yJfBK_OSOselcoVieIN5gqrA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);