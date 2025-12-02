'use client';

import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/use-kakao-loader';
import { useState } from 'react';
import SearchSideBar from '@/components/search/SearchSidebar/SearchSideBar';
import calculateTime from '@/services/CalculateTime';
import { House } from '@/types/house';
import { generateRandomHouses } from '@/utils/generateMockHouses';

interface KakaoPlace {
    place_name: string;
    address_name: string;
    x: string;
    y: string;
    distance: string;
    [key: string]: unknown;
}

export default function Search() {
    useKakaoLoader();
    const [keyword, setKeyword] = useState('');
    const [center, setCenter] = useState({ lat: 37.498095, lng: 127.02761 });
    const [houses, setHouses] = useState<House[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null);

    const searchPlace = () => {
        if (!window.kakao || !keyword)
            return alert('카카오맵이 로드되지 않았거나 검색어가 없습니다.');
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(keyword, async (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const target = data[0];
                const startX = parseFloat(target.x); //위도(long)
                const startY = parseFloat(target.y); //경도(lat)

                setCenter({ lat: startY, lng: startX });
                setSelectedPlace(target as unknown as KakaoPlace);

                const randomHouses = generateRandomHouses(startY, startX);
                const results = await calculateTime(
                    startX,
                    startY,
                    randomHouses
                );
                setHouses(results);
            } else {
                alert('검색 결과가 없습니다.');
            }
        });
    };

    return (
        <div className="w-full h-screen flex flex-row">
            {/* Sidebar Section (Fixed 400px) */}
            <div className="w-[400px] min-w-[400px] h-full border-r border-grey-200 bg-white z-10">
                <SearchSideBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={searchPlace}
                    selectedPlace={selectedPlace || undefined}
                />
            </div>

            {/* Map Section (Flex 1) */}
            <div className="flex-1 h-full relative">
                <Map
                    center={center}
                    style={{ width: '100%', height: '100%' }}
                    level={7}
                    draggable={true}
                    isPanto={true}
                >
                    <MapMarker
                        position={center}
                        image={{
                            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
                            size: { width: 40, height: 42 },
                            options: { offset: { x: 20, y: 42 } },
                        }}
                    />

                    {houses.map((house) => (
                        <div key={house.id}>
                            <MapMarker
                                position={{ lat: house.y, lng: house.x }}
                            />

                            <CustomOverlayMap
                                position={{ lat: house.y, lng: house.x }}
                                yAnchor={1.4}
                            >
                                <div className="bg-white p-2 rounded-lg shadow-xl border border-blue-100 flex flex-col items-center animate-bounce-slow">
                                    <span className="text-xs text-gray-500">
                                        {house.name}
                                    </span>
                                    <span className="text-lg font-bold text-blue-600">
                                        {house.time === 999
                                            ? '경로없음'
                                            : `${house.time}분 🚌`}
                                    </span>
                                </div>
                            </CustomOverlayMap>
                        </div>
                    ))}
                </Map>
            </div>
        </div>
    );
}
