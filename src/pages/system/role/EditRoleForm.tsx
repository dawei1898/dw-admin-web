import React, {useEffect, useState} from 'react';
import {
    ModalForm,
    ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import {Form, message} from "antd";
import { saveRoleAPI} from "../../../apis/roleApi.ts";
import {STATUS_DISABLED, STATUS_ENABLED} from "../../../types/constant.ts";
import type {RoleParam} from "../../../types/roles.ts";



interface EditRoleFormProps {
    open: boolean;
    onOpen: (open: boolean) => void;
    record: RoleParam | null;
    onFinish?: () => void;
}

/**
 * 编辑角色弹框表单
 */
const EditRoleForm = (
    {open = false, onOpen , record, onFinish}: EditRoleFormProps
) => {

    const [form] = Form.useForm<RoleParam>();
    const [messageApi, contextHolder] = message.useMessage();


    /**
     * 初始化角色信息
     */
    useEffect(() => {
        console.log("初始化编辑角色框")
        if (open) {
            // 打开弹框
            console.log("EditRoleForm init record:", record)
            if (record) {
                form.setFieldsValue(record);
            }
        } else {
            // 关闭弹框
            form.resetFields()
        }
    }, [open]);



    /**
     * 编辑角色
     */
    const handleEditRole = async (user: RoleParam) => {
        if (user) {
            // 保存角色
            const resp = await saveRoleAPI(user);
            if (resp.code !== 200) {
                messageApi.error(resp.message);
                return
            }
            messageApi.success('添加成功')

            // 回调，刷新角色列表
            await onFinish?.()
        }
    }

    return (<>
        {contextHolder}
        <ModalForm
            style={{padding: '20px 0'}}
            form={form}
            title="编辑角色"
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
                await handleEditRole(values)
                return true
            }}
        >
            <ProFormText name='id' hidden/>
            <ProFormText
                label='角色码'
                name='roleCode'
                disabled
                rules={[{required: true, message: '请输入角色码'}]}
            />
            <ProFormText
                label='角色名称'
                name='roleName'
                placeholder='请输入角色名称'
                rules={[{required: true, message: '请输入角色名称'}]}
            />
            <ProFormSelect
                label='状态'
                name='status'
                options={[
                    {
                        label: '启用',
                        value: STATUS_ENABLED,
                    },
                    {
                        label: '禁用',
                        value: STATUS_DISABLED,
                    }
                ]}
            />
        </ModalForm>
    </>);
};

export default EditRoleForm;