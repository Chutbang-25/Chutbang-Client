import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const { user, supabase, response } = await requireUser(req);
    if (!user) return response!;

    const { data, error } = await supabase
        .from('housing_sessions')
        .select(
            'session_id, created_at, summary:result->summary, recommendation:result->recommendation'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json(
            { success: false, error: 'DB_ERROR', details: error },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        count: data.length,
        data,
    });
}
