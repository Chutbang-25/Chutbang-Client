import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/adminAuth';

// 관리자 전용 목록 조회 (권한 확인용 겸용)
export async function GET(req: NextRequest) {
    try {
        const { isAdmin, supabase, response } = await requireAdmin(req);
        if (!isAdmin || !supabase) return response!;

        const { data, error } = await supabase
            .from('public_housing')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json(
                { success: false, error: 'DB_ERROR', details: error },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data: data ?? [] });
    } catch (e: any) {
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR', details: e.message },
            { status: 500 }
        );
    }
}

const publicHousingSchema = z.object({
    name: z.string(),
    type: z.string(),
    city: z.string(),
    district: z.string(),
    address: z.string(),
    scale: z.string().optional(),
    household_count: z.number().int().optional(),
    application_start: z.string(),
    application_end: z.string(),
    move_in_date: z.string().optional(),
    price_range: z.string().optional(),
    qualification: z.string().optional(),
    url: z.string().url().optional(),
    contact: z.string().optional(),
});

// 공공임대 등록
export async function POST(req: NextRequest) {
    try {
        const { isAdmin, supabase, response } = await requireAdmin(req);
        if (!isAdmin || !supabase) return response!;

        const body = await req.json();
        const parsed = publicHousingSchema.parse(body);

        const { data, error } = await supabase
            .from('public_housing')
            .insert({
                ...parsed,
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Insert error:', error);
            return NextResponse.json(
                { success: false, error: 'DB_ERROR', details: error },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data,
            },
            { status: 201 }
        );
    } catch (e: any) {
        if (e?.name === 'ZodError') {
            return NextResponse.json(
                { success: false, error: 'INVALID_BODY', details: e.format() },
                { status: 400 }
            );
        }
        console.error('Unexpected error:', e);
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR', details: e.message },
            { status: 500 }
        );
    }
}
