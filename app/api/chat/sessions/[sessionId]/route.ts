import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ sessionId: string }> }
) {
    const { user, supabase, response } = await requireUser(req);
    if (!user) return response!;

    const { sessionId } = await params;

    const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .eq('user_id', user.id)
        .single();

    if (error || !data) {
        return NextResponse.json(
            { success: false, error: 'SESSION_NOT_FOUND' },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        data: {
            sessionId: data.session_id,
            messages: data.messages,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        },
    });
}
