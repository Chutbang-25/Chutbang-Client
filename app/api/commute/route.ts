import { NextResponse } from 'next/server';

const TMAP_API_KEY = process.env.TMAP_API_KEY;

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
        // TMAP 대중교통 API 호출
        const url = 'https://apis.openapi.sk.com/transit/routes';

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'appKey': TMAP_API_KEY || '',
                    'accept': 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    startX: startX,
                    startY: startY,
                    endX: house.x,
                    endY: house.y,
                    count: 1, // 최적 경로 1개만
                    lang: 0,
                    format: 'json',
                }),
            });

            if (!res.ok) {
                console.error(`TMAP API 호출 실패 - 집: (${house.x}, ${house.y}), 상태: ${res.status}`);
                return { ...house, time: 999 };
            }

            const data = await res.json();

            // TMAP 응답에서 경로 정보 추출
            if (!data.metaData || !data.metaData.plan || !data.metaData.plan.itineraries || data.metaData.plan.itineraries.length === 0) {
                console.log(`경로 없음 - 집: (${house.x}, ${house.y})`);
                return { ...house, time: 999 };
            }

            // 첫 번째 경로의 총 소요시간 (분 단위)
            const totalTime = data.metaData.plan.itineraries[0].totalTime;
            const minTime = Math.round(totalTime / 60); // 초 → 분 변환

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
