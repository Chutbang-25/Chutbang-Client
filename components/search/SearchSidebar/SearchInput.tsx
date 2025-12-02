'use client';

import Image from 'next/image';
import SearchIcon from '@/public/assets/search.svg';

import CloseIcon from '@/public/assets/close.svg';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

const SearchInput = ({ value = '', onChange, onSearch }: SearchInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="flex items-center gap-1 w-full border border-primary-500 rounded-md px-3">
            <Image
                src={SearchIcon}
                alt="search"
                width={24}
                height={24}
                onClick={onSearch}
                className="cursor-pointer"
            />
            <input
                type="text"
                placeholder="직장을 입력하세요"
                className="flex-1 p-2 text-black focus:outline-none placeholder:text-[#808080] text-base"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {value && (
                <Image
                    src={CloseIcon}
                    alt="close"
                    width={24}
                    height={24}
                    onClick={() => onChange('')}
                    className="cursor-pointer"
                />
            )}
        </div>
    );
};

export default SearchInput;
