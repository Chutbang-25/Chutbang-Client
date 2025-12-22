import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';

import { calculateHousingBudget } from '@/app/services/budget.service';
import { recommendAreas } from '@/app/services/recommendArea.service';
import { matchPublicHousing } from '@/app/services/publicHousing.service';

// -------------------- ZOD INPUT SCHEMA --------------------
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

// -------------------- ROUTE HANDLER --------------------
export async function POST(req: NextRequest) {
    const body = await req.json();

    // (1) Validate input
    let input;
    try {
        input = housingPlanSchema.parse(body);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'INVALID_INPUT', details: error },
            { status: 400 }
        );
    }

    // (2) Optional Auth
    const { user, supabase } = await requireUser(req);

    // (3) Execute business logic
    const budget = calculateHousingBudget(input.income, input.savings);

    const areas = recommendAreas(
        input.workLocation.lat,
        input.workLocation.lng
    );

    let publicHousing = [];
    try {
        publicHousing = await matchPublicHousing({
            income: input.income,
            age: input.age,
            workLocation: input.workLocation,
        });
    } catch (error) {
        console.error('[Housing Plan] 공공임대 매칭 실패:', error);
        // 에러가 발생해도 계속 진행 (빈 배열 사용)
    }

    // (4) Build result response
    const result = {
        summary: {
            title: budget.canJeonse ? '전세 가능' : '월세 추천',
            description: budget.canJeonse
                ? '예산 기준 전세 옵션도 고려할 수 있습니다.'
                : '월세 기반으로 검색하는 것이 적합합니다.',
        },
        recommendation: {
            type: budget.canJeonse ? 'JEONSE' : 'WOLSE',
            reason: '예산, 생활 패턴, 출퇴근 기반 분석',
        },
        budget,
        recommendedAreas: areas,
        publicHousingMatches: publicHousing,
        nextActions: ['추천 지역 매물 보기', '계약 체크리스트 확인 🔍'],
    };

    // (5) Save session (optional)
    let sessionId = null;

    if (user && input.saveSession) {
        console.log('[Housing Plan] 세션 저장 시도 - user_id:', user.id);
        const { data, error } = await supabase
            .from('housing_sessions')
            .insert({
                user_id: user.id,
                input_data: input,
                result,
            })
            .select('session_id')
            .single();

        if (error) {
            console.error('[Housing Plan] 세션 저장 실패:', error);
        } else {
            sessionId = data.session_id;
            console.log('[Housing Plan] 세션 저장 성공 - session_id:', sessionId);
        }
    } else {
        console.log('[Housing Plan] 세션 저장 건너뜀 - user:', !!user, 'saveSession:', input.saveSession);
    }

    return NextResponse.json({
        success: true,
        data: {
            sessionId,
            ...result,
        },
    });
}
