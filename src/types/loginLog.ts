import type {PageParam} from "./index";


// 搜索登录日志入参
export interface LoginLogSearchParam extends PageParam {
    username?: string;
    ipAddr?: string;
    loginTimeSort?: string;
}

// 角色返参
export interface LoginLogVO {
    id: string;
    userId: string;
    username: string;
    ipAddr?: string;
    loginLocation?: string;
    loginTime: string;
    os?: string;
    browser?: string;
    status?: string;
}

