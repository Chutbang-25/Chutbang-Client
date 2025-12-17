'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/public/assets/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/app/services/auth.service';

export const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = authService.getToken();
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
        await authService.logout();
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <header className="flex items-center justify-between px-16 py-6 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
            <Link href="/">
                <Image
                    src={logo}
                    alt="logo"
                    width={43}
                    height={20}
                    className="cursor-pointer"
                />
            </Link>
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <>
                        <Link href="/profile">
                            <span className="hover:text-primary-500 cursor-pointer">
                                프로필
                            </span>
                        </Link>
                        <Link href="/housing/history">
                            <span className="hover:text-primary-500 cursor-pointer">
                                진단기록
                            </span>
                        </Link>
                        <Link href="/public-housing">
                            <span className="hover:text-primary-500 cursor-pointer">
                                공공임대
                            </span>
                        </Link>
                        <Link href="/chat">
                            <span className="hover:text-primary-500 cursor-pointer">
                                상담
                            </span>
                        </Link>
                        <Link href="/guides">
                            <span className="hover:text-primary-500 cursor-pointer">
                                가이드
                            </span>
                        </Link>
                        <Link href="/admin">
                            <span className="hover:text-primary-500 cursor-pointer">
                                관리자
                            </span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="hover:text-primary-500"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <span className="hover:text-primary-500 cursor-pointer">
                                로그인
                            </span>
                        </Link>
                        <span>|</span>
                        <Link href="/signup">
                            <span className="hover:text-primary-500 cursor-pointer">
                                회원가입
                            </span>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};
