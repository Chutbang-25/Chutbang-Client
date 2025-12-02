import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabaseServer';

const loginSchema = z.object({
    id: z.string().email(),
    password: z.string(),
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { id, password } = loginSchema.parse(body);

    const supabase = createAdminClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: id,
        password,
    });

    if (error || !data.session) {
        return NextResponse.json(
            { success: false, error: error?.message ?? 'LOGIN_FAILED' },
            { status: 401 }
        );
    }

    return NextResponse.json({
        success: true,
        data: {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
        },
    });
}
