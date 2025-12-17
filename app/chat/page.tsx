'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 인사말 추가
        setMessages([
            {
                role: 'assistant',
                content:
                    '안녕하세요! 주거 전문 상담사입니다. 궁금하신 점이 있으시면 편하게 물어보세요.',
            },
        ]);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setError('');

        // 사용자 메시지 추가
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch('/api/chat/claude', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    sessionId: sessionId,
                    message: userMessage,
                }),
            });

            const result = await res.json();

            if (result.success) {
                // 세션 ID 저장
                if (!sessionId && result.data.sessionId) {
                    setSessionId(result.data.sessionId);
                }

                // 어시스턴트 메시지 추가
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: result.data.message },
                ]);
            } else {
                setError(result.error || '메시지 전송에 실패했습니다.');
            }
        } catch (e) {
            setError('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-grey-50 flex flex-col">
            <Header />
            <div className="flex-1 pt-24 pb-4 px-4 flex flex-col">
                <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
                    {/* 헤더 */}
                    <div className="bg-white rounded-t-lg shadow-sm p-6 border-b border-grey-200">
                        <h1 className="text-2xl font-bold text-black mb-1">
                            주거 상담 챗봇
                        </h1>
                        <p className="text-grey-500 text-sm">
                            AI 상담사가 주거 관련 질문에 답변해드립니다
                        </p>
                    </div>

                    {/* 메시지 영역 */}
                    <div className="flex-1 bg-white overflow-y-auto p-6 space-y-4 min-h-[500px] max-h-[600px]">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.role === 'user'
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                                        message.role === 'user'
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-grey-100 text-grey-900'
                                    }`}
                                >
                                    <p className="whitespace-pre-line text-sm">
                                        {message.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-grey-100 rounded-lg px-4 py-3">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-grey-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-grey-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-grey-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 입력 영역 */}
                    <div className="bg-white rounded-b-lg shadow-sm p-4 border-t border-grey-200">
                        {error && (
                            <div className="text-red-500 text-sm mb-2 bg-red-50 p-2 rounded">
                                {error}
                            </div>
                        )}
                        <div className="flex gap-2">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="메시지를 입력하세요... (Shift + Enter로 줄바꿈)"
                                className="flex-1 px-4 py-3 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                rows={2}
                                disabled={loading}
                            />
                            <Button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="px-6 self-end"
                            >
                                전송
                            </Button>
                        </div>
                        <p className="text-xs text-grey-400 mt-2">
                            AI가 생성한 답변은 참고용이며, 실제 상담이 필요한
                            경우 전문가와 상담하시기 바랍니다.
                        </p>
                    </div>

                    {/* 빠른 질문 버튼 */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                            '월세와 전세 차이가 뭔가요?',
                            '행복주택 자격 요건은?',
                            '계약할 때 주의할 점은?',
                            '보증금은 얼마가 적당한가요?',
                        ].map((question, index) => (
                            <button
                                key={index}
                                onClick={() => setInput(question)}
                                className="text-xs text-primary-500 border border-primary-500 rounded-lg px-3 py-2 hover:bg-primary-50 transition-colors"
                                disabled={loading}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
