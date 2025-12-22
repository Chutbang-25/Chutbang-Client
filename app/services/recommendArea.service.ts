export function recommendAreas(lat: number, lng: number) {
    return [
        {
            areaId: 'seoul-gwanak',
            name: '서울 관악구',
            reason: '대학가 인근, 저렴한 임대료',
            avgDeposit: 8_000_000,
            avgRent: 550_000,
            estimatedCommuteMinutes: 35,
        },
        {
            areaId: 'seoul-dongjak',
            name: '서울 동작구',
            reason: '교통 편리, 주거 환경 양호',
            avgDeposit: 10_000_000,
            avgRent: 600_000,
            estimatedCommuteMinutes: 30,
        },
    ];
}
