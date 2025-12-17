'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';

import { Input } from '@/components/common/ui/Input';

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

export default function PublicHousingPage() {
    const router = useRouter();
    const [housings, setHousings] = useState<PublicHousing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 필터
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [onlyOpen, setOnlyOpen] = useState(true);

    useEffect(() => {
        fetchHousings();
    }, [city, district, onlyOpen]);

    const fetchHousings = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (city) params.append('city', city);
            if (district) params.append('district', district);
            if (onlyOpen) params.append('open', 'true');

            const res = await fetch(`/api/public-housing?${params.toString()}`);

            if (res.ok) {
                const result = await res.json();
                setHousings(result.data || []);
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
        return new Date(dateString).toLocaleDateString('ko-KR');
    };

    const isApplicationOpen = (start: string, end: string) => {
        const now = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);
        return now >= startDate && now <= endDate;
    };

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">
                            공공임대 주택
                        </h1>
                        <p className="text-grey-500">
                            행복주택, 청년주택 등 공공임대 정보를 한눈에
                            확인하세요
                        </p>
                    </div>

                    {/* 필터 */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold text-black mb-4">
                            검색 필터
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                label="도시"
                                id="city"
                                name="city"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="서울"
                                wfull
                            />
                            <Input
                                label="구/군"
                                id="district"
                                name="district"
                                type="text"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                placeholder="강남구"
                                wfull
                            />
                            <div className="flex items-end">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={onlyOpen}
                                        onChange={(e) =>
                                            setOnlyOpen(e.target.checked)
                                        }
                                        className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500 mr-2"
                                    />
                                    <span className="text-sm text-grey-700">
                                        신청 가능한 것만 보기
                                    </span>
                                </label>
                            </div>
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
                    ) : housings.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <p className="text-grey-500">
                                검색 결과가 없습니다.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {housings.map((housing) => (
                                <div
                                    key={housing.id}
                                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() =>
                                        router.push(
                                            `/public-housing/${housing.id}`
                                        )
                                    }
                                >
                                    {isApplicationOpen(
                                        housing.application_start,
                                        housing.application_end
                                    ) && (
                                        <span className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                                            신청 가능
                                        </span>
                                    )}
                                    <h3 className="text-lg font-semibold text-black mb-2 line-clamp-1">
                                        {housing.name}
                                    </h3>
                                    <div className="space-y-2 text-sm text-grey-600 mb-4">
                                        <p>
                                            <span className="font-medium">
                                                유형:
                                            </span>{' '}
                                            {housing.type}
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                위치:
                                            </span>{' '}
                                            {housing.city} {housing.district}
                                        </p>
                                        <p className="line-clamp-1">
                                            <span className="font-medium">
                                                주소:
                                            </span>{' '}
                                            {housing.address}
                                        </p>
                                        {housing.price_range && (
                                            <p>
                                                <span className="font-medium">
                                                    가격:
                                                </span>{' '}
                                                {housing.price_range}
                                            </p>
                                        )}
                                        <p>
                                            <span className="font-medium">
                                                신청 기간:
                                            </span>{' '}
                                            {formatDate(
                                                housing.application_start
                                            )}{' '}
                                            ~{' '}
                                            {formatDate(
                                                housing.application_end
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <span className="text-primary-500 text-sm font-medium hover:underline">
                                            자세히 보기 →
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <p className="text-sm text-grey-500">
                            총 {housings.length}개의 공공임대 주택이 있습니다
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
