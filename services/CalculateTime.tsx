'use client';

import { House } from '@/types/house';

const calculateTime = async (
    startX: number,
    startY: number,
    destinations: House[]
): Promise<House[]> => {
    try {
        const response = await fetch('/api/commute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startX,
                startY,
                destinations,
            }),
        });

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
        alert('에러가 발생했습니다.');
        return [];
    }
};

export default calculateTime;
