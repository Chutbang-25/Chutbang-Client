import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const { user, supabase, response } = await requireUser(req);
    if (!user) return response!;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
        .from('chat_sessions')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        return NextResponse.json(
            { success: false, error: 'DB_ERROR', details: error },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        count: count ?? 0,
        page,
        limit,
        totalPages: Math.ceil((count ?? 0) / limit),
        data,
    });
}
