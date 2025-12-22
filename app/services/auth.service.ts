export interface LoginRequest {
    id: string;
    password: string;
}

export interface SignupRequest {
    id: string;
    nickname: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    data?: {
        accessToken: string;
        refreshToken: string;
    };
    error?: string;
}

export const authService = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();

        // 토큰 저장
        if (result.success && result.data) {
            localStorage.setItem('accessToken', result.data.accessToken);
            localStorage.setItem('refreshToken', result.data.refreshToken);
        }

        return result;
    },

    async signup(data: SignupRequest): Promise<AuthResponse> {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();

        // 토큰 저장
        if (result.success && result.data) {
            localStorage.setItem('accessToken', result.data.accessToken);
            localStorage.setItem('refreshToken', result.data.refreshToken);
        }

        return result;
    },

    async logout(): Promise<void> {
        const token = localStorage.getItem('accessToken');
        if (token) {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    getToken(): string | null {
        return localStorage.getItem('accessToken');
    },

    async refreshToken(): Promise<AuthResponse> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            return {
                success: false,
                error: 'NO_REFRESH_TOKEN',
            };
        }

        try {
            const res = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            const result = await res.json();

            if (result.success && result.data) {
                localStorage.setItem('accessToken', result.data.accessToken);
                localStorage.setItem('refreshToken', result.data.refreshToken);
            }

            return result;
        } catch {
            return {
                success: false,
                error: 'REFRESH_FAILED',
            };
        }
    },

    isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const exp = payload.exp * 1000; // Convert to milliseconds
            return Date.now() >= exp;
        } catch {
            return true;
        }
    },

    async getValidToken(): Promise<string | null> {
        const accessToken = this.getToken();
        if (!accessToken) return null;

        // 토큰이 만료되었다면 갱신 시도
        if (this.isTokenExpired(accessToken)) {
            const refreshResult = await this.refreshToken();
            if (refreshResult.success && refreshResult.data) {
                return refreshResult.data.accessToken;
            }
            // 갱신 실패 시 로그아웃
            await this.logout();
            return null;
        }

        return accessToken;
    },
};
