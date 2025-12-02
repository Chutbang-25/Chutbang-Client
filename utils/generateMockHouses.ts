import { House } from '@/types/house';

export const generateRandomHouses = (
    centerLat: number,
    centerLng: number,
    count: number = 5
): House[] => {
    const houses: House[] = [];
    for (let i = 0; i < count; i++) {
        // Generate random coordinates within ~1km radius (approx 0.01 degree)
        const latOffset = (Math.random() - 0.5) * 0.02;
        const lngOffset = (Math.random() - 0.5) * 0.02;

        houses.push({
            id: Date.now() + i,
            name: `추천 매물 ${i + 1}`,
            x: centerLng + lngOffset,
            y: centerLat + latOffset,
            price: `${Math.floor(Math.random() * 5000) + 500}/${
                Math.floor(Math.random() * 50) + 30
            }`,
        });
    }
    return houses;
};
