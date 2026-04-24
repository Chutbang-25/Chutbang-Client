function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ~3분/km 기준 (도시 대중교통 대기 포함)
function estimateCommuteMinutes(distanceKm: number): number {
    return Math.round(distanceKm * 3);
}

interface AreaData {
    areaId: string;
    name: string;
    lat: number;
    lng: number;
    avgDeposit: number;
    avgRent: number;
    characteristics: string[];
}

const AREAS: AreaData[] = [
    { areaId: 'seoul-gwanak', name: '서울 관악구', lat: 37.4784, lng: 126.9516, avgDeposit: 8_000_000, avgRent: 550_000, characteristics: ['대학가', '저렴한 임대료'] },
    { areaId: 'seoul-dongjak', name: '서울 동작구', lat: 37.5124, lng: 126.9393, avgDeposit: 10_000_000, avgRent: 600_000, characteristics: ['교통 편리', '주거 환경 양호'] },
    { areaId: 'seoul-mapo', name: '서울 마포구', lat: 37.5663, lng: 126.9014, avgDeposit: 12_000_000, avgRent: 700_000, characteristics: ['홍대·합정', '교통 편리'] },
    { areaId: 'seoul-eunpyeong', name: '서울 은평구', lat: 37.6026, lng: 126.9291, avgDeposit: 9_000_000, avgRent: 550_000, characteristics: ['조용한 주거지', '저렴한 임대료'] },
    { areaId: 'seoul-dobong', name: '서울 도봉구', lat: 37.6688, lng: 127.0471, avgDeposit: 7_500_000, avgRent: 480_000, characteristics: ['저렴한 임대료', '자연환경'] },
    { areaId: 'seoul-nowon', name: '서울 노원구', lat: 37.6541, lng: 127.0568, avgDeposit: 8_000_000, avgRent: 500_000, characteristics: ['저렴한 임대료', '공공임대 다수'] },
    { areaId: 'seoul-jungnang', name: '서울 중랑구', lat: 37.6063, lng: 127.0925, avgDeposit: 8_500_000, avgRent: 520_000, characteristics: ['조용한 주거지', '교통 접근성'] },
    { areaId: 'seoul-seongbuk', name: '서울 성북구', lat: 37.5894, lng: 127.0167, avgDeposit: 9_500_000, avgRent: 580_000, characteristics: ['대학가', '문화 인프라'] },
    { areaId: 'seoul-gangbuk', name: '서울 강북구', lat: 37.6396, lng: 127.0255, avgDeposit: 7_000_000, avgRent: 460_000, characteristics: ['저렴한 임대료', '조용한 주거지'] },
    { areaId: 'seoul-guro', name: '서울 구로구', lat: 37.4954, lng: 126.8874, avgDeposit: 9_000_000, avgRent: 560_000, characteristics: ['디지털단지', '교통 편리'] },
    { areaId: 'seoul-geumcheon', name: '서울 금천구', lat: 37.4569, lng: 126.8955, avgDeposit: 8_000_000, avgRent: 520_000, characteristics: ['G밸리 인근', '저렴한 임대료'] },
    { areaId: 'seoul-yangcheon', name: '서울 양천구', lat: 37.5170, lng: 126.8665, avgDeposit: 11_000_000, avgRent: 650_000, characteristics: ['목동', '교육 인프라'] },
    { areaId: 'seoul-gangseo', name: '서울 강서구', lat: 37.5509, lng: 126.8495, avgDeposit: 10_000_000, avgRent: 600_000, characteristics: ['공항 인근', '교통 편리'] },
    { areaId: 'incheon-bupyeong', name: '인천 부평구', lat: 37.4874, lng: 126.7222, avgDeposit: 7_000_000, avgRent: 450_000, characteristics: ['저렴한 임대료', '교통 편리'] },
    { areaId: 'incheon-namdong', name: '인천 남동구', lat: 37.4469, lng: 126.7311, avgDeposit: 6_500_000, avgRent: 420_000, characteristics: ['산업단지', '저렴한 임대료'] },
    { areaId: 'gyeonggi-suwon', name: '경기 수원시', lat: 37.2636, lng: 127.0286, avgDeposit: 8_000_000, avgRent: 500_000, characteristics: ['삼성전자 인근', '교통 편리'] },
    { areaId: 'gyeonggi-seongnam', name: '경기 성남시', lat: 37.4449, lng: 127.1388, avgDeposit: 10_000_000, avgRent: 600_000, characteristics: ['판교', 'IT기업 밀집'] },
    { areaId: 'gyeonggi-goyang', name: '경기 고양시', lat: 37.6564, lng: 126.8350, avgDeposit: 8_500_000, avgRent: 520_000, characteristics: ['일산', '쾌적한 환경'] },
    { areaId: 'gyeonggi-bucheon', name: '경기 부천시', lat: 37.4989, lng: 126.7831, avgDeposit: 7_500_000, avgRent: 480_000, characteristics: ['서울 근접', '저렴한 임대료'] },
    { areaId: 'gyeonggi-anyang', name: '경기 안양시', lat: 37.3943, lng: 126.9568, avgDeposit: 8_000_000, avgRent: 500_000, characteristics: ['평촌', '교통 편리'] },
];

export interface RecommendedArea {
    areaId: string;
    name: string;
    reason: string;
    avgDeposit: number;
    avgRent: number;
    estimatedCommuteMinutes: number;
}

export function recommendAreas(lat: number, lng: number): RecommendedArea[] {
    const withDistance = AREAS.map((area) => ({
        ...area,
        distance: haversineDistance(lat, lng, area.lat, area.lng),
    }));

    withDistance.sort((a, b) => a.distance - b.distance);

    return withDistance.slice(0, 4).map((area) => ({
        areaId: area.areaId,
        name: area.name,
        reason: area.characteristics.join(', '),
        avgDeposit: area.avgDeposit,
        avgRent: area.avgRent,
        estimatedCommuteMinutes: estimateCommuteMinutes(area.distance),
    }));
}
