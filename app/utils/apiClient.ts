import { authService } from '@/app/services/auth.service';

/**
 * API 클라이언트 - 자동 토큰 갱신 기능 포함
 */
export const apiClient = {
    async fetch(url: string, options: RequestInit = {}): Promise<Response> {
        const token = await authService.getValidToken();

        if (!token && !url.includes('/auth/')) {
            // 토큰이 없고 인증 API가 아니면 로그인 페이지로 리다이렉트
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            throw new Error('NO_TOKEN');
        }

        const headers: HeadersInit = {
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        // 401 에러 시 토큰 갱신 시도
        if (response.status === 401 && !url.includes('/auth/')) {
            const refreshResult = await authService.refreshToken();

            if (refreshResult.success && refreshResult.data) {
                // 갱신 성공 시 다시 요청
                headers['Authorization'] = `Bearer ${refreshResult.data.accessToken}`;
                return fetch(url, {
                    ...options,
                    headers,
                });
            } else {
                // 갱신 실패 시 로그아웃 후 로그인 페이지로
                await authService.logout();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        return response;
    },

    async get(url: string, options: RequestInit = {}): Promise<Response> {
        return this.fetch(url, {
            ...options,
            method: 'GET',
        });
    },

    async post(
        url: string,
        body?: any,
        options: RequestInit = {}
    ): Promise<Response> {
        return this.fetch(url, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
    },

    async put(
        url: string,
        body?: any,
        options: RequestInit = {}
    ): Promise<Response> {
        return this.fetch(url, {
            ...options,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
    },

    async delete(url: string, options: RequestInit = {}): Promise<Response> {
        return this.fetch(url, {
            ...options,
            method: 'DELETE',
        });
    },
};
