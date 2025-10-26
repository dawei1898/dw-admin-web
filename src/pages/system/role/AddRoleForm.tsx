import React, {useState} from 'react';
import {
    ModalForm,
    ProFormText
} from "@ant-design/pro-components";
import {Button, Form, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {saveRoleAPI} from "../../../apis/roleApi.ts";
import type {RoleParam} from "../../../types/roles.ts";



interface AddRoleFormProps {
    onFinish?: () => void;
}

/**
 * 新增角色弹框表单
 */
const AddRoleForm = ({onFinish}: AddRoleFormProps) => {

    const [form] = Form.useForm<RoleParam>();
    const [messageApi, contextHolder] = message.useMessage();


    /**
     * 添加角色
     */
    const handleAddRole = async ( role: RoleParam) => {
        if ( role) {
            // 新增用户
            const resp = await saveRoleAPI(role);
            if (resp.code !== 200) {
                messageApi.error(resp.message);
                return
            }
            messageApi.success('添加成功')

            await onFinish?.()
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
            title="添加新角色"
            width={500}
            layout="horizontal"
            labelCol={{span: 5}}
            wrapperCol={{span: 16}}
            modalProps={{
                okText: '添加',
                cancelText: '取消',
                destroyOnHidden: true,
            }}
            onFinish={async (values) => {
                await handleAddRole(values)
                return true
            }}
        >
            <ProFormText
                label='角色码'
                name='roleCode'
                placeholder='请输入角色码'
                rules={[{required: true, message: '请输入角色码'}]}
            />
            <ProFormText
                label='角色名称'
                name='roleName'
                placeholder='请输入角色名称'
                rules={[{required: true, message: '请输入角色名称'}]}
            />
        </ModalForm>
    </>);
};

export default AddRoleForm;