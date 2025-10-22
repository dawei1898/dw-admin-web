

// 常量
export const USER_KEY = 'user';
export const TOKEN_KEY = 'token';


// 登录用户信息
export interface User {
    id?: string;
    name: string;
    email?: string;
    avatarUrl?: string;
    token: string;
}


