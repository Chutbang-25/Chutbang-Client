import { NextRequest, NextResponse } from 'next/server';
import { createUserClient } from './supabaseServer';

export async function requireUser(req: NextRequest) {
    const auth = req.headers.get('authorization');

    if (!auth?.startsWith('Bearer ')) {
        return { user: null, response: unauthorized() };
    }

    const token = auth.replace('Bearer ', '');
    const supabase = createUserClient(token);

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        return { user: null, response: unauthorized() };
    }

    return { user: data.user, supabase };
}

function unauthorized() {
    return NextResponse.json(
        { success: false, error: 'UNAUTHORIZED' },
        { status: 401 }
    );
}
