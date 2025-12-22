export function calculateHousingBudget(income: number, savings: number) {
    const monthlyBudget = Math.round(income * 0.3);
    const depositBudget = Math.round(savings * 0.7);
    const canJeonse = depositBudget >= 5000; // 5000만원 (단위: 만원)

    // 최대 전세금: 보증금 예산
    const maxJeonse = depositBudget;

    // 추천 월세: 월 예산
    const recommendedWolse = monthlyBudget;

    return {
        monthlyBudget,
        depositBudget,
        canJeonse,
        maxJeonse,
        recommendedWolse,
        monthlyRentOptions: [
            { deposit: 500, rent: monthlyBudget }, // 500만원
            { deposit: 1000, rent: Math.round(monthlyBudget * 0.7) }, // 1000만원
            { deposit: 2000, rent: Math.round(monthlyBudget * 0.5) }, // 2000만원
        ],
    };
}
