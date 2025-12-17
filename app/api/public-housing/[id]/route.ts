import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseServer';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = createAdminClient();
    const { id } = await params;

    const { data, error } = await supabase
        .from('public_housing')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return NextResponse.json(
            { success: false, error: 'NOT_FOUND', detail: error },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        data,
    });
}
