import React, {useEffect, useState} from 'react';
import {
    Button, Card,
    Divider, Flex, Input,
    message, Modal,
    Popconfirm,
    Space, Table,
    type TableColumnsType,
    type TablePaginationConfig,
    type TableProps, Tag
} from "antd";
import type {LoginLogSearchParam, LoginLogVO} from "../../../types/loginLog.ts";
import {deleteLoginLogAPI, getLoginLogListAPI} from "../../../apis/loginLogApi.ts";
import type {SorterResult} from "antd/es/table/interface";
import {SORT_ASC, SORT_DESC, STATUS_ENABLED} from "../../../types/constant.ts";
import {DeleteOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import Breadcrumbs from "../../../components/Breadcrumbs.tsx";


const initSearchParams = {
    pageNum: 1,
    pageSize: 10,
}

const initPagination = {
    current: 1,
    pageSize: 10,
}


/**
 * 登录日志页面
 */
const LoginLogIndex = () => {

    const [data, setData] = useState<LoginLogVO[]>([])
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<LoginLogSearchParam>(initSearchParams)
    const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination);


    /**
     * 初始化加载数据列表
     */
    useEffect(() => {
            getLoginLogList(searchParams)

        }, [searchParams.pageNum,
            searchParams.pageSize,
            searchParams.loginTimeSort]
    );


    // 获取数据列表
    const getLoginLogList = async (param: LoginLogSearchParam) => {
        try {
            setLoading(true)

            const resp = await getLoginLogListAPI(param);
            if (resp.code !== 200) {
                message.error(resp.message);
                return;
            }
            setData(resp.data.list);
            setPagination((pre) => ({
                ...pre,
                current: resp.data.pageNum,
                pageSize: resp.data.pageSize,
                total: Number(resp.data.total),
            }))
        } finally {
            setLoading(false)
        }
    }

    // 重置搜索操作
    const handleReset = async () => {
        setSearchParams(initSearchParams)
        setPagination(initPagination)
        await getLoginLogList(initSearchParams)
    }

    // 搜索操作
    const handleSearch = async () => {
        await getLoginLogList(searchParams)
    }

    // 处理单个删除
    const handleDelete = async (id: string) => {
        if (id) {
            const resp = await deleteLoginLogAPI(id);
            if (resp.code === 200) {
                message.success('删除成功')
            } else {
                message.error(resp.message);
            }
            await handleReset()
        }
    }

    // 处理批量删除
    const handleBatchDelete = async () => {
        if (selectedIds && selectedIds.length > 0) {
            try {
                for (const id of selectedIds) {
                    const resp = await deleteLoginLogAPI(id);
                    if (resp.code !== 200) {
                        message.error(resp.message);
                        return; // 如果出错可以提前返回，或者根据需求继续处理其他项
                    }
                }
                message.success('删除成功');
            } finally {
                setSelectedIds([])
                await handleReset();
            }
        }
    };


    // 选中的行数据
    const rowSelection: TableProps<LoginLogVO>['rowSelection'] = {
        columnWidth: 50,
        onChange: (selectedRowKeys: React.Key[], selectedRows: LoginLogVO[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedRows) {
                setSelectedIds(selectedRows.map((item) => item.id!))
            } else {
                setSelectedIds([])
            }

        },
    };

    // 处理选中项发生变化时的回调
    const handleChange: TableProps<LoginLogVO>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        let pageNum: number;
        let pageSize: number;
        let loginTimeSort: string = '';

        // 分页
        if (pagination) {
            setPagination((pre) => ({
                ...pre,
            }))
            pageNum = pagination.current || 1;
            pageSize = pagination.pageSize || 10;
        }

        // 排序
        if (sorter) {
            sorter = sorter as SorterResult<LoginLogVO>;
            // 排序字段
            const field = sorter.field;
            // 排序顺序 ascend 、 descend
            const order = sorter.order;
            // 登录时间排序
            if (field === 'loginTime') {
                loginTimeSort = order === 'ascend' ? SORT_ASC : SORT_DESC
            }
        }

        setSearchParams((pre) => ({
            ...pre,
            pageNum,
            pageSize,
            loginTimeSort,
        }))
    };

    /**
     * 表头
     */
    const columns: TableColumnsType<LoginLogVO> = [
        {
            title: '用户名',
            dataIndex: 'username',
            //width: '15%',
            align: 'center',
        },
        {
            title: '登录 IP',
            dataIndex: 'ipAddr',
            align: 'center',
        },
        {
            title: '登录地点',
            dataIndex: 'loginLocation',
            align: 'center',
        },
        {
            title: '操作系统',
            dataIndex: 'os',
            align: 'center',
        },
        {
            title: '浏览器',
            dataIndex: 'browser',
            align: 'center',
        },
        {
            title: '登录状态',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => (
                <Tag
                    key={record.id}
                    color={record.status === 'success' ? 'success' : 'error'}
                >
                    {record.status === 'success' ? '登录成功' : '登录失败'}
                </Tag>
            )
        },
        {
            title: '登录时间',
            dataIndex: 'loginTime',
            sorter: true,
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) => (
                <Space split={<Divider type="vertical"/>}>
                    <Popconfirm
                        title='确定要删除该吗？'
                        onConfirm={() => handleDelete(record.id!)}
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
            ),
        },
    ]

    return (
        <div>
            {/* 面包屑 */}
            <Breadcrumbs/>

            {/* 登录日志列表 */}
            <div className='h-full p-6 flex flex-col gap-4'>
                <Card>
                    <Flex justify='space-between'>
                        <Space size={30}>
                            <Space>
                                <span>用户名:</span>
                                <Input
                                    placeholder='用户名'
                                    value={searchParams.username}
                                    onChange={(e) => {
                                        setSearchParams((pre) => ({
                                            ...pre,
                                            username: e.target.value,
                                        }))
                                    }}
                                />
                            </Space>

                            <Space>
                                <span>登录IP:</span>
                                <Input
                                    placeholder='登录IP'
                                    value={searchParams.ipAddr}
                                    onChange={(e) => {
                                        setSearchParams((pre) => ({
                                            ...pre,
                                            ipAddr: e.target.value,
                                        }))
                                    }}
                                />
                            </Space>
                        </Space>

                        <Space>
                            <Button onClick={handleReset}>
                                <ReloadOutlined/>
                                重置
                            </Button>
                            <Button type='primary' onClick={handleSearch}>
                                <SearchOutlined/>
                                搜索
                            </Button>
                        </Space>

                    </Flex>
                </Card>

                <Card>


                    <Flex vertical gap={20}>
                        <Flex justify='end' gap={8}>
                            <Button
                                type='primary'
                                danger
                                disabled={selectedIds.length < 1}
                                onClick={() => {
                                    Modal.confirm({
                                        title: '删除登录日志',
                                        content: '此操作将永久删除这些数据，是否继续？',
                                        okText: '删除',
                                        okButtonProps: {
                                            danger: true,
                                        },
                                        onOk: handleBatchDelete,
                                    })
                                }}
                            >
                                <DeleteOutlined/>
                                批量删除
                            </Button>

                            {/*<Popconfirm
                                title={'确定要删除这些数据吗？'}
                                onConfirm={handleBatchDelete}
                                disabled={!selectedIds.length}
                            >
                                <Button type='primary' danger>
                                    <DeleteOutlined/>
                                    批量删除
                                </Button>
                            </Popconfirm>*/}
                        </Flex>

                        <Table
                            style={{height: '100%'}}
                            columns={columns}
                            rowKey={(record) => record.id!}
                            dataSource={data}
                            pagination={{
                                ...pagination,
                                showTotal: (total) => `共 ${total} 条数据`,
                                showSizeChanger: true,
                                showQuickJumper: true
                            }}
                            loading={loading}
                            rowSelection={rowSelection}
                            onChange={handleChange}
                        />
                    </Flex>
                </Card>
            </div>
        </div>
    );
};

export default LoginLogIndex;