import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabaseServer';

const refreshSchema = z.object({
    refreshToken: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { refreshToken } = refreshSchema.parse(body);

        const supabase = createAdminClient();

        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken,
        });

        if (error || !data.session) {
            return NextResponse.json(
                {
                    success: false,
                    error: error?.message ?? 'REFRESH_FAILED',
                },
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
