import Image from 'next/image';
import downArrow from '@/public/down-arrow.svg';

interface NearByPlacesProps {
    placeName?: string;
    address?: string;
    distance?: string;
}

const NearByPlaces = ({
    placeName = '부산역',
    address = '부산 동구 초랑동',
    distance = '9.4km',
}: NearByPlacesProps) => {
    return (
        <div className="flex flex-1 flex-row px-4 py-2 justify-between">
            <div className="flex flex-col py-2 gap-3">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1">
                        <h3 className="text-base text-primary-500">
                            {placeName}
                        </h3>
                        <p className="text-sm text-grey-500">KTX, SRT 정착역</p>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="flex flex-1 flex-row gap-1">
                            <p className="text-sm text-black">영업 중</p>
                            <p className="text-sm text-black">·</p>
                            <p className="text-sm text-black">
                                24:00에 영업 종료
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="flex flex-row gap-1">
                            <p className="text-sm text-black font-semibold">
                                {distance}
                            </p>
                            <p className="text-sm text-black">·</p>
                            <p className="text-sm text-black">{address}</p>
                            <Image src={downArrow} alt="down-arrow" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-1 px-2 py-1 border border-grey-500 rounded-full w-fit">
                    <p className="text-sm text-grey-500">출발</p>
                    <p className="text-sm text-grey-500">|</p>
                    <p className="text-sm text-primary-500">도착</p>
                </div>
            </div>
            <Image
                src="/부산역.jpg"
                alt="부산역"
                width={117}
                height={117}
                className="rounded-sm"
            />
        </div>
    );
};

export default NearByPlaces;
