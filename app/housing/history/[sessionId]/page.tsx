'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';

interface HousingSessionDetail {
    session_id: string;
    user_id: string;
    created_at: string;
    result: {
        summary?: {
            title?: string;
            description?: string;
        };
        budget?: {
            maxJeonse?: number;
            maxMonthly?: number;
            savingsAvailable?: number;
        };
        recommendations?: Array<{
            area: string;
            score: number;
            reason?: string;
        }>;
        housingMatches?: Array<{
            id: string;
            name: string;
            location: string;
            type: string;
        }>;
    };
}

export default function HousingHistoryDetailPage() {
    const router = useRouter();
    const params = useParams();
    const sessionId = params.sessionId as string;

    const [session, setSession] = useState<HousingSessionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSessionDetail = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/housing/sessions/${sessionId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const result = await res.json();
                    setSession(result.data);
                } else if (res.status === 401) {
                    router.push('/login');
                } else if (res.status === 404) {
                    setError('해당 진단 기록을 찾을 수 없습니다.');
                } else {
                    setError('데이터를 불러오는데 실패했습니다.');
                }
            } catch (e) {
                console.error('Failed to fetch session detail', e);
                setError('네트워크 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (sessionId) {
            fetchSessionDetail();
        }
    }, [router, sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-grey-50">
                <Header />
                <div className="pt-24 pb-16 px-4">
                    <div className="max-w-4xl mx-auto text-center py-10">
                        로딩 중...
                    </div>
                </div>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="min-h-screen bg-grey-50">
                <Header />
                <div className="pt-24 pb-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                            {error || '데이터를 찾을 수 없습니다.'}
                        </div>
                        <Button onClick={() => router.push('/housing/history')}>
                            목록으로 돌아가기
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Button
                            variant="outline"
                            onClick={() => router.push('/housing/history')}
                        >
                            ← 목록으로
                        </Button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-primary-600">
                                    {session.result.summary?.title ||
                                        '주거 진단 결과'}
                                </h1>
                                <p className="text-grey-600 mt-2">
                                    {session.result.summary?.description ||
                                        '상세 진단 결과입니다.'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-grey-400">
                                    진단 일시
                                </p>
                                <p className="text-sm font-medium">
                                    {new Date(
                                        session.created_at
                                    ).toLocaleString('ko-KR')}
                                </p>
                            </div>
                        </div>

                        {session.result.budget && (
                            <div className="border-t border-grey-100 pt-6">
                                <h2 className="text-xl font-bold text-black mb-4">
                                    💰 예산 정보
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {session.result.budget.maxJeonse && (
                                        <div className="bg-primary-50 p-4 rounded-lg">
                                            <p className="text-sm text-grey-600 mb-1">
                                                최대 전세금
                                            </p>
                                            <p className="text-2xl font-bold text-primary-600">
                                                {session.result.budget.maxJeonse.toLocaleString()}
                                                <span className="text-sm ml-1">
                                                    만원
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                    {session.result.budget.maxMonthly && (
                                        <div className="bg-primary-50 p-4 rounded-lg">
                                            <p className="text-sm text-grey-600 mb-1">
                                                최대 월세
                                            </p>
                                            <p className="text-2xl font-bold text-primary-600">
                                                {session.result.budget.maxMonthly.toLocaleString()}
                                                <span className="text-sm ml-1">
                                                    만원
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                    {session.result.budget.savingsAvailable && (
                                        <div className="bg-primary-50 p-4 rounded-lg">
                                            <p className="text-sm text-grey-600 mb-1">
                                                사용 가능 자금
                                            </p>
                                            <p className="text-2xl font-bold text-primary-600">
                                                {session.result.budget.savingsAvailable.toLocaleString()}
                                                <span className="text-sm ml-1">
                                                    만원
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {session.result.recommendations &&
                            session.result.recommendations.length > 0 && (
                                <div className="border-t border-grey-100 pt-6 mt-6">
                                    <h2 className="text-xl font-bold text-black mb-4">
                                        🏘️ 추천 지역
                                    </h2>
                                    <div className="grid gap-3">
                                        {session.result.recommendations.map(
                                            (rec, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-grey-50 p-4 rounded-lg"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="font-bold text-black">
                                                                {rec.area}
                                                            </h3>
                                                            {rec.reason && (
                                                                <p className="text-sm text-grey-600 mt-1">
                                                                    {rec.reason}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-grey-500">
                                                                점수
                                                            </p>
                                                            <p className="text-xl font-bold text-primary-600">
                                                                {rec.score}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                        {session.result.housingMatches &&
                            session.result.housingMatches.length > 0 && (
                                <div className="border-t border-grey-100 pt-6 mt-6">
                                    <h2 className="text-xl font-bold text-black mb-4">
                                        🏠 매칭된 공공임대
                                    </h2>
                                    <div className="grid gap-3">
                                        {session.result.housingMatches.map(
                                            (match) => (
                                                <div
                                                    key={match.id}
                                                    className="bg-grey-50 p-4 rounded-lg hover:bg-grey-100 transition-colors cursor-pointer"
                                                    onClick={() =>
                                                        router.push(
                                                            `/public-housing/${match.id}`
                                                        )
                                                    }
                                                >
                                                    <h3 className="font-bold text-black">
                                                        {match.name}
                                                    </h3>
                                                    <p className="text-sm text-grey-600 mt-1">
                                                        {match.location} ·{' '}
                                                        {match.type}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={() => router.push('/housing/plan')}
                            className="flex-1"
                        >
                            새로운 진단 시작하기
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/public-housing')}
                            className="flex-1"
                        >
                            공공임대 둘러보기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
