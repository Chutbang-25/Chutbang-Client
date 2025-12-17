'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';

interface ChecklistItem {
    id: string;
    stage: string;
    order: number;
    title: string;
    description: string;
    is_critical: boolean;
}

const stages = [
    { value: 'PRE_CONTRACT', label: '계약 전' },
    { value: 'CONTRACT', label: '계약 시' },
    { value: 'POST_CONTRACT', label: '계약 후' },
];

export default function GuidesPage() {
    const [checklists, setChecklists] = useState<ChecklistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedStage, setSelectedStage] = useState<string>('');

    useEffect(() => {
        fetchChecklists();
    }, [selectedStage]);

    const fetchChecklists = async () => {
        setLoading(true);
        try {
            const params = selectedStage
                ? `?stage=${selectedStage}`
                : '';
            const res = await fetch(`/api/guides/contracts${params}`);

            if (res.ok) {
                const result = await res.json();
                setChecklists(result.data || []);
            } else {
                setError('체크리스트를 불러오는데 실패했습니다.');
            }
        } catch (e) {
            setError('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const groupedChecklists = checklists.reduce((acc, item) => {
        if (!acc[item.stage]) {
            acc[item.stage] = [];
        }
        acc[item.stage].push(item);
        return acc;
    }, {} as Record<string, ChecklistItem[]>);

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* 헤더 */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">
                            계약 가이드
                        </h1>
                        <p className="text-grey-500">
                            처음 계약하는 분들을 위한 단계별 체크리스트입니다
                        </p>
                    </div>

                    {/* 필터 */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedStage('')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    selectedStage === ''
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                                }`}
                            >
                                전체
                            </button>
                            {stages.map((stage) => (
                                <button
                                    key={stage.value}
                                    onClick={() => setSelectedStage(stage.value)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        selectedStage === stage.value
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                                    }`}
                                >
                                    {stage.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="text-lg text-grey-500">
                                로딩 중...
                            </div>
                        </div>
                    ) : checklists.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <p className="text-grey-500">
                                체크리스트가 없습니다.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {Object.entries(groupedChecklists).map(
                                ([stage, items]) => (
                                    <div key={stage} className="bg-white rounded-lg shadow-sm p-6">
                                        <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-grey-200">
                                            {stages.find((s) => s.value === stage)
                                                ?.label || stage}
                                        </h2>
                                        <div className="space-y-3">
                                            {items
                                                .sort((a, b) => a.order - b.order)
                                                .map((item, index) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-grey-50 transition-colors"
                                                    >
                                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-700 rounded-full font-semibold">
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="font-semibold text-grey-900">
                                                                    {item.title}
                                                                </h3>
                                                                {item.is_critical && (
                                                                    <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                                        필수
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-grey-600 text-sm whitespace-pre-line">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}

                    {/* 추가 안내 */}
                    <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-primary-900 mb-2">
                            💡 계약 시 주의사항
                        </h3>
                        <ul className="space-y-2 text-sm text-primary-800">
                            <li>
                                • 계약서는 반드시 꼼꼼히 읽고 이해한 후
                                서명하세요
                            </li>
                            <li>
                                • 등기부등본은 계약 당일에 다시 확인하는 것이
                                안전합니다
                            </li>
                            <li>
                                • 보증금은 가능한 한 은행 송금으로 하고
                                영수증을 보관하세요
                            </li>
                            <li>
                                • 궁금한 점은 계약 전에 모두 해결하고
                                진행하세요
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
