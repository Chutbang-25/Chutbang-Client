import Image from 'next/image';
import downArrow from '@/public/down-arrow.svg';
import { useState } from 'react';

interface NearByPlacesProps {
    placeName?: string;
    address?: string;
    distance?: string;
    onSetAsStart?: () => void;
    onSetAsDestination?: () => void;
}

const NearByPlaces = ({
    placeName = '장소를 검색하세요',
    address = '',
    distance = '',
    onSetAsStart,
    onSetAsDestination,
}: NearByPlacesProps) => {
    const [mode, setMode] = useState<'start' | 'destination'>('destination');

    const handleModeChange = (newMode: 'start' | 'destination') => {
        setMode(newMode);
        if (newMode === 'start' && onSetAsStart) {
            onSetAsStart();
        } else if (newMode === 'destination' && onSetAsDestination) {
            onSetAsDestination();
        }
    };

    if (!placeName || placeName === '장소를 검색하세요') {
        return (
            <div className="flex flex-1 flex-col px-4 py-6 items-center justify-center text-center">
                <p className="text-grey-400 text-sm">
                    장소를 검색하거나
                    <br />
                    내 위치 버튼을 눌러보세요
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col px-4 py-2">
            <div className="flex flex-col py-2 gap-3">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 items-center">
                        <h3 className="text-base text-primary-500 font-semibold">
                            {placeName}
                        </h3>
                    </div>
                    {address && (
                        <div className="flex flex-col">
                            <p className="text-sm text-grey-600">{address}</p>
                        </div>
                    )}
                    {distance && distance !== '0' && (
                        <div className="flex flex-row gap-1 items-center">
                            <p className="text-sm text-black font-semibold">
                                {distance}
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-row gap-1 px-3 py-2 border border-grey-300 rounded-full w-fit cursor-pointer hover:border-primary-500 transition-colors">
                    <button
                        onClick={() => handleModeChange('start')}
                        className={`text-sm transition-colors ${
                            mode === 'start'
                                ? 'text-primary-500 font-medium'
                                : 'text-grey-500'
                        }`}
                    >
                        출발
                    </button>
                    <p className="text-sm text-grey-400">|</p>
                    <button
                        onClick={() => handleModeChange('destination')}
                        className={`text-sm transition-colors ${
                            mode === 'destination'
                                ? 'text-primary-500 font-medium'
                                : 'text-grey-500'
                        }`}
                    >
                        도착
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NearByPlaces;
