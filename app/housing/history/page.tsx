'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';

interface HousingSession {
    session_id: string;
    created_at: string;
    result: {
        summary?: {
            title?: string;
            description?: string;
        };
        budget?: {
            maxJeonse?: number;
        };
        recommendations?: Array<{
            area: string;
            score: number;
        }>;
    };
}

export default function HousingHistoryPage() {
    const router = useRouter();
    const [sessions, setSessions] = useState<HousingSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSessions = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(
                    `/api/housing/sessions?page=${page}&limit=10`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (res.ok) {
                    const result = await res.json();
                    setSessions(result.data || []);
                    setTotalPages(result.totalPages || 1);
                } else if (res.status === 401) {
                    router.push('/login');
                } else {
                    setError('데이터를 불러오는데 실패했습니다.');
                }
            } catch (e) {
                console.error('Failed to fetch history', e);
                setError('네트워크 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, [router, page]);

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-black mb-6">
                        📋 나의 진단 기록
                    </h1>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-10">로딩 중...</div>
                    ) : sessions.length === 0 ? (
                        <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                            <p className="text-grey-500 mb-6">
                                아직 진행한 주거 진단이 없습니다.
                            </p>
                            <Button
                                onClick={() => router.push('/housing/plan')}
                            >
                                새 진단 시작하기
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-4">
                                {sessions.map((session) => (
                                    <div
                                        key={session.session_id}
                                        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/housing/history/${session.session_id}`
                                            )
                                        }
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-primary-600">
                                                    {session.result.summary
                                                        ?.title ||
                                                        '주거 진단 결과'}
                                                </h3>
                                                <p className="text-grey-600 mt-1">
                                                    {session.result.summary
                                                        ?.description ||
                                                        '상세 내용을 확인하세요.'}
                                                </p>
                                            </div>
                                            <span className="text-sm text-grey-400">
                                                {new Date(
                                                    session.created_at
                                                ).toLocaleDateString('ko-KR')}
                                            </span>
                                        </div>
                                        {session.result.budget?.maxJeonse && (
                                            <div className="mt-4 pt-4 border-t border-grey-100 flex gap-4 text-sm text-grey-500">
                                                <span>
                                                    최대 전세금:{' '}
                                                    <b className="text-primary-600">
                                                        {session.result.budget.maxJeonse.toLocaleString()}
                                                    </b>{' '}
                                                    만원
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    <Button
                                        onClick={() =>
                                            setPage((p) => Math.max(1, p - 1))
                                        }
                                        disabled={page === 1}
                                        variant="outline"
                                    >
                                        이전
                                    </Button>
                                    <span className="px-4 py-2 text-sm text-grey-600">
                                        {page} / {totalPages}
                                    </span>
                                    <Button
                                        onClick={() =>
                                            setPage((p) =>
                                                Math.min(totalPages, p + 1)
                                            )
                                        }
                                        disabled={page === totalPages}
                                        variant="outline"
                                    >
                                        다음
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
