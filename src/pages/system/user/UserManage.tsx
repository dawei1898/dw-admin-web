import React, {useEffect, useRef, useState} from 'react';
import {type ActionType, type ProColumns, ProTable} from "@ant-design/pro-components";
import type {UserParam, UserVO} from "../../../types/users.ts";
import {Button, Divider, message, Popconfirm, Space, Table, type TablePaginationConfig} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteUserAPI} from "../../../apis/userApi.ts";
import {SORT_ASC, SORT_DESC} from "../../../types/constant.ts";
import AddUserForm from "./AddUserForm.tsx";





/**
 * 用户管理
 */
const UserManage = () => {
    const actionRef = useRef<ActionType>();


    /**
     * 查询用户列表
     */
    const handleRequest = async (params, sort, filter) => {
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

        const resp = await getUserList({
            ...params,
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

    // 删除用户
    const handleDelete = async (id: string) => {
        if (id) {
            const resp = await deleteUserAPI(id);
            if (resp.code === 200) {
                message.success('删除成功')
            } else {
                message.error(resp.message);
            }
        }
    }

    // 批量删除用户
    const handleBatchDelete = async (ids: string[]) => {
        if (ids && ids.length > 0) {
            try {
                for (const id of ids) {
                    const resp = await deleteUserAPI(id);
                    if (resp.code !== 200) {
                        message.error(resp.message);
                        return; // 如果出错可以提前返回，或者根据需求继续处理其他项
                    }
                }
                message.success('删除成功');
            } finally {

            }
        }
    };


    const columns: ProColumns<UserVO>[] = [
        {
            title: '用户名',
            dataIndex: 'name',
            tooltip: '用户登录账号',
            width: '15%',
            align: 'center',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: '20%',
            align: 'center',
        },
        {
            title: '手机',
            dataIndex: 'phone',
            width: '15%',
            align: 'center',
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
                    <div onClick={() => {
                        setOpenEdit(true)
                        editForm.setFieldsValue(record)
                    }}>
                        <a>编辑</a>
                    </div>

                    <Popconfirm
                        title='确定要删除该用户吗？'
                        onConfirm={async () => {
                            await handleDelete(record.id!)
                            await action?.reset()
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



    return (<>
        <ProTable<UserVO, UserParam>
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
                //selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT], // 择项下拉选项
                //defaultSelectedRowKeys: [],
                /*onChange: (selectedRowKeys, selectedRows: UserVO[]) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                }*/
            }}
            tableAlertRender={false} // 关闭多选项的选择结果
            headerTitle='用户列表'
            toolBarRender={(action, rows) => [
                <>{rows.selectedRowKeys?.length > 0 && (
                        <Popconfirm
                            title={`确定要删除这 ${rows?.selectedRowKeys?.length} 条数据吗？`}
                            onConfirm={async () => {
                                const ids = rows.selectedRows.map(r => r.id);
                                await handleBatchDelete(ids)
                                await action?.reset()
                            }}
                            disabled={!rows.selectedRowKeys?.length}
                        >
                            <Button type='primary' danger>
                                <DeleteOutlined/>
                                批量删除
                            </Button>
                        </Popconfirm>
                    )
                }</>,
                /*<Button type='primary' onClick={() => setOpenNew(true)}>
                    <PlusOutlined/>
                    添加
                </Button>,*/
                <AddUserForm reload={action?.reload}/>,

            ]}
            pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100, 200],
                showQuickJumper: true,
            }}
        />
    </>);
};

export default UserManage;