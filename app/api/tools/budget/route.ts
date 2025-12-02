import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const budgetSchema = z.object({
    income: z.number().int().positive(),
    savings: z.number().int().nonnegative(),
});

// 기획서에 있던 로직
function calculateHousingBudget(income: number, savings: number) {
    const monthlyBudget = income * 0.3;
    const depositBudget = savings * 0.7;
    const canJeonse = depositBudget > 50_000_000;
    const monthlyRentOptions = [
        { deposit: 5_000_000, rent: monthlyBudget },
        { deposit: 10_000_000, rent: monthlyBudget * 0.7 },
        { deposit: 20_000_000, rent: monthlyBudget * 0.5 },
    ];
    return { canJeonse, monthlyBudget, depositBudget, monthlyRentOptions };
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { income, savings } = budgetSchema.parse(body);
    const result = calculateHousingBudget(income, savings);
    return NextResponse.json({ success: true, data: result });
}
