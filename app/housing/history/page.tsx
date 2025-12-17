'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';

interface HousingSession {
    session_id: string;
    created_at: string;
    result: {
        summary: {
            title: string;
            description: string;
        };
        budget: {
            maxJeonse: number;
        };
    };
}

export default function HousingHistoryPage() {
    const router = useRouter();
    const [sessions, setSessions] = useState<HousingSession[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }
            try {
                // Mocking Response for development since API might need real DB data
                // In production, fetch from /api/housing/sessions
                const res = await fetch('/api/housing/sessions', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const result = await res.json();
                    setSessions(result.data || []);
                }
            } catch (e) {
                console.error('Failed to fetch history');
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, [router]);

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-black mb-6">
                        📋 나의 진단 기록
                    </h1>

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
                        <div className="grid gap-4">
                            {sessions.map((session) => (
                                <div
                                    key={session.session_id}
                                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() =>
                                        router.push(
                                            `/housing/plan?sessionId=${session.session_id}`
                                        )
                                    }
                                >
                                    {' '}
                                    {/* Reusing plan page or detail page */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-primary-600">
                                                {session.result.summary.title}
                                            </h3>
                                            <p className="text-grey-600 mt-1">
                                                {
                                                    session.result.summary
                                                        .description
                                                }
                                            </p>
                                        </div>
                                        <span className="text-sm text-grey-400">
                                            {new Date(
                                                session.created_at
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-grey-100 flex gap-4 text-sm text-grey-500">
                                        <span>
                                            최대 전세금:{' '}
                                            <b>
                                                {session.result.budget.maxJeonse.toLocaleString()}
                                            </b>{' '}
                                            만원
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
