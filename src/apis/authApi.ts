import {axioser} from "../utils/httpUtil.ts";
import type {ApiResponse} from "../types";

/**
 * 注册接口
 */
export function registerAPI(username: string, password: string) {
    return axioser.post<any, ApiResponse<void>>('/user/register', {username, password})
}

/**
 * 登录接口
 */
export function loginAPI(username: string, password: string) {
    return axioser.post<any, ApiResponse<string>>('/user/login', {username, password})
}

/**
 * 退出登录
 */
export function logoutAPI() {
    return axioser.delete<any, ApiResponse<void>>('/user/logout')
}