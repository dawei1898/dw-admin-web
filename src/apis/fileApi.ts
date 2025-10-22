import {axioser} from "../utils/httpUtil.ts";
import type {ApiResponse, PageResult} from "../types";
import type {FileSearchParam, FileVO} from "../types/files.ts";


/**
 * 获取文件列表
 */
export function getFileListAPI(param: FileSearchParam) {
    return axioser.post<any, ApiResponse<PageResult<FileVO>>>('/file/list', param)
}


/**
 * 上传文件
 */
export function uploadFileAPI(file: File) {
    console.log('uploadFileAPI param:', file)
    const formData = new FormData();
    formData.append('file', file);

    return axioser.post<any, ApiResponse<FileVO>>('/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

/**
 * 删除文件
 */
export function deleteFileAPI(id: string) {
    return axioser.delete<any, ApiResponse<boolean>>('/file/delete/' + id)
}