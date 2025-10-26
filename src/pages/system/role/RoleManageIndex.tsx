import React, {useRef, useState} from 'react';
import Breadcrumbs from "../../../components/Breadcrumbs.tsx";
import {type ActionType, PageContainer, type ProColumns, ProTable} from "@ant-design/pro-components";
import type {UserParam, UserVO} from "../../../types/users.ts";
import {Button, Divider, message, Popconfirm, Space, Tag} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {SORT_ASC, SORT_DESC, STATUS_DISABLED, STATUS_ENABLED} from "../../../types/constant.ts";
import type {RoleVO} from "../../../types/roles.ts";
import {deleteRoleAPI, getRoleListAPI} from "../../../apis/roleApi.ts";
import EditRoleForm from "./EditRoleForm.tsx";
import AddRoleForm from "./AddRoleForm.tsx";

/**
 * 角色管理首页
 */
const RoleManageIndex = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const actionRef = useRef<ActionType>();
    const [openEdit, setOpenEdit] = useState(false)
    const [editRecord, setEditRecord] = useState<RoleVO>(null)


    /**
     * 查询角色列表
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

        let status = params.status;
        if (filter.status && filter.status.length > 0) {
            status = filter.status[0]
        }

        const resp = await getRoleListAPI({
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

    // 删除角色
    const handleDelete = async (id: string) => {
        if (id) {
            const resp = await deleteRoleAPI(id);
            if (resp.code === 200) {
                messageApi.success('删除成功')
            } else {
                messageApi.error(resp.message);
            }
        }
    }

    // 批量删除角色
    const handleBatchDelete = async (ids: string[]) => {
        if (ids && ids.length > 0) {
            try {
                for (const id of ids) {
                    const resp = await deleteRoleAPI(id);
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


    const columns: ProColumns<UserVO>[] = [
        {
            title: '角色码',
            dataIndex: 'roleCode',
            width: '20%',
            align: 'center',
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            width: '20%',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: '10%',
            align: 'center',
            valueType: 'select',
            valueEnum: {
                '1' : {text: '启用'},
                '0' : {text: '禁用'},
            },
            filters: [
                {
                    text: '启用',
                    value: STATUS_ENABLED,
                },
                {
                    text: '禁用',
                    value: STATUS_DISABLED,
                }
            ],
            render: (_, record) => (
                <Tag
                    key={record.id}
                    color={record.status === STATUS_ENABLED ? 'success' : 'error'}
                >
                    {record.status === STATUS_ENABLED ? '启用' : '禁用'}
                </Tag>
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
                    <div onClick={() => {
                        setEditRecord(record)
                        setOpenEdit(true)
                    }}>
                        <a>编辑</a>
                    </div>

                    <Popconfirm
                        title='确定要删除该角色吗？'
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
    
    return (
        <>
            {contextHolder}
            <PageContainer
                // 面包屑
                breadcrumbRender={(route) => {
                    return <Breadcrumbs/>
                }}
            >
                {/* 编辑角色框 */}
                <EditRoleForm
                    open={openEdit}
                    onOpen={setOpenEdit}
                    record={editRecord}
                    onFinish={async () => {
                        if (actionRef.current) {
                            await actionRef.current.reload()
                        }
                    }}
                />

                {/* 角色列表 */}
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
                    }}
                    tableAlertRender={false} // 关闭多选项的选择结果
                    headerTitle='角色列表'
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
                        <AddRoleForm onFinish={action?.reload}/>,

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

export default RoleManageIndex;