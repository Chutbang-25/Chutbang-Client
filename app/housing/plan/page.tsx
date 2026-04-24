'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';
import { Input } from '@/components/common/ui/Input';
import useKakaoLoader from '@/hooks/use-kakao-loader';

interface HousingPlanResult {
    summary: { title: string; description: string };
    recommendation: { type: string; reason: string };
    budget: {
        canJeonse: boolean;
        maxJeonse?: number;
        recommendedWolse?: number;
        monthlyBudget: number;
        depositBudget: number;
    };
    recommendedAreas: Array<{
        areaId: string;
        name: string;
        reason: string;
        avgDeposit: number;
        avgRent: number;
        estimatedCommuteMinutes: number;
    }>;
    publicHousingMatches: Array<{ id: string; name: string; type: string }>;
}

interface HousingPlanInput {
    income: number;
    savings: number;
    age: number;
    workLocation: {
        address: string;
        lat: number;
        lng: number;
    };
    commutePreference: {
        maxMinutes: number;
        transport: 'PUBLIC' | 'CAR' | 'MIXED';
    };
    livingStyle: {
        householdType: 'ALONE' | 'ROOMMATE';
        hasPet: boolean;
    };
    priorities: {
        safety: number;
        commute: number;
        price: number;
        comfort: number;
    };
    saveSession: boolean;
}

