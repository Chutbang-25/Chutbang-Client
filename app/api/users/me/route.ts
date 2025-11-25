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

export async function GET(req: NextRequest) {
    const { user, supabase, res } = await requireUser(req);
    if (!user) return res!;

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

export async function PUT(req: NextRequest) {
    const { user, supabase, res } = await requireUser(req);
    if (!user) return res!;

    const body = await req.json();
    const parsed = profileSchema.parse(body);

    const { error } = await supabase.from('user_profiles').upsert(
        {
            user_id: user.id,
            age: parsed.age,
            income: parsed.income,
            savings: parsed.savings,
            work_address: parsed.workLocation?.address,
            work_lat: parsed.workLocation?.lat,
            work_lng: parsed.workLocation?.lng,
            commute_max_minutes: parsed.commutePreference?.maxMinutes,
            commute_transport: parsed.commutePreference?.transport,
            household_type: parsed.livingStyle?.householdType,
            has_pet: parsed.livingStyle?.hasPet,
            priority_safety: parsed.priorities?.safety,
            priority_commute: parsed.priorities?.commute,
            priority_price: parsed.priorities?.price,
            priority_comfort: parsed.priorities?.comfort,
            updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
    );

    if (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: 'DB_ERROR' },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}
