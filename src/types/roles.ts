import type {PageParam} from "./index";


// 搜索角色入参
export interface RoleSearchParam extends PageParam {
    roleCode?: string;
    roleName?: string;
    status?: string;
    createTimeSort?: string;
    updateTimeSort?: string;
}

// 角色入参
export interface RoleParam {
    id?: string;
    roleCode: string;
    roleName: string;
    status?: string;
}

// 角色返参
export interface RoleVO extends RoleParam {
    createUser?: string;
    updateUser?: string;
    createTime?: string;
    updateTime?: string;
}

// 用户配置角色入参
export interface UserRoleParam {
    userId: string;
    roles: RoleParam[];
}