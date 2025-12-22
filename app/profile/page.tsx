'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/common/ui/Input';
import { Button } from '@/components/common/ui/Button';
import { Header } from '@/components/layout/Header';

interface ProfileData {
    age?: number;
    income: number;
    savings: number;
    workLocation?: {
        address: string;
        lat: number;
        lng: number;
    };
    commutePreference?: {
        maxMinutes: number;
        transport: 'PUBLIC' | 'CAR' | 'MIXED';
    };
    livingStyle?: {
        householdType: 'ALONE' | 'ROOMMATE';
        hasPet: boolean;
    };
    priorities?: {
        safety: number;
        commute: number;
        price: number;
        comfort: number;
    };
}

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState<ProfileData>({
        age: undefined,
        income: 0,
        savings: 0,
        workLocation: undefined,
        commutePreference: {
            maxMinutes: 30,
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
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch('/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const result = await res.json();
                if (result.data) {
                    // API 응답을 폼 데이터 형식으로 변환
                    setFormData({
                        age: result.data.age,
                        income: result.data.income || 0,
                        savings: result.data.savings || 0,
                        workLocation: result.data.work_address
                            ? {
                                  address: result.data.work_address,
                                  lat: result.data.work_lat,
                                  lng: result.data.work_lng,
                              }
                            : undefined,
                        commutePreference: {
                            maxMinutes: result.data.commute_max_minutes || 30,
                            transport:
                                result.data.commute_transport || 'PUBLIC',
                        },
                        livingStyle: {
                            householdType:
                                result.data.household_type || 'ALONE',
                            hasPet: result.data.has_pet || false,
                        },
                        priorities: {
                            safety: result.data.priority_safety || 5,
                            commute: result.data.priority_commute || 5,
                            price: result.data.priority_price || 5,
                            comfort: result.data.priority_comfort || 5,
                        },
                    });
                }
            }
        } catch (e) {
            console.error('Failed to fetch profile:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch('/api/users/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (result.success) {
                setSuccess('프로필이 저장되었습니다!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(result.error || '저장에 실패했습니다.');
            }
        } catch (e) {
            setError('프로필 저장 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg text-grey-500">로딩 중...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h1 className="text-3xl font-bold text-black mb-2">
                            내 프로필
                        </h1>
                        <p className="text-grey-500 mb-8">
                            정확한 정보를 입력하면 더 나은 주거 추천을 받을 수
                            있어요
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* 기본 정보 */}
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-4">
                                    기본 정보
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="나이"
                                        id="age"
                                        name="age"
                                        type="number"
                                        value={formData.age || ''}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                age: e.target.value
                                                    ? parseInt(e.target.value)
                                                    : undefined,
                                            })
                                        }
                                        placeholder="25"
                                        wfull
                                    />
                                    <Input
                                        label="연 소득 (만원)"
                                        id="income"
                                        name="income"
                                        type="number"
                                        required
                                        value={formData.income || ''}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                income:
                                                    parseInt(e.target.value) || 0,
                                            })
                                        }
                                        placeholder="3000"
                                        wfull
                                    />
                                    <Input
                                        label="저축액 (만원)"
                                        id="savings"
                                        name="savings"
                                        type="number"
                                        required
                                        value={formData.savings || ''}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                savings:
                                                    parseInt(e.target.value) || 0,
                                            })
                                        }
                                        placeholder="1000"
                                        wfull
                                    />
                                </div>
                            </div>

                            {/* 근무지 정보 */}
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-4">
                                    근무지 정보
                                </h2>
                                <Input
                                    label="근무지 주소"
                                    id="workAddress"
                                    name="workAddress"
                                    type="text"
                                    value={formData.workLocation?.address || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            workLocation: {
                                                address: e.target.value,
                                                lat: formData.workLocation?.lat,
                                                lng: formData.workLocation?.lng,
                                            },
                                        })
                                    }
                                    placeholder="서울시 강남구 테헤란로"
                                    wfull
                                />
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <Input
                                        label="최대 통근 시간 (분)"
                                        id="maxCommute"
                                        name="maxCommute"
                                        type="number"
                                        value={
                                            formData.commutePreference
                                                ?.maxMinutes || 30
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                commutePreference: {
                                                    ...formData.commutePreference!,
                                                    maxMinutes:
                                                        parseInt(e.target.value) ||
                                                        30,
                                                },
                                            })
                                        }
                                        wfull
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-grey-700 mb-2">
                                            교통수단
                                        </label>
                                        <select
                                            value={
                                                formData.commutePreference
                                                    ?.transport || 'PUBLIC'
                                            }
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    commutePreference: {
                                                        ...formData.commutePreference!,
                                                        transport: e.target
                                                            .value as
                                                            | 'PUBLIC'
                                                            | 'CAR'
                                                            | 'MIXED',
                                                    },
                                                })
                                            }
                                            className="w-full h-12 px-4 rounded-lg border border-grey-200 focus:border-primary-500 focus:ring-primary-500"
                                        >
                                            <option value="PUBLIC">
                                                대중교통
                                            </option>
                                            <option value="CAR">자차</option>
                                            <option value="MIXED">혼합</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* 라이프스타일 */}
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-4">
                                    라이프스타일
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-grey-700 mb-2">
                                            거주 형태
                                        </label>
                                        <select
                                            value={
                                                formData.livingStyle
                                                    ?.householdType || 'ALONE'
                                            }
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    livingStyle: {
                                                        ...formData.livingStyle!,
                                                        householdType: e.target
                                                            .value as
                                                            | 'ALONE'
                                                            | 'ROOMMATE',
                                                    },
                                                })
                                            }
                                            className="w-full h-12 px-4 rounded-lg border border-grey-200 focus:border-primary-500 focus:ring-primary-500"
                                        >
                                            <option value="ALONE">
                                                1인 가구
                                            </option>
                                            <option value="ROOMMATE">
                                                룸메이트
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="hasPet"
                                            checked={
                                                formData.livingStyle?.hasPet ||
                                                false
                                            }
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    livingStyle: {
                                                        ...formData.livingStyle!,
                                                        hasPet: e.target
                                                            .checked,
                                                    },
                                                })
                                            }
                                            className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                                        />
                                        <label
                                            htmlFor="hasPet"
                                            className="ml-2 text-sm text-grey-700"
                                        >
                                            반려동물과 함께 거주
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 우선순위 */}
                            <div>
                                <h2 className="text-xl font-semibold text-black mb-4">
                                    주거 우선순위 (1-10)
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { key: 'safety', label: '안전성' },
                                        { key: 'commute', label: '통근 편의' },
                                        { key: 'price', label: '가격' },
                                        { key: 'comfort', label: '편의성' },
                                    ].map(({ key, label }) => (
                                        <div key={key}>
                                            <label className="block text-sm font-medium text-grey-700 mb-2">
                                                {label}:{' '}
                                                {
                                                    formData.priorities?.[
                                                        key as keyof typeof formData.priorities
                                                    ]
                                                }
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={
                                                    formData.priorities?.[
                                                        key as keyof typeof formData.priorities
                                                    ] || 5
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        priorities: {
                                                            ...formData.priorities!,
                                                            [key]: parseInt(
                                                                e.target.value
                                                            ),
                                                        },
                                                    })
                                                }
                                                className="w-full h-2 bg-grey-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="text-green-600 text-sm text-center font-medium bg-green-50 p-3 rounded-lg">
                                    {success}
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-12"
                                    onClick={() => router.back()}
                                >
                                    취소
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-12"
                                    disabled={saving}
                                >
                                    {saving ? '저장 중...' : '저장하기'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
