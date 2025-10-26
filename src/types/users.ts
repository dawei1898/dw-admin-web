import type {PageParam} from "./index";
import type {RoleParam} from "./roles.ts";



// 搜索用户入参
export interface UserSearchParam extends PageParam {
    name?: string;
    email?: string;
    phone?: string;
    createTimeSort?: string;
    updateTimeSort?: string;
}

// 用户信息入参
export interface UserParam {
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
    roles?: RoleParam[];
}

// 用户信息返参
export interface UserVO extends UserParam {
    createTime?: string;
    updateTime?: string;
}

