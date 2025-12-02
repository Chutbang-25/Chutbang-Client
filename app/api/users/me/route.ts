import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';

const profileSchema = z.object({
    age: z.number().int().optional(),
    income: z.number().int(),
    savings: z.number().int(),
    workLocation: z
        .object({
            address: z.string(),
            lat: z.number(),
            lng: z.number(),
        })
        .optional(),
    commutePreference: z
        .object({
            maxMinutes: z.number().int(),
            transport: z.enum(['PUBLIC', 'CAR', 'MIXED']),
        })
        .optional(),
    livingStyle: z
        .object({
            householdType: z.enum(['ALONE', 'ROOMMATE']),
            hasPet: z.boolean(),
        })
        .optional(),
    priorities: z
        .object({
            safety: z.number().int(),
            commute: z.number().int(),
            price: z.number().int(),
            comfort: z.number().int(),
        })
        .optional(),
});

// --------------------------- GET ---------------------------
export async function GET(req: NextRequest) {
    const { user, supabase, response } = await requireUser(req);
    if (!user) return response!;

    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: 'DB_ERROR' },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true, data });
}

// --------------------------- PUT ---------------------------
export async function PUT(req: NextRequest) {
    const { user, supabase, response } = await requireUser(req);
    if (!user) return response!;

    const body = await req.json();
    const parsed = profileSchema.parse(body);

    // 🔧 flatten 객체 -> DB column 형태 변환
    const payload = {
        user_id: user.id,
        age: parsed.age ?? null,
        income: parsed.income,
        savings: parsed.savings,
        work_address: parsed.workLocation?.address ?? null,
        work_lat: parsed.workLocation?.lat ?? null,
        work_lng: parsed.workLocation?.lng ?? null,
        commute_max_minutes: parsed.commutePreference?.maxMinutes ?? null,
        commute_transport: parsed.commutePreference?.transport ?? null,
        household_type: parsed.livingStyle?.householdType ?? null,
        has_pet: parsed.livingStyle?.hasPet ?? null,
        priority_safety: parsed.priorities?.safety ?? null,
        priority_commute: parsed.priorities?.commute ?? null,
        priority_price: parsed.priorities?.price ?? null,
        priority_comfort: parsed.priorities?.comfort ?? null,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('user_profiles')
        .upsert(payload, { onConflict: 'user_id' });

    if (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: 'DB_ERROR' },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}
