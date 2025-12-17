import SearchInput from './SearchInput';
import NearByPlace from './NearByPlaces';

interface SearchSideBarProps {
    keyword: string;
    setKeyword: (keyword: string) => void;
    onSearch: () => void;
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
    selectedPlace,
}: SearchSideBarProps) => {
    return (
        <div className="w-full h-full bg-white flex flex-col border-r border-grey-200">
            <div className="p-4 h-[72px] flex items-center">
                <SearchInput
                    value={keyword}
                    onChange={setKeyword}
                    onSearch={onSearch}
                />
            </div>
            <div className="flex-1 overflow-y-auto">
                <NearByPlace
                    placeName={selectedPlace?.place_name}
                    address={selectedPlace?.address_name}
                    distance={selectedPlace?.distance}
                />
            </div>
        </div>
    );
};

export default SearchSideBar;
