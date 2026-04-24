'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/ui/Button';
import { Input } from '@/components/common/ui/Input';

interface PublicHousing {
    id: string;
    name: string;
    type: string;
    city: string;
    district: string;
    application_start: string;
    application_end: string;
}

export default function AdminPage() {
    const router = useRouter();
    const [housings, setHousings] = useState<PublicHousing[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        city: '',
        district: '',
        address: '',
        scale: '',
        household_count: '',
        application_start: '',
        application_end: '',
        move_in_date: '',
        price_range: '',
        qualification: '',
        url: '',
        contact: '',
    });

    useEffect(() => {
        checkAdminAuth().then(() => fetchHousings());
    }, []);

    const checkAdminAuth = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
            return;
        }
        // 관리자 전용 엔드포인트 호출로 권한 검증
        const res = await fetch('/api/admin/public-housing', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
            router.push('/login');
        } else if (res.status === 403) {
            router.push('/');
        }
    };

    const fetchHousings = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('/api/admin/public-housing', {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (res.ok) {
                const result = await res.json();
                setHousings(result.data || []);
            }
        } catch (e) {
            console.error('Failed to fetch housings:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const payload = {
                ...formData,
                household_count: formData.household_count
                    ? parseInt(formData.household_count)
                    : undefined,
            };

            const res = await fetch('/api/admin/public-housing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.success) {
                setSuccess('공공임대가 등록되었습니다!');
                setShowAddForm(false);
                fetchHousings();
                // 폼 초기화
                setFormData({
                    name: '',
                    type: '',
                    city: '',
                    district: '',
                    address: '',
                    scale: '',
                    household_count: '',
                    application_start: '',
                    application_end: '',
                    move_in_date: '',
                    price_range: '',
                    qualification: '',
                    url: '',
                    contact: '',
                });
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(result.error || '등록에 실패했습니다.');
            }
        } catch (e) {
            setError('오류가 발생했습니다.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch(`/api/admin/public-housing/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await res.json();

            if (result.success) {
                setSuccess('삭제되었습니다!');
                fetchHousings();
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(result.error || '삭제에 실패했습니다.');
            }
        } catch (e) {
            setError('오류가 발생했습니다.');
        }
    };

    const handleSync = async () => {
        if (!confirm('크롤링을 시작하시겠습니까?')) return;

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch('/api/admin/public-housing/sync', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await res.json();

            if (result.success) {
                setSuccess('크롤링이 시작되었습니다!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(result.error || '크롤링 시작에 실패했습니다.');
            }
        } catch (e) {
            setError('오류가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-screen bg-grey-50">
            <Header />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-black mb-2">
                                관리자 페이지
                            </h1>
                            <p className="text-grey-500">
                                공공임대 정보를 관리할 수 있습니다
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleSync}>
                                크롤링 실행
                            </Button>
                            <Button
                                onClick={() => setShowAddForm(!showAddForm)}
                            >
                                {showAddForm ? '취소' : '새 항목 추가'}
                            </Button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-600 text-sm font-medium bg-green-50 p-4 rounded-lg mb-6">
                            {success}
                        </div>
                    )}

                    {/* 추가 폼 */}
                    {showAddForm && (
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-semibold text-black mb-4">
                                공공임대 추가
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="이름"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="유형"
                                        id="type"
                                        name="type"
                                        required
                                        value={formData.type}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                type: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="도시"
                                        id="city"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                city: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="구/군"
                                        id="district"
                                        name="district"
                                        required
                                        value={formData.district}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                district: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="주소"
                                        id="address"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                address: e.target.value,
                                            })
                                        }
                                        wfull
                                        className="md:col-span-2"
                                    />
                                    <Input
                                        label="규모"
                                        id="scale"
                                        name="scale"
                                        value={formData.scale}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                scale: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="세대수"
                                        id="household_count"
                                        name="household_count"
                                        type="number"
                                        value={formData.household_count}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                household_count: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="신청 시작일"
                                        id="application_start"
                                        name="application_start"
                                        type="date"
                                        required
                                        value={formData.application_start}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                application_start:
                                                    e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="신청 마감일"
                                        id="application_end"
                                        name="application_end"
                                        type="date"
                                        required
                                        value={formData.application_end}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                application_end: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="입주 예정일"
                                        id="move_in_date"
                                        name="move_in_date"
                                        type="date"
                                        value={formData.move_in_date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                move_in_date: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="가격대"
                                        id="price_range"
                                        name="price_range"
                                        value={formData.price_range}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                price_range: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="URL"
                                        id="url"
                                        name="url"
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                url: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <Input
                                        label="연락처"
                                        id="contact"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                contact: e.target.value,
                                            })
                                        }
                                        wfull
                                    />
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-grey-700 mb-2">
                                            자격 요건
                                        </label>
                                        <textarea
                                            value={formData.qualification}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    qualification:
                                                        e.target.value,
                                                })
                                            }
                                            rows={4}
                                            className="w-full px-4 py-2 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">
                                    등록하기
                                </Button>
                            </form>
                        </div>
                    )}

                    {/* 목록 */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-grey-50 border-b border-grey-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">
                                            이름
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">
                                            유형
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">
                                            위치
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">
                                            신청 기간
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-grey-500 uppercase tracking-wider">
                                            작업
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-grey-200">
                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-4 text-center text-grey-500"
                                            >
                                                로딩 중...
                                            </td>
                                        </tr>
                                    ) : housings.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-4 text-center text-grey-500"
                                            >
                                                등록된 공공임대가 없습니다
                                            </td>
                                        </tr>
                                    ) : (
                                        housings.map((housing) => (
                                            <tr key={housing.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900">
                                                    {housing.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-500">
                                                    {housing.type}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-500">
                                                    {housing.city}{' '}
                                                    {housing.district}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-500">
                                                    {new Date(
                                                        housing.application_start
                                                    ).toLocaleDateString()}{' '}
                                                    ~{' '}
                                                    {new Date(
                                                        housing.application_end
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            router.push(
                                                                `/public-housing/${housing.id}`
                                                            )
                                                        }
                                                        className="text-primary-500 hover:text-primary-700 mr-4"
                                                    >
                                                        보기
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                housing.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        삭제
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
