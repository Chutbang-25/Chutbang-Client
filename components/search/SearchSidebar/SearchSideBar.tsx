import SearchInput from './SearchInput';
import NearByPlace from './NearByPlaces';

interface SearchSideBarProps {
    keyword: string;
    setKeyword: (keyword: string) => void;
    onSearch: () => void;
    onGetMyLocation?: () => void;
    isLoadingLocation?: boolean;
    onSetAsStart?: () => void;
    onSetAsDestination?: () => void;
    selectedPlace?: {
        place_name: string;
        address_name: string;
        distance?: string;
    };
}

const SearchSideBar = ({
    keyword,
    setKeyword,
    onSearch,
    onGetMyLocation,
    isLoadingLocation,
    onSetAsStart,
    onSetAsDestination,
    selectedPlace,
}: SearchSideBarProps) => {
    return (
        <div className="w-full h-full bg-white flex flex-col border-r border-grey-200">
            <div className="p-4 space-y-2">
                <SearchInput
                    value={keyword}
                    onChange={setKeyword}
                    onSearch={onSearch}
                />
                {onGetMyLocation && (
                    <button
                        onClick={onGetMyLocation}
                        disabled={isLoadingLocation}
                        className="w-full h-12 px-4 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoadingLocation ? (
                            <>
                                <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                                위치 확인 중...
                            </>
                        ) : (
                            <>
                                <span className="text-lg">📍</span>
                                내 위치로 이동
                            </>
                        )}
                    </button>
                )}
            </div>
            <div className="flex-1 overflow-y-auto">
                <NearByPlace
                    placeName={selectedPlace?.place_name}
                    address={selectedPlace?.address_name}
                    distance={selectedPlace?.distance}
                    onSetAsStart={onSetAsStart}
                    onSetAsDestination={onSetAsDestination}
                />
            </div>
        </div>
    );
};

export default SearchSideBar;
