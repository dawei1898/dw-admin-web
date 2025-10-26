import React from 'react';
import {
    type ActionType,
    ModalForm,
    ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import {Button, Form, message} from "antd";
import type {UserParam} from "../../../types/users.ts";
import {PlusOutlined} from "@ant-design/icons";
import {saveUserAPI} from "../../../apis/userApi.ts";
import {getRoleListAPI, saveUserRoleAPI} from "../../../apis/roleApi.ts";
import {SORT_ASC, STATUS_ENABLED} from "../../../types/constant.ts";
import type {RoleParam} from "../../../types/roles.ts";

interface RoleOption extends RoleParam {
    label: string,
    value: string,
}


interface AddUserFormProps {
    reload?: ActionType['reload'];
}

/**
 * 新增用户弹框表单
 */
const AddUserForm = ({reload}: AddUserFormProps) => {

    const [form] = Form.useForm<UserParam>();
    const [messageApi, contextHolder] = message.useMessage();

    /**
     * 获取角色列表
     */
    const getRoleList = async () => {
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
     * 添加用户
     */
    const handleAddUser = async (user: UserParam) => {
        if (user) {
            // 新增用户
            const resp = await saveUserAPI(user);
            if (resp.code !== 200) {
                messageApi.error(resp.message);
                return
            }
            // 保存角色
            const resp2 = await saveUserRoleAPI({
                userId: resp.data,
                roles: user.roles || [],
            });
            if (resp2.code !== 200) {
                messageApi.error(resp2.message);
                return
            }
            messageApi.success('添加成功')

            await reload?.()
        }
    }

    return (<>
        {contextHolder}
        <ModalForm
            style={{padding: '20px 0'}}
            form={form}
            trigger={
                <Button type="primary">
                    <PlusOutlined/>
                    添加
                </Button>
            }
            title="添加新用户"
            width={500}
            layout="horizontal"
            labelCol={{span: 5}}
            wrapperCol={{span: 16}}
            modalProps={{
                okText: '添加',
                cancelText: '取消',
                destroyOnClose: true,
            }}
            onFinish={async (values) => {
                await handleAddUser(values)
                return true
            }}
        >
            <ProFormText
                colProps={{span: 24}}
                label='用户名'
                name='name'
                width='md'
                placeholder='请输入用户名'
                rules={[{required: true, message: '请输入用户名'}]}
            />
            <ProFormText
                label='密码'
                name='password'
                placeholder='请输入密码'
                fieldProps={{type: 'password'}}
                rules={[{required: true, min: 6, max: 15, message: '密码长度 6～15'}]}
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
                request={getRoleList}
                onChange={(value: string[], option: RoleOption[]) => {
                    // console.log('Select value:', value, ", option:", option)
                    form.setFieldValue('roles',
                        option.map(item => {
                            return {
                                roleCode: item.roleCode,
                                roleName: item.roleName
                            }
                        })
                    )
                }}
            />
        </ModalForm>
    </>);
};

export default AddUserForm;