import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
    const supabase = createAdminClient();

    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get('city');
    const district = searchParams.get('district');
    const onlyOpen = searchParams.get('open') === 'true';

    let query = supabase.from('public_housing').select('*');

    if (city) query = query.eq('city', city);
    if (district) query = query.eq('district', district);

    if (onlyOpen) {
        const today = new Date().toISOString().split('T')[0];
        query = query
            .lte('application_start', today)
            .gte('application_end', today);
    }

    const { data, error } = await query.order('application_start', {
        ascending: true,
    });

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
