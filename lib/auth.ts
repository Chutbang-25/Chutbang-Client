import { NextRequest, NextResponse } from 'next/server';
import { createUserClient } from './supabaseServer';

export async function requireUser(req: NextRequest) {
    const authHeader = req.headers.get('authorization') ?? '';
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice('Bearer '.length)
        : null;

    if (!token) {
        return {
            user: null,
            res: NextResponse.json(
                { success: false, error: 'UNAUTHORIZED' },
                { status: 401 }
            ),
        };
    }

    const supabase = createUserClient(token);
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        return {
            user: null,
            res: NextResponse.json(
                { success: false, error: 'UNAUTHORIZED' },
                { status: 401 }
            ),
        };
    }

    return { user: data.user, supabase };
}
