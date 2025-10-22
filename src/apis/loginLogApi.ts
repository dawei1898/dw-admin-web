import {axioser} from "../utils/httpUtil.ts";
import type {ApiResponse, PageResult} from "../types";
import type {LoginLogSearchParam, LoginLogVO} from "../types/loginLog.ts";


/**
 * 获取登录日志列表
 */
export function getLoginLogListAPI(param: LoginLogSearchParam) {
    return axioser.post<any, ApiResponse<PageResult<LoginLogVO>>>('/loginLog/list', param)
}

/**
 * 删除角色
 */
export function deleteLoginLogAPI(id: string) {
    return axioser.delete<any, ApiResponse<string>>('/loginLog/delete/' + id)
}
