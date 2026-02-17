import { User } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async (email: string, password: string): Promise<User> => {
    await delay(800);
    // Mock logic
    if (email.includes('admin')) {
        return {
            id: 'admin-1',
            name: 'Admin User',
            email,
            role: 'ADMIN',
            token: 'mock-jwt-admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
        };
    }
    if (email.includes('provider')) {
        return {
            id: 'provider-1',
            name: 'Kandy Tours Ltd',
            email,
            role: 'PROVIDER',
            token: 'mock-jwt-provider',
            avatar: 'https://ui-avatars.com/api/?name=Kandy+Tours&background=random',
        };
    }
    if (email.includes('guide')) {
        return {
            id: 'guide-1',
            name: 'Nimal Perera',
            email,
            role: 'GUIDE',
            token: 'mock-jwt-guide',
            avatar: 'https://ui-avatars.com/api/?name=Nimal+Perera&background=random',
        };
    }

    return {
        id: 'guest-1',
        name: 'John Doe',
        email,
        role: 'GUEST',
        token: 'mock-jwt-guest',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    };
};

export const register = async (data: any): Promise<User> => {
    await delay(800);
    return {
        id: `guest-${Date.now()}`,
        name: data.name,
        email: data.email,
        role: 'GUEST',
        token: 'mock-jwt-new',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
    };
};

export const getMe = async (): Promise<User> => {
    await delay(500);
    // In real app, this fetches from /me using token
    // Here we just return a dummy or rely on stored user
    throw new Error("Not implemented in mock - use stored user");
};

export const sendOtp = async (email: string): Promise<boolean> => {
    await delay(1000);
    // Mock sending OTP
    console.log(`OTP sent to ${email}: 123456`);
    return true;
};

export const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    await delay(800);
    // Mock verification
    if (otp === '123456') return true;
    throw new Error('Invalid verification code');
};

export const resetPassword = async (email: string, password: string): Promise<User> => {
    await delay(1000);
    // Mock password reset and auto-login
    return {
        id: `guest-${Date.now()}`,
        name: 'Guest User',
        email,
        role: 'GUEST',
        token: 'mock-jwt-reset',
        avatar: `https://ui-avatars.com/api/?name=Guest+User&background=random`,
    };
};
