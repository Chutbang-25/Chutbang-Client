import Image from 'next/image';
import logo from '@/public/assets/logo.svg';
import Link from 'next/link';

export const Header = () => {
    return (
        <header className="flex items-center justify-between px-16 py-8 fixed top-0 left-0 right-0 z-50">
            <Image
                src={logo}
                alt="logo"
                width={43}
                height={20}
                className="cursor-pointer"
            />
            <div className="flex items-center gap-2">
                <Link href="/login">
                    <span>로그인</span>
                </Link>
                <span>|</span>
                <Link href="/signup">
                    <span>회원가입</span>
                </Link>
            </div>
        </header>
    );
};
