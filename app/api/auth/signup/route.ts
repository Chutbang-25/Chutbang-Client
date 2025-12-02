import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabaseServer';

const signupSchema = z.object({
    id: z.string().email(), // 여기서 이메일로 가정
    nickname: z.string().min(1),
    password: z.string().min(6),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, nickname, password } = signupSchema.parse(body);

        const supabase = createAdminClient();

        const { data, error } = await supabase.auth.signUp({
            email: id,
            password,
            options: {
                data: { nickname },
            },
        });

        if (error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }

        // 이메일 인증 설정에 따라 session이 없을 수도 있음
        const accessToken = data.session?.access_token ?? '';
        const refreshToken = data.session?.refresh_token ?? '';

        return NextResponse.json(
            {
                success: true,
                data: { accessToken, refreshToken },
            },
            { status: 201 }
        );
    } catch (e: any) {
        if (e?.name === 'ZodError') {
            return NextResponse.json(
                { success: false, error: 'INVALID_BODY', details: e.format() },
                { status: 400 }
            );
        }
        console.error(e);
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR' },
            { status: 500 }
        );
    }
}
