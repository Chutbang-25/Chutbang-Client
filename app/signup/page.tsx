'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/common/ui/Input';
import { Button } from '@/components/common/ui/Button';
import { authService } from '@/app/services/auth.service';
import Image from 'next/image';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: '',
        nickname: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await authService.signup(formData);
            if (res.success) {
                alert('Signup successful! Please login.');
                router.push('/login');
            } else {
                setError(res.error || 'Signup failed');
            }
        } catch {
            setError('An error occurred during signup');
        }
    };

    return (
        <div className="flex flex-row min-h-screen">
            <div className="relative w-[60%] h-screen hidden md:block">
                <Image
                    src="/assets/auth-image.jpg"
                    alt="auth-image"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
            </div>
            <div className="w-full md:w-[40%] flex flex-col items-center justify-center bg-white px-4">
                <div className="w-full max-w-[400px] space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-black">
                            회원가입
                        </h1>
                        <p className="mt-2 text-grey-500">
                            첫방과 함께 독립을 시작해보세요
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="이메일"
                                id="id"
                                name="id"
                                type="email"
                                required
                                wfull
                                value={formData.id}
                                onChange={handleChange}
                                className="h-12 rounded-lg border-grey-200 focus:border-primary-500 focus:ring-primary-500"
                            />
                            <Input
                                label="닉네임"
                                id="nickname"
                                name="nickname"
                                type="text"
                                required
                                wfull
                                value={formData.nickname}
                                onChange={handleChange}
                                className="h-12 rounded-lg border-grey-200 focus:border-primary-500 focus:ring-primary-500"
                            />
                            <Input
                                label="비밀번호"
                                id="password"
                                name="password"
                                type="password"
                                required
                                wfull
                                value={formData.password}
                                onChange={handleChange}
                                className="h-12 rounded-lg border-grey-200 focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm text-center font-medium">
                                {error}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-bold rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
                        >
                            가입하기
                        </Button>
                    </form>
                    <div className="text-center text-sm text-grey-500">
                        이미 계정이 있으신가요?{'   '}
                        <a
                            href="/login"
                            className="font-semibold text-primary-500 hover:text-primary-600"
                        >
                            로그인
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
