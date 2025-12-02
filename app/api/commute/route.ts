import { NextResponse } from 'next/server';

const ODSAY_API_KEY = process.env.ODSAY_API_KEY;

interface House {
    x: number;
    y: number;
    [key: string]: unknown;
}

interface HouseWithTime extends House {
    time: number;
}

export async function POST(request: Request) {
    const body = await request.json();
    const {
        startX,
        startY,
        destinations,
    }: { startX: number; startY: number; destinations: House[] } = body;

    const checkTime = async (house: House): Promise<HouseWithTime> => {
        const url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${house.x}&SY=${house.y}&EX=${startX}&EY=${startY}&apiKey=${ODSAY_API_KEY}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (!data.result) return { ...house, time: 999 };
            const minTime = data.result.path[0].info.totalTime;
            return { ...house, time: minTime };
        } catch {
            return { ...house, time: 999 };
        }
    };

    try {
        const results = await Promise.all(
            destinations.map((house: House) => checkTime(house))
        );

        const sortedResults = results.sort(
            (a: HouseWithTime, b: HouseWithTime) => a.time - b.time
        );

        return NextResponse.json({ results: sortedResults });
    } catch {
        return NextResponse.json(
            { error: '계산에 실패했습니다.' },
            { status: 500 }
        );
    }
}
