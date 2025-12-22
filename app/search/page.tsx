'use client';

import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/use-kakao-loader';
import { useState, useEffect } from 'react';
import SearchSideBar from '@/components/search/SearchSidebar/SearchSideBar';
import calculateTime from '@/services/CalculateTime';
import { House } from '@/types/house';
import { fetchPublicHousing } from '@/app/services/publicHousing.service';

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
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [mode, setMode] = useState<'start' | 'destination'>('destination');

    // Get user's current location
    const getUserLocation = () => {
        setIsLoadingLocation(true);
        if (!navigator.geolocation) {
            alert('브라우저가 위치 서비스를 지원하지 않습니다.');
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                setCenter({ lat: userLat, lng: userLng });
                setSelectedPlace({
                    place_name: '내 위치',
                    address_name: '현재 위치',
                    x: userLng.toString(),
                    y: userLat.toString(),
                    distance: '0',
                });

                // 도착지 모드일 때만 통근 시간 계산
                if (houses.length > 0 && mode === 'destination') {
                    const results = await calculateTime(userLng, userLat, houses);
                    setHouses(results);
                }

                setIsLoadingLocation(false);
            },
            (error) => {
                console.error('위치 정보를 가져올 수 없습니다:', error);
                alert(
                    '위치 정보를 가져올 수 없습니다. 브라우저 설정에서 위치 권한을 확인해주세요.'
                );
                setIsLoadingLocation(false);
            }
        );
    };

    // Initial load of public housing data and user location
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // 1. 먼저 공공임대 데이터 로드
                const housingData = await fetchPublicHousing({ open: true });
                const mappedHouses: House[] = housingData.map((h) => ({
                    id: parseInt(h.id.replace('ph_', '')) || Math.random(),
                    name: h.type + ' ' + h.location,
                    x: h.lng || 127.02761,
                    y: h.lat || 37.498095,
                    time: 0,
                    price: h.income_limit.toString(),
                }));
                setHouses(mappedHouses);

                // 2. 데이터 로드 후 사용자 위치 가져오기
                // 초기값이 'destination'이므로 자동으로 통근 시간 계산됨
                getUserLocation();
            } catch (error) {
                console.error('Failed to load housing data', error);
                // 데이터 로드 실패해도 위치는 시도
                getUserLocation();
            }
        };
        loadInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchPlace = () => {
        if (!window.kakao || !keyword)
            return alert('카카오맵이 로드되지 않았거나 검색어가 없습니다.');
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(keyword, async (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const target = data[0];
                const startX = parseFloat(target.x);
                const startY = parseFloat(target.y);

                setCenter({ lat: startY, lng: startX });
                setSelectedPlace(target as unknown as KakaoPlace);

                // 도착지 모드일 때만 통근 시간 계산
                if (mode === 'destination') {
                    const results = await calculateTime(startX, startY, houses);
                    setHouses(results);
                }
            } else {
                alert('검색 결과가 없습니다.');
            }
        });
    };

    const handleSetAsStart = () => {
        setMode('start');
        console.log('출발지로 설정:', selectedPlace?.place_name);
        // 출발지 모드에서는 통근 시간 계산하지 않음
    };

    const handleSetAsDestination = async () => {
        setMode('destination');
        console.log('도착지로 설정:', selectedPlace?.place_name);
        console.log('현재 houses 개수:', houses.length);

        // 도착지로 설정 시 통근 시간 재계산
        if (selectedPlace && houses.length > 0) {
            const startX = parseFloat(selectedPlace.x);
            const startY = parseFloat(selectedPlace.y);

            console.log('통근 시간 계산 시작:', { startX, startY });

            try {
                const results = await calculateTime(startX, startY, houses);
                console.log('계산된 결과:', results.slice(0, 3)); // 첫 3개만 로그
                setHouses(results);
                console.log('통근 시간 계산 완료');
            } catch (error) {
                console.error('통근 시간 계산 실패:', error);
            }
        } else {
            console.log('조건 미충족:', {
                hasSelectedPlace: !!selectedPlace,
                housesLength: houses.length,
            });
        }
    };

    return (
        <div className="w-full h-screen flex flex-row">
            {/* Sidebar Section (Fixed 400px) */}
            <div className="w-[400px] min-w-[400px] h-full border-r border-grey-200 bg-white z-10">
                <SearchSideBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={searchPlace}
                    onGetMyLocation={getUserLocation}
                    isLoadingLocation={isLoadingLocation}
                    onSetAsStart={handleSetAsStart}
                    onSetAsDestination={handleSetAsDestination}
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
                                <div className="bg-white p-2 rounded-lg shadow-xl border border-primary-100 flex flex-col items-center animate-bounce-slow">
                                    <span className="text-xs text-grey-500">
                                        {house.name}
                                    </span>
                                    <span className="text-lg font-bold text-primary-600">
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
