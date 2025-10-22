import {axioser} from "../utils/httpUtil.ts";
import type {ApiResponse, PageResult} from "../types";
import type {User} from "../types/auth.ts";
import type {UserParam, UserSearchParam, UserVO} from "../types/users.ts";

/**
 * 获取登录用户信息
 */
export function getLoginUserAPI() {
    return axioser.get<any, ApiResponse<User>>('/user/query')
}

/**
 * 获取用户列表
 */
export function getUserListAPI(param: UserSearchParam) {
    return axioser.post<any, ApiResponse<PageResult<UserVO>>>('/user/list', param)
}

/**
 * 查询用户信息
 */
export function getUserInfoAPI(id: string) {
    return axioser.get<any, ApiResponse<UserVO>>('/user/' + id)
}

/**
 * 保存用户
 */
export function saveUserAPI(param: UserParam) {
    return axioser.post<any, ApiResponse<string>>('/user/save', param)
}

/**
 * 更新当前登录用户信息
 */
export function updateUserAPI(param: UserParam) {
    return axioser.post<any, ApiResponse<string>>('/user/update', param)
}

/**
 * 删除用户
 */
export function deleteUserAPI(id: string) {
    return axioser.delete<any, ApiResponse<string>>('/user/delete/' + id)
}