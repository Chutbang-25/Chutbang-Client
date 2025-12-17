import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
    try {
        const supabase = createAdminClient();
        const searchParams = req.nextUrl.searchParams;
        const stage = searchParams.get('stage'); // 'PRE_CONTRACT', 'CONTRACT', 'POST_CONTRACT' 등

        let query = supabase
            .from('contract_checklists')
            .select('*')
            .order('order', { ascending: true });

        if (stage) {
            query = query.eq('stage', stage);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Contract checklist error:', error);
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
    } catch (e: any) {
        console.error('Unexpected error:', e);
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR', details: e.message },
            { status: 500 }
        );
    }
}
