import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { createUserClient } from '@/lib/supabaseServer';

// -------------------- Zod Schema --------------------
const housingPlanSchema = z.object({
    income: z.number().positive(),
    savings: z.number().nonnegative(),
    age: z.number().optional(),
    workLocation: z.object({
        address: z.string(),
        lat: z.number(),
        lng: z.number(),
    }),
    commutePreference: z.object({
        maxMinutes: z.number(),
        transport: z.enum(['PUBLIC', 'CAR', 'MIXED']),
    }),
    livingStyle: z.object({
        householdType: z.enum(['ALONE', 'ROOMMATE']),
        hasPet: z.boolean(),
    }),
    priorities: z.object({
        safety: z.number(),
        commute: z.number(),
        price: z.number(),
        comfort: z.number(),
    }),
    saveSession: z.boolean().optional(),
});

// -------------------- Business Logic --------------------
function calculateBudget(income: number, savings: number) {
    const monthlyBudget = Math.round(income * 0.3);
    const depositBudget = Math.round(savings * 0.7);
    const canJeonse = depositBudget >= 50_000_000;

    return {
        monthlyBudget,
        depositBudget,
        canJeonse,
        monthlyRentOptions: [
            { deposit: 5000000, rent: monthlyBudget },
            { deposit: 10000000, rent: Math.round(monthlyBudget * 0.7) },
            { deposit: 20000000, rent: Math.round(monthlyBudget * 0.5) },
        ],
    };
}

// Mock 지역 추천 (MVP)
function recommendAreas(workLat: number, workLng: number) {
    return [
        {
            areaId: 'seoul-gwanak',
            name: '서울 관악구',
            city: '서울',
            district: '관악구',
            avgDeposit: 8000000,
            avgRent: 550000,
            estimatedCommuteMinutes: 35,
            commuteScore: 88,
        },
        {
            areaId: 'seoul-dongjak',
            name: '서울 동작구',
            city: '서울',
            district: '동작구',
            avgDeposit: 10000000,
            avgRent: 600000,
            estimatedCommuteMinutes: 30,
            commuteScore: 92,
        },
    ];
}

// Mock 공공임대 추천
function matchPublicHousing() {
    return [
        {
            id: 'ph_01',
            type: '행복주택',
            name: '관악구 대학생 행복주택',
            location: '서울 관악구',
            incomeLimit: 3600000,
            ageLimit: 39,
            applicationStart: '2025-11-01',
            applicationEnd: '2025-11-25',
            officialLink: 'https://apply.lh.or.kr/',
            distanceMinutes: 30,
        },
    ];
}

// -------------------- ROUTE --------------------
export async function POST(req: NextRequest) {
    const body = await req.json();

    // 1) 입력 검증
    let input;
    try {
        input = housingPlanSchema.parse(body);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'INVALID_INPUT', details: error },
            { status: 400 }
        );
    }

    // 2) 인증 여부 확인 (옵션)
    const { user, supabase } = await requireUser(req);

    // 3) 알고리즘 실행
    const budget = calculateBudget(input.income, input.savings);
    const areas = recommendAreas(
        input.workLocation.lat,
        input.workLocation.lng
    );
    const publicHousing = matchPublicHousing();

    const result = {
        summary: {
            title: budget.canJeonse ? '전세도 고려 가능' : '월세 추천',
            description: budget.canJeonse
                ? '현재 예산 기준 전세도 가능한 수준입니다.'
                : '월세 중심으로 탐색하는 것이 안전합니다.',
        },
        recommendation: {
            type: budget.canJeonse ? 'JEONSE' : 'WOLSE',
            score: 80,
            reason: '예산/출퇴근 거리/라이프스타일 기반',
        },
        budget,
        recommendedAreas: areas,
        publicHousingMatches: publicHousing,
        nextActions: ['지역 매물 보기', '계약 체크리스트 확인'],
    };

    // 4) 요청자가 로그인 상태이고 saveSession === true -> DB 저장
    let sessionId = null;

    if (user && input.saveSession) {
        const { data, error } = await supabase
            .from('housing_sessions')
            .insert({
                user_id: user.id,
                raw_input: input,
                result,
            })
            .select('session_id')
            .single();

        if (!error) {
            sessionId = data.session_id;
        }
    }

    return NextResponse.json({
        success: true,
        data: {
            sessionId,
            ...result,
        },
    });
}
