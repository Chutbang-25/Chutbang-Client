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
    lat?: number;
    lng?: number;
}

// ---------- Main Function ----------
export async function fetchPublicHousing(params?: {
    city?: string;
    district?: string;
    open?: boolean;
}): Promise<PublicHousing[]> {
    const searchParams = new URLSearchParams();
    if (params?.city) searchParams.append('city', params.city);
    if (params?.district) searchParams.append('district', params.district);
    if (params?.open) searchParams.append('open', 'true');

    const res = await fetch(`/api/public-housing?${searchParams.toString()}`);
    if (!res.ok) {
        throw new Error('Failed to fetch public housing data');
    }
    const json = await res.json();
    return json.data;
}

// Legacy function support (can be removed later or adapted)
export async function matchPublicHousing(userProfile: UserProfile) {
    const housings = await fetchPublicHousing({ open: true });
    const today = new Date();

    return housings.filter((h) => {
        return (
            userProfile.income <= h.income_limit &&
            (!h.age_limit || (userProfile.age ?? 999) <= h.age_limit) &&
            today >= new Date(h.application_start) &&
            today <= new Date(h.application_end)
        );
    });
}
