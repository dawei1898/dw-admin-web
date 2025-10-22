import type {PageParam} from "./index";


// 搜索文件入参
export interface FileSearchParam extends PageParam {
    fileName?: string;
    createTimeSort?: string;
}

// 文件入参
export interface FileParam {
    fileId?: string;
    fileName: string;
    fileType: string;
    filePath: string;
    fileUrl: string;
}

// 文件返参
export interface FileVO extends FileParam {
    createUser?: string;
    createTime?: string;
}

