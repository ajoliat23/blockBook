import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qirvaheiwtaoupddqgjo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcnZhaGVpd3Rhb3VwZGRxZ2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMTkxNTAsImV4cCI6MTk4NTU5NTE1MH0.rpg_BLLuHmST0k5wWaySFS9M_axYjinbPTa5dlnrwkQ'
export const supabaseClient = createClient(supabaseUrl, supabaseKey)