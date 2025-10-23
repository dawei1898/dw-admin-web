

// 常量
export const USER_KEY = 'user';
export const TOKEN_KEY = 'token';


// 注册入参
export interface  RegisterParam {
    username: string;
    password: string;
}

// 用户登录入参
export interface LoginParam {
    username: string;
    password: string;
}

// 登录用户信息
export interface User {
    id?: string;
    name: string;
    email?: string;
    avatarUrl?: string;
    token: string;
}

