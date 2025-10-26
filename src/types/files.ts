import type {PageParam} from "./index";


// 搜索文件入参
export interface FileSearchParam extends PageParam {
    name?: string;
    type?: string;
    path?: string;
    createTimeSort?: string;
    updateTimeSort?: string;
}

// 文件入参
export interface FileParam {
    id?: string;
    name: string;
    type: string;
    size: string;
    path: string;
    url: string;

}

// 文件返参
export interface FileVO extends FileParam {
    createUser?: string;
    createTime?: string;
}

