import {axioser} from "../utils/httpUtil.ts";
import type {ApiResponse} from "../types";
import type {LoginParam, RegisterParam} from "../types/auth.ts";

/**
 * 注册接口
 */
export function registerAPI(param:  RegisterParam) {
    return axioser.post<any, ApiResponse<void>>('/user/register', param)
}

/**
 * 登录接口
 */
export function loginAPI(param: LoginParam) {
    return axioser.post<any, ApiResponse<string>>('/user/login', param)
}

/**
 * 退出登录
 */
export function logoutAPI() {
    return axioser.delete<any, ApiResponse<void>>('/user/logout')
}