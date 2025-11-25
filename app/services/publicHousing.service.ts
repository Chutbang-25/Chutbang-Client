// ---------- Types ----------
export interface UserProfile {
    income: number;
    age?: number;
    workLocation: {
        lat: number;
        lng: number;
        address: string;
    };
}

export interface PublicHousing {
    id: string;
    type: string; // 행복주택, 청년주택 등
    location: string;
    income_limit: number;
    age_limit?: number | null;
    application_start: string; // ISO string
    application_end: string; // ISO string
    official_link: string;
}

// ---------- Mock Data (임시)
const MOCK_PUBLIC_HOUSING: PublicHousing[] = [
    {
        id: 'ph_01',
        type: '행복주택',
        location: '서울 관악구',
        income_limit: 3500000,
        age_limit: 39,
        application_start: '2025-02-01',
        application_end: '2025-02-25',
        official_link: 'https://apply.lh.or.kr/',
    },
    {
        id: 'ph_02',
        type: '역세권 청년주택',
        location: '서울 동작구',
        income_limit: 4200000,
        age_limit: null,
        application_start: '2025-03-01',
        application_end: '2025-03-18',
        official_link: 'https://www.i-sh.co.kr',
    },
];

// ---------- Main Function ----------
export function matchPublicHousing(userProfile: UserProfile) {
    const today = new Date();

    return MOCK_PUBLIC_HOUSING.filter((h) => {
        return (
            userProfile.income <= h.income_limit &&
            (!h.age_limit || (userProfile.age ?? 999) <= h.age_limit) &&
            today >= new Date(h.application_start) &&
            today <= new Date(h.application_end)
        );
    });
}
