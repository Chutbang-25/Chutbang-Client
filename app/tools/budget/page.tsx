'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';
import { Input } from '@/components/common/ui/Input';

interface BudgetResult {
    maxJeonse: number;
    maxMonthlyRent: number;
}

export default function BudgetTooolPage() {
    const [income, setIncome] = useState<number>(3000);
    const [savings, setSavings] = useState<number>(1000);
    const [result, setResult] = useState<BudgetResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/tools/budget', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ income, savings }),
            });

            if (res.ok) {
                const resultData = await res.json();
                if (resultData.success) {
                    setResult({
                        maxJeonse: resultData.data.depositBudget,
                        maxMonthlyRent: resultData.data.monthlyBudget,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-2xl font-bold text-black mb-6">
                        🧮 예산 계산기
                    </h1>

                    <div className="space-y-6">
                        <Input
                            label="연 소득 (만원)"
                            id="income"
                            name="income"
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            wfull
                        />
                        <Input
                            label="보유 자금 (만원)"
                            id="savings"
                            name="savings"
                            type="number"
                            value={savings}
                            onChange={(e) => setSavings(Number(e.target.value))}
                            wfull
                        />

                        <Button
                            onClick={handleCalculate}
                            className="w-full h-12"
                            disabled={loading}
                        >
                            {loading ? '계산 중...' : '계산하기'}
                        </Button>
                    </div>

                    {result && (
                        <div className="mt-8 pt-8 border-t border-grey-100 animate-fade-in">
                            <h3 className="text-lg font-semibold mb-4">
                                계산 결과
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-primary-50 p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-primary-700">
                                        최대 전세 보증금
                                    </span>
                                    <span className="text-xl font-bold text-primary-600">
                                        {result.maxJeonse.toLocaleString()} 만원
                                    </span>
                                </div>
                                <div className="bg-grey-50 p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-grey-700">
                                        권장 월세 상한
                                    </span>
                                    <span className="text-xl font-bold text-grey-900">
                                        {result.maxMonthlyRent.toLocaleString()}{' '}
                                        만원
                                    </span>
                                </div>
                                <p className="text-xs text-grey-400 text-right">
                                    * DSR 규제 등에 따라 실제 대출 한도는 달라질
                                    수 있습니다.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
