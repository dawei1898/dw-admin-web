import React, {useEffect, useState} from 'react';
import {
    type ActionType,
    ModalForm,
    ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import {Button, Form, message} from "antd";
import type {UserParam, UserVO} from "../../../types/users.ts";
import {PlusOutlined} from "@ant-design/icons";
import {saveUserAPI} from "../../../apis/userApi.ts";
import {getRoleListAPI, getUserRoleListAPI, saveUserRoleAPI} from "../../../apis/roleApi.ts";
import {SORT_ASC, STATUS_ENABLED} from "../../../types/constant.ts";
import type {RoleParam} from "../../../types/roles.ts";

interface RoleOption extends RoleParam {
    label: string,
    value: string,
}


interface EditUserFormProps {
    //trigger: React.ReactNode;
    open: boolean;
    onOpen: (open: boolean) => void;
    record?: UserParam | null;
    onFinish?: () => void;
}

/**
 * 编辑用户弹框表单
 */
const EditUserForm = (
    {open = false, onOpen , record, onFinish}: EditUserFormProps
) => {

    const [form] = Form.useForm<UserParam>();
    const [messageApi, contextHolder] = message.useMessage();


    /**
     * 初始化用户信息
     */
    useEffect(() => {
        console.log("初始化编辑用户框")
        if (open) {
            console.log("EditUserForm init record:", record)
            const userId = record?.id;
            if (userId) {
                // 查询用户已配置的角色
                getUserRoleListAPI(userId).then(resp => {
                    const option = resp.data.map(role => {
                        return {
                            label: role.roleName,
                            value: role.roleCode,
                            roleCode: role.roleCode,
                            roleName: role.roleName,
                        }
                    })
                    // 设置表单用户信息
                    record.roles = option
                    form.setFieldsValue(record);
                })
            }
        } else {
            // 关闭弹框
            form.resetFields()
        }
    }, [open]);



    /**
     * 初始化获取所有角色选项
     */
    const getAllRoleList = async () => {
        return await getRoleListAPI({
            pageNum: 1,
            pageSize: 100,
            status: STATUS_ENABLED,
            createTimeSort: SORT_ASC,
        }).then((resp) => {
            return resp.data.list.map(role => {
                return {
                    label: role.roleName,
                    value: role.roleCode,
                    roleCode: role.roleCode,
                    roleName: role.roleName,
                }
            })
        }).catch((e) => {
            messageApi.error(e.message)
            return []
        })
    }

    /**
     * 编辑用户
     */
    const handleEditUser = async (user: UserParam) => {
        if (user) {
            // 保存用户
            const resp = await saveUserAPI(user);
            if (resp.code !== 200) {
                messageApi.error(resp.message);
                return
            }
            // 保存角色
            const roles = user.roles?.map(role => {
                return {
                    roleCode: role.roleCode,
                    roleName: role.roleName
                }
            });
            const resp2 = await saveUserRoleAPI({
                userId: resp.data,
                roles: roles || [],
            });
            if (resp2.code !== 200) {
                messageApi.error(resp2.message);
                return
            }
            messageApi.success('添加成功')

            // 回调，刷新用户列表
            await onFinish?.()
        }
    }

    return (<>
        {contextHolder}
        <ModalForm
            style={{padding: '20px 0'}}
            form={form}
            //trigger={trigger}
            title="编辑用户"
            width={500}
            layout="horizontal"
            labelCol={{span: 5}}
            wrapperCol={{span: 16}}
            modalProps={{
                okText: '保存',
                cancelText: '取消',
                destroyOnHidden: true,
            }}
            open={open}
            onOpenChange={onOpen}
            onFinish={async (values) => {
                await handleEditUser(values)
                return true
            }}
        >
            <ProFormText name='id' hidden/>
            <ProFormText
                colProps={{span: 24}}
                label='用户名'
                name='name'
                width='md'
                placeholder='请输入用户名'
                rules={[{required: true, message: '请输入用户名'}]}
            />
            <ProFormText
                label='邮箱'
                name='email'
                width='md'
                placeholder='请输入邮箱'
                rules={[{
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '请输入正确的邮箱'
                }]}
            />
            <ProFormText
                label='手机号'
                name='phone'
                width='md'
                placeholder='请输入手机号'
                rules={[{pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'}]}
            />
            <ProFormSelect
                label='角色'
                name='roles'
                mode='multiple'
                request={getAllRoleList}
                onChange={(value: string[], option) => {
                    // console.log('Select value:', value, ", option:", option)
                    form.setFieldValue('roles', option)
                }}
            />
        </ModalForm>
    </>);
};

export default EditUserForm;