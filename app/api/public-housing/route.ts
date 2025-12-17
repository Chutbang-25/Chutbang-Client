import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'MISSING_ENV_VAR',
                    details: 'SUPABASE_SERVICE_ROLE_KEY is missing',
                },
                { status: 500 }
            );
        }

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
            console.error('Supabase error:', error);
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
    } catch (e) {
        console.error('Unexpected error:', e);
        return NextResponse.json(
            {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                details: String(e),
            },
            { status: 500 }
        );
    }
}
