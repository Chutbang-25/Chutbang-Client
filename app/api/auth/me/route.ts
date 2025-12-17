import { NextRequest, NextResponse } from 'next/server';
import { createUserClient } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'UNAUTHORIZED' },
                { status: 401 }
            );
        }

        const supabase = createUserClient(token);

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json(
                {
                    success: false,
                    error: error?.message ?? 'USER_NOT_FOUND',
                },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                nickname: user.user_metadata?.nickname,
                createdAt: user.created_at,
            },
        });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR' },
            { status: 500 }
        );
    }
}