export default function HousingPlanPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<HousingPlanResult | null>(null);
    const [error, setError] = useState('');
    useKakaoLoader();

    const [formData, setFormData] = useState<HousingPlanInput>({
        income: 3000,
        savings: 1000,
        age: 25,
        workLocation: {
            address: '',
            lat: 0,
            lng: 0,
        },
        commutePreference: {
            maxMinutes: 40,
            transport: 'PUBLIC',
        },
        livingStyle: {
            householdType: 'ALONE',
            hasPet: false,
        },
        priorities: {
            safety: 5,
            commute: 5,
            price: 5,
            comfort: 5,
        },
        saveSession: true,
    });

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleAddressSearch = () => {
        if (typeof window === 'undefined') return;
        new (window as any).daum.Postcode({
            oncomplete: (data: any) => {
                const address = data.roadAddress || data.jibunAddress;
                const geocoder = new (window as any).kakao.maps.services.Geocoder();
                geocoder.addressSearch(address, (result: any[], status: string) => {
                    if (status === (window as any).kakao.maps.services.Status.OK) {
                        setFormData((prev) => ({
                            ...prev,
                            workLocation: {
                                address,
                                lat: parseFloat(result[0].y),
                                lng: parseFloat(result[0].x),
                            },
                        }));
                    }
                });
            },
        }).open();
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('/api/housing/plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (result.success) {
                setResult(result.data);
                setStep(4); // Move to Result Step
            } else {
                setError(result.error || '진단에 실패했습니다.');
            }
        } catch (e) {
            setError('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-grey-50">
            <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Progress Bar */}
                    <div className="w-full bg-grey-200 h-2 rounded-full mb-8">
                        <div
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-black mb-2">
                                    💰 예산 및 기본 정보
                                </h1>
                                <Input
                                    label="연 소득 (만원)"
                                    id="income"
                                    name="income"
                                    type="number"
                                    value={formData.income}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            income: Number(e.target.value),
                                        })
                                    }
                                    wfull
                                />
                                <Input
                                    label="보유 자금 (만원)"
                                    id="savings"
                                    name="savings"
                                    type="number"
                                    value={formData.savings}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            savings: Number(e.target.value),
                                        })
                                    }
                                    wfull
                                />
                                <Input
                                    label="나이"
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            age: Number(e.target.value),
                                        })
                                    }
                                    wfull
                                />
                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleNext}>다음</Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-black mb-2">
                                    🏢 직장에 대한 정보
                                </h1>
                                <div>
                                    <label className="block text-sm font-medium text-grey-700 mb-1">
                                        직장 주소
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            readOnly
                                            value={formData.workLocation.address}
                                            placeholder="주소 검색 버튼을 눌러주세요"
                                            className="flex-1 px-4 py-2 border border-grey-200 rounded-lg bg-grey-50 text-grey-800 focus:outline-none"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleAddressSearch}
                                        >
                                            주소 검색
                                        </Button>
                                    </div>
                                    {formData.workLocation.lat !== 0 && (
                                        <p className="text-xs text-grey-400 mt-1">
                                            좌표: {formData.workLocation.lat.toFixed(4)}, {formData.workLocation.lng.toFixed(4)}
                                        </p>
                                    )}
                                </div>
                                <Input
                                    label="최대 통근 시간 (분)"
                                    id="maxCommute"
                                    name="maxCommute"
                                    type="number"
                                    value={
                                        formData.commutePreference.maxMinutes
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            commutePreference: {
                                                ...formData.commutePreference,
                                                maxMinutes: Number(
                                                    e.target.value
                                                ),
                                            },
                                        })
                                    }
                                    wfull
                                />
                                <div className="flex justify-between pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={handlePrev}
                                    >
                                        이전
                                    </Button>
                                    <Button onClick={handleNext}>다음</Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-black mb-2">
                                    ⚖️ 우선순위 및 라이프스타일
                                </h1>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={
                                                formData.livingStyle.hasPet
                                            }
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    livingStyle: {
                                                        ...formData.livingStyle,
                                                        hasPet: e.target
                                                            .checked,
                                                    },
                                                })
                                            }
                                            className="w-5 h-5 text-primary-500 rounded"
                                        />
                                        <label className="text-lg">
                                            반려동물과 함께 거주
                                        </label>
                                    </div>
                                    <div className="space-y-3 pt-4">
                                        <p className="font-semibold">
                                            우선순위 (1-10)
                                        </p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                'safety',
                                                'commute',
                                                'price',
                                                'comfort',
                                            ].map((key) => (
                                                <div key={key}>
                                                    <label className="block text-sm text-grey-600 mb-1 capitalize">
                                                        {key}
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="10"
                                                        value={
                                                            formData.priorities[
                                                                key as keyof typeof formData.priorities
                                                            ]
                                                        }
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                priorities: {
                                                                    ...formData.priorities,
                                                                    [key]: Number(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                                },
                                                            })
                                                        }
                                                        className="w-full"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm py-2">
                                        {error}
                                    </p>
                                )}

                                <div className="flex justify-between pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={handlePrev}
                                    >
                                        이전
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading
                                            ? '분석 중...'
                                            : '진단 결과 보기'}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 4 && result && (
                            <div className="space-y-8 animate-fade-in-up">
                                <div className="text-center">
                                    <h1 className="text-3xl font-bold text-primary-600 mb-2">
                                        {result.summary.title}
                                    </h1>
                                    <p className="text-xl text-grey-700">
                                        {result.summary.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
                                        <h3 className="font-bold text-lg mb-4">
                                            💰 예산 분석
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>전세 가능 여부</span>
                                                <span
                                                    className={`font-bold ${result.budget.canJeonse ? 'text-blue-600' : 'text-red-500'}`}
                                                >
                                                    {result.budget.canJeonse
                                                        ? '가능'
                                                        : '어려움'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>최대 전세금</span>
                                                <span className="font-bold">
                                                    {result.budget?.maxJeonse?.toLocaleString() || '0'}{' '}
                                                    만원
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>추천 월세</span>
                                                <span className="font-bold">
                                                    {result.budget?.recommendedWolse?.toLocaleString() || '0'}{' '}
                                                    만원
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                        <h3 className="font-bold text-lg mb-4">
                                            📍 추천 지역
                                        </h3>
                                        <ul className="space-y-2 list-disc list-inside text-grey-800">
                                            {result.recommendedAreas.map(
                                                (area: any, idx: number) => (
                                                    <li key={idx}>
                                                        <span className="font-semibold">
                                                            {area.name}
                                                        </span>{' '}
                                                        ({area.reason})
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-grey-50 p-6 rounded-xl border border-grey-200">
                                    <h3 className="font-bold text-lg mb-4">
                                        🏘️ 공공임대 매칭 결과
                                    </h3>
                                    {result.publicHousingMatches.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-3">
                                            {result.publicHousingMatches.map(
                                                (house: any, idx: number) => (
                                                    <div
                                                        key={idx}
                                                        className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                                                    >
                                                        <div>
                                                            <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-1 rounded">
                                                                {house.type}
                                                            </span>
                                                            <h4 className="font-semibold mt-1">
                                                                {house.name}
                                                            </h4>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                router.push(
                                                                    `/public-housing/${house.id}`
                                                                )
                                                            }
                                                        >
                                                            상세보기
                                                        </Button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-grey-500">
                                            조건에 맞는 공공임대 공고가 현재
                                            없습니다.
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-center gap-4 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/')}
                                    >
                                        홈으로
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            router.push('/housing/history')
                                        }
                                    >
                                        기록 저장됨 (이력 보기)
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
