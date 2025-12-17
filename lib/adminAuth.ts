import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from './supabaseServer';

export async function requireAdmin(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
        return { isAdmin: false, response: unauthorized() };
    }

    const supabase = createAdminClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
        return { isAdmin: false, response: unauthorized() };
    }

    // 1. user_metadata의 role이 admin인지 확인
    // 2. 또는 이메일이 ADMIN_EMAIL과 일치하는지 확인
    const isAdminByRole = user.user_metadata?.role === 'admin';
    const isAdminByEmail = user.email === process.env.ADMIN_EMAIL;

    if (!isAdminByRole && !isAdminByEmail) {
        return {
            isAdmin: false,
            response: NextResponse.json(
                { success: false, error: 'FORBIDDEN' },
                { status: 403 }
            ),
        };
    }

    return { isAdmin: true, supabase, user };
}

function unauthorized() {
    return NextResponse.json(
        { success: false, error: 'UNAUTHORIZED' },
        { status: 401 }
    );
}
