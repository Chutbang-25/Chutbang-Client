import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 1) Admin (회원가입/로그인 등)
export function createAdminClient() {
    return createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
    });
}

// 2) 유저 JWT로 인증되는 클라이언트
export function createUserClient(accessToken?: string) {
    return createClient(supabaseUrl, anonKey, {
        auth: {
            persistSession: false,
            detectSessionInUrl: false,
        },
        global: {
            headers: accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {},
        },
    });
}
