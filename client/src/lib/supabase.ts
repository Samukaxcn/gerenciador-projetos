import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hweyxnxxjctwuqkztgnb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3ZXl4bnh4amN0d3Vxa3p0Z25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1Nzc2NjMsImV4cCI6MjA3NzE1MzY2M30.0u3hSVdWsPikn-CR1FOxcgrfbKuvrPl0aKpQ7HMXt_8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

