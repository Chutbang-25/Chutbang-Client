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
};
