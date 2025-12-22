'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';

interface ChatSession {
    sessionId: string;
    messages: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>;
    createdAt: string;
    updatedAt: string;
}

export default function ChatHistoryPage() {
    const router = useRouter();
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const res = await fetch('/api/chat/sessions?page=1&limit=20', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const result = await res.json();
                setSessions(result.data || []);
            } else if (res.status === 401) {
                router.push('/login');
            } else {
                setError('데이터를 불러오는데 실패했습니다.');
            }
        } catch (e) {
            console.error('Failed to fetch chat history', e);
            setError('네트워크 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const getFirstUserMessage = (session: ChatSession) => {
        const firstUserMsg = session.messages.find((m) => m.role === 'user');
        return (
            firstUserMsg?.content.substring(0, 50) +
                (firstUserMsg && firstUserMsg.content.length > 50
                    ? '...'
                    : '') || '대화 없음'
        );
    };

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-black">
                            💬 채팅 이력
                        </h1>
                        <Button onClick={() => router.push('/chat')}>
                            새 채팅 시작
                        </Button>
                    </div>

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
                                아직 채팅 이력이 없습니다.
                            </p>
                            <Button onClick={() => router.push('/chat')}>
                                첫 채팅 시작하기
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {sessions.map((session) => (
                                <div
                                    key={session.sessionId}
                                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() =>
                                        router.push(
                                            `/chat?sessionId=${session.sessionId}`
                                        )
                                    }
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-primary-600">
                                                {getFirstUserMessage(session)}
                                            </h3>
                                            <p className="text-grey-600 text-sm mt-1">
                                                메시지 {session.messages.length}개
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-grey-400">
                                                {new Date(
                                                    session.updatedAt
                                                ).toLocaleDateString('ko-KR')}
                                            </p>
                                            <p className="text-xs text-grey-400">
                                                {new Date(
                                                    session.updatedAt
                                                ).toLocaleTimeString('ko-KR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
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
