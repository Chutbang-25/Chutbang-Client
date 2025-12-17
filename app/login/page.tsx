'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/common/ui/Input';
import { Button } from '@/components/common/ui/Button';
import { authService } from '@/app/services/auth.service';

import Image from 'next/image';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: '',
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
            const res = await authService.login(formData);
            if (res.success && res.data) {
                // TODO: Store token securely (e.g., cookie or context) if not handled by Supabase client automatically
                // For now, we assume the API might set a cookie or we just redirect
                router.push('/');
            } else {
                setError(res.error || 'Login failed');
            }
        } catch {
            setError('An error occurred during login');
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
                            로그인
                        </h1>
                        <p className="mt-2 text-grey-500">
                            첫방에 오신 것을 환영합니다
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
                                value={formData.id}
                                wfull
                                onChange={handleChange}
                                className="h-12 rounded-lg border-grey-200 focus:border-primary-500 focus:ring-primary-500"
                            />
                            <Input
                                label="비밀번호"
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                wfull
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
                            로그인
                        </Button>
                    </form>
                    <div className="text-center text-sm text-grey-500">
                        계정이 없으신가요?{' '}
                        <a
                            href="/signup"
                            className="font-semibold text-primary-500 hover:text-primary-600"
                        >
                            회원가입
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
