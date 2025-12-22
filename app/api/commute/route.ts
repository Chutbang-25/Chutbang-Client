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

    console.log(`[통근시간 API] 출발지: (${startX}, ${startY}), 목적지 개수: ${destinations.length}`);

    const checkTime = async (house: House): Promise<HouseWithTime> => {
        // SX, SY = 출발지 (선택한 위치), EX, EY = 도착지 (집)
        const url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${startX}&SY=${startY}&EX=${house.x}&EY=${house.y}&apiKey=${ODSAY_API_KEY}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (!data.result || !data.result.path || data.result.path.length === 0) {
                console.log(`경로 없음 - 집: (${house.x}, ${house.y})`);
                return { ...house, time: 999 };
            }
            const minTime = data.result.path[0].info.totalTime;
            console.log(`통근시간 계산 완료 - 집: (${house.x}, ${house.y}), 시간: ${minTime}분`);
            return { ...house, time: minTime };
        } catch (error) {
            console.error(`API 호출 실패 - 집: (${house.x}, ${house.y})`, error);
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
