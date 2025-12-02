import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';

export async function GET(
    req: NextRequest,
    { params }: { params: { sessionId: string } }
) {
    const { user, supabase, response } = await requireUser(req);
    if (!user) return response!;

    const { data, error } = await supabase
        .from('housing_sessions')
        .select('*')
        .eq('session_id', params.sessionId)
        .eq('user_id', user.id)
        .single();

    if (!data || error) {
        return NextResponse.json(
            { success: false, error: 'NOT_FOUND' },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        data,
    });
}
