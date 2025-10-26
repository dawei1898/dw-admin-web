import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Divider, Image,
    message,
    Popconfirm,
    Space,
    Tag,
} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteFileAPI, getFileListAPI} from "../../apis/fileApi.ts";
import {
    SORT_ASC, SORT_DESC, STATUS_DISABLED, STATUS_ENABLED,
} from "../../types/constant.ts";
import {
    type ActionType, PageContainer, type ProColumns, ProTable
} from "@ant-design/pro-components";
import type {UserParam, UserVO} from "../../types/users.ts";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import AddRoleForm from "../system/role/AddRoleForm.tsx";
import type {FileParam, FileVO} from "../../types/files.ts";

 

/**
 * 图片管理
 */
const ImageIndex = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const actionRef = useRef<ActionType | null>(null);


    /**
     * 查询图片列表
     */
    const handleRequest = async (params: any, sort: any, filter: any) => {
        console.log("request params:", params, ", sort: ", sort, ", filter: ", filter)

        let createTimeSort = '';
        let updateTimeSort = '';
        if (sort.createTime === "ascend") {
            createTimeSort = SORT_ASC;
        } else if (sort.createTime === "descend") {
            createTimeSort = SORT_DESC;
        }
        if (sort.updateTime === "ascend") {
            updateTimeSort = SORT_ASC;
        } else if (sort.updateTime === "descend") {
            updateTimeSort = SORT_DESC;
        }

        let status = params.status;
        if (filter.status && filter.status.length > 0) {
            status = filter.status[0]
        }

        const resp = await getFileListAPI({
            ...params,
            status: status,
            pageNum: params.current,
            pageSize: params.pageSize,
            createTimeSort,
            updateTimeSort,
        });
        //console.log("getUserList:", JSON.stringify(resp))
        return {
            success: resp?.code === 200,
            data: resp?.data?.list,
            total: resp?.data?.total,
        };

    };

    // 删除图片
    const handleDelete = async (id: string) => {
        if (id) {
            const resp = await deleteFileAPI(id);
            if (resp.code === 200) {
                messageApi.success('删除成功')
            } else {
                messageApi.error(resp.message);
            }
        }
    }

    // 批量删除图片
    const handleBatchDelete = async (ids: string[]) => {
        if (ids && ids.length > 0) {
            try {
                for (const id of ids) {
                    const resp = await deleteFileAPI(id);
                    if (resp.code !== 200) {
                        messageApi.error(resp.message);
                        return; // 如果出错可以提前返回，或者根据需求继续处理其他项
                    }
                }
                messageApi.success('删除成功');
            } finally {

            }
        }
    };

    const columns: ProColumns<FileVO>[] = [
        {
            title: '文件ID',
            dataIndex: 'id',
            align: 'center',
            hideInSearch: true,
        },
        {
            title: '文件名称',
            dataIndex: 'name',
            //width: '20%',
            align: 'center',
        },
        {
            title: '文件类型',
            dataIndex: 'type',
            align: 'center',
        },
        {
            title: '文件路径',
            dataIndex: 'path',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '图片预览',
            dataIndex: 'fileUrl',
            align: 'center',
            hideInSearch: true,
            render: (_, record) => (
                <Image width={100} src={record.url}/>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            sorter: true,
            hideInSearch: true,
            align: 'center',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            sorter: true,
            hideInSearch: true,
            hideInForm: true,
            align: 'center',
        },
        {
            title: '操作',
            valueType: 'option',
            align: 'center',
            render: (text, record, _, action) => (

                <Space split={<Divider type="vertical"/>}>
                    <Popconfirm
                        title='确定要删除该图片吗？'
                        onConfirm={async () => {
                            await handleDelete(record.id!)
                            if (action) {
                                action.reset?.()
                            }
                        }}
                    >
                        <Button
                            style={{padding: 0}}
                            type='link'
                            size='small'
                            danger
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </Space>

            )
        },
    ]

    return (
        <>
            {contextHolder}
            <PageContainer
                // 面包屑
                breadcrumbRender={(route) => {
                    return <Breadcrumbs/>
                }}
            >
                {/* 图片列表 */}
                <ProTable<FileVO, FileParam>
                    actionRef={actionRef}
                    columns={columns}
                    rowKey={(record) => record.id!}
                    request={handleRequest}
                    search={{
                        defaultCollapsed: false,
                        resetText: "重置",
                        searchText: "搜索",
                    }}
                    rowSelection={{
                        columnWidth: 50,
                    }}
                    tableAlertRender={false} // 关闭多选项的选择结果
                    headerTitle='图片列表'
                    toolBarRender={(action, rows) => [
                        <Popconfirm
                            title={`确定要删除这 ${rows?.selectedRowKeys?.length} 条数据吗？`}
                            onConfirm={async () => {
                                const ids = rows?.selectedRows?.map(r => r.id || '') || [];
                                await handleBatchDelete(ids)
                                if (action) {
                                    action.reset?.()
                                }
                            }}
                            disabled={!rows.selectedRowKeys?.length}
                        >
                            <Button type='primary' danger>
                                <DeleteOutlined/>
                                批量删除
                            </Button>
                        </Popconfirm>,


                    ]}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: [10, 20, 50, 100, 200],
                        showQuickJumper: true,
                    }}
                />
            </PageContainer>
        </>
    );
};

export default ImageIndex;