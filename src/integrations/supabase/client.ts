// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ckxokiglkqpncofkydzv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNreG9raWdsa3FwbmNvZmt5ZHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Mjg4NzIsImV4cCI6MjA1ODAwNDg3Mn0.BCNatKME9p8x9HJ3blPkPFjp7u6vN-o4ZVcBIZRdlq4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);