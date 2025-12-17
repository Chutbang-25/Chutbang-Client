'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';

interface PublicHousing {
    id: string;
    name: string;
    type: string;
    city: string;
    district: string;
    address: string;
    scale?: string;
    household_count?: number;
    application_start: string;
    application_end: string;
    move_in_date?: string;
    price_range?: string;
    qualification?: string;
    url?: string;
    contact?: string;
}

export default function PublicHousingDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [housing, setHousing] = useState<PublicHousing | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchHousingDetail();
        }
    }, [id]);

    const fetchHousingDetail = async () => {
        try {
            const res = await fetch(`/api/public-housing/${id}`);

            if (res.ok) {
                const result = await res.json();
                setHousing(result.data);
            } else {
                setError('공공임대 정보를 불러오는데 실패했습니다.');
            }
        } catch (e) {
            setError('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const isApplicationOpen = (start: string, end: string) => {
        const now = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);
        return now >= startDate && now <= endDate;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg text-grey-500">로딩 중...</div>
            </div>
        );
    }

    if (error || !housing) {
        return (
            <div className="min-h-screen bg-grey-50">
                <Header />
                <div className="pt-24 pb-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <p className="text-red-500 mb-6">
                                {error || '정보를 찾을 수 없습니다.'}
                            </p>
                            <Button onClick={() => router.back()}>
                                뒤로 가기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const applicationOpen = isApplicationOpen(
        housing.application_start,
        housing.application_end
    );

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        {/* 헤더 */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                {applicationOpen && (
                                    <span className="inline-block bg-primary-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                                        신청 가능
                                    </span>
                                )}
                                <span className="inline-block bg-grey-200 text-grey-700 text-sm font-medium px-4 py-2 rounded-full">
                                    {housing.type}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-black mb-2">
                                {housing.name}
                            </h1>
                            <p className="text-grey-600">
                                {housing.city} {housing.district}
                            </p>
                        </div>

                        {/* 기본 정보 */}
                        <div className="border-t border-grey-200 pt-6 mb-6">
                            <h2 className="text-xl font-semibold text-black mb-4">
                                기본 정보
                            </h2>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-grey-500 mb-1">
                                        주소
                                    </dt>
                                    <dd className="text-base text-grey-900">
                                        {housing.address}
                                    </dd>
                                </div>
                                {housing.scale && (
                                    <div>
                                        <dt className="text-sm font-medium text-grey-500 mb-1">
                                            규모
                                        </dt>
                                        <dd className="text-base text-grey-900">
                                            {housing.scale}
                                        </dd>
                                    </div>
                                )}
                                {housing.household_count && (
                                    <div>
                                        <dt className="text-sm font-medium text-grey-500 mb-1">
                                            세대수
                                        </dt>
                                        <dd className="text-base text-grey-900">
                                            {housing.household_count}세대
                                        </dd>
                                    </div>
                                )}
                                {housing.price_range && (
                                    <div>
                                        <dt className="text-sm font-medium text-grey-500 mb-1">
                                            가격대
                                        </dt>
                                        <dd className="text-base text-grey-900">
                                            {housing.price_range}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* 신청 정보 */}
                        <div className="border-t border-grey-200 pt-6 mb-6">
                            <h2 className="text-xl font-semibold text-black mb-4">
                                신청 정보
                            </h2>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-grey-500 mb-1">
                                        신청 시작일
                                    </dt>
                                    <dd className="text-base text-grey-900">
                                        {formatDate(housing.application_start)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-grey-500 mb-1">
                                        신청 마감일
                                    </dt>
                                    <dd className="text-base text-grey-900">
                                        {formatDate(housing.application_end)}
                                    </dd>
                                </div>
                                {housing.move_in_date && (
                                    <div>
                                        <dt className="text-sm font-medium text-grey-500 mb-1">
                                            입주 예정일
                                        </dt>
                                        <dd className="text-base text-grey-900">
                                            {formatDate(housing.move_in_date)}
                                        </dd>
                                    </div>
                                )}
                                {housing.contact && (
                                    <div>
                                        <dt className="text-sm font-medium text-grey-500 mb-1">
                                            문의처
                                        </dt>
                                        <dd className="text-base text-grey-900">
                                            {housing.contact}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* 자격 요건 */}
                        {housing.qualification && (
                            <div className="border-t border-grey-200 pt-6 mb-6">
                                <h2 className="text-xl font-semibold text-black mb-4">
                                    자격 요건
                                </h2>
                                <div className="bg-grey-50 rounded-lg p-4">
                                    <p className="text-grey-700 whitespace-pre-line">
                                        {housing.qualification}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 액션 버튼 */}
                        <div className="border-t border-grey-200 pt-6 flex gap-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.back()}
                            >
                                목록으로
                            </Button>
                            {housing.url && (
                                <Button
                                    className="flex-1"
                                    onClick={() =>
                                        window.open(housing.url, '_blank')
                                    }
                                >
                                    공식 사이트에서 신청하기
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
