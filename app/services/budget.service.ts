export function calculateHousingBudget(income: number, savings: number) {
    const monthlyBudget = Math.round(income * 0.3);
    const depositBudget = Math.round(savings * 0.7);
    const canJeonse = depositBudget >= 50_000_000;

    return {
        monthlyBudget,
        depositBudget,
        canJeonse,
        monthlyRentOptions: [
            { deposit: 5_000_000, rent: monthlyBudget },
            { deposit: 10_000_000, rent: Math.round(monthlyBudget * 0.7) },
            { deposit: 20_000_000, rent: Math.round(monthlyBudget * 0.5) },
        ],
    };
}
