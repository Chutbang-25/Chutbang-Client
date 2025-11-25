// src/lib/supabaseServer.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 1) 어드민 용 (회원가입 등)
export function createAdminClient(): SupabaseClient {
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  });
}

// 2) 유저 JWT로 동작하는 클라이언트
export function createUserClient(accessToken?: string): SupabaseClient {
  const client = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false }
  });

  if (accessToken) {
    client.auth.setAuth(accessToken);
  }
  return client;
}
