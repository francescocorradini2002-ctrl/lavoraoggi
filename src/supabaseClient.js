import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ajbizzpllmzoyeoiyxni.supabase.co";
const supabaseKey = "sb_publishable_eYbenktCKL_jM4K51Z-8pw_gnaMa0nP";

export const supabase = createClient(supabaseUrl, supabaseKey);