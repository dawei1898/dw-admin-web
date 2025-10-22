import {axioser} from "../utils/httpUtil.ts";
import type {ApiResponse, PageResult} from "../types";
import type {RoleParam, RoleSearchParam, RoleVO, UserRoleParam} from "../types/roles.ts";


/**
 * 获取角色列表
 */
export function getRoleListAPI(param: RoleSearchParam) {
    return axioser.post<any, ApiResponse<PageResult<RoleVO>>>('/role/list', param)
}

/**
 * 查询角色信息
 */
export function getRoleInfoAPI(id: string) {
    return axioser.get<any, ApiResponse<RoleVO>>('/role/' + id)
}

/**
 * 保存角色
 */
export function saveRoleAPI(param: RoleParam) {
    return axioser.post<any, ApiResponse<string>>('/role/save', param)
}

/**
 * 删除角色
 */
export function deleteRoleAPI(id: string) {
    return axioser.delete<any, ApiResponse<string>>('/role/delete/' + id)
}

/**
 * 查询用户配置角色列表
 */
export function getUserRoleListAPI(userId: string) {
    return axioser.get<any, ApiResponse<RoleVO[]>>('/role/user/' + userId)
}

/**
 * 保存用户配置角色
 */
export function saveUserRoleAPI(param: UserRoleParam) {
    return axioser.post<any, ApiResponse<void>>('/role/user/save', param)
}