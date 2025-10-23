import React, {useState} from 'react';
import {Link, useNavigate} from "react-router";
import {Card, message, theme, Form, Image} from "antd";
import {
    LoginForm, ProConfigProvider,
    ProFormText
} from "@ant-design/pro-components";

import {
    LockOutlined, UserOutlined
} from "@ant-design/icons";
import {useAuth} from "../../../provider/AuthProvider.tsx";
import type {RegisterParam} from "../../../types/auth.ts";

const {useToken} = theme

/**
 * 注册组件
 */
const RegisterForm = () => {

    const {token} = useToken();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {register} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);


    /**
     * 处理注册操作
     */
    const handleRegister = async (param: RegisterParam) => {
        try {
            setLoading(true)

            await register(param)

            console.log('注册成功，跳到登录页')
            message.success('注册成功')
            navigate('/login')
        } catch (e) {
            console.log('注册失败：', e)
            if (e instanceof Error) {
                message.error(e.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (<>

        <ProConfigProvider hashed={false}>
            <Card
                style={{
                    borderRadius: '1rem',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    backgroundColor: token.colorBgContainer
                }}
                variant={'outlined'}
            >
                <LoginForm<RegisterParam>
                    style={{}}
                    form={form}
                    logo={<div><Image src={'/log.svg'}/></div>}
                    title={<span className='text-blue-500'>DW Admin</span>}
                    subTitle={'一个简单易用的后台管理系统'}
                    actions={
                        <div className='text-center'>
                            <span>已有账号？</span>
                            <Link to={'/login'}>
                                <span>去登录</span>
                            </Link>
                        </div>
                    }
                    submitter={{searchConfig: {submitText: '注册'}}}
                    loading={loading}
                    onFinish={handleRegister}
                >
                    <ProFormText
                        name='username'
                        placeholder='用户名: admin'
                        allowClear
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined style={{marginRight: 10}}/>,
                        }}
                        rules={[{required: true, message: '请输入用户名'}]}
                    />


                    <ProFormText.Password
                        name='password'
                        placeholder='密码: 123456'
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined style={{marginRight: 10}}/>,
                        }}
                        rules={[{
                            required: true,
                            min: 6,
                            max: 15,
                            message: '密码长度在 6-15 之间'
                        }]}
                    />

                    <ProFormText.Password
                        name='confirmPassword'
                        placeholder='确认密码'
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined style={{marginRight: 10}}/>,
                        }}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                validator: (_, value) => {
                                    // 密码长度在 6-15 之间
                                    if (!value || value.length < 6 || value.length > 15) {
                                        return Promise.reject(new Error('密码长度在 6-15 之间'));
                                    }

                                    if (form.getFieldValue('password') !== value) {
                                        return Promise.reject(new Error('两次输入的密码不一致'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    />
                </LoginForm>
            </Card>
        </ProConfigProvider>

    </>);
};

export default RegisterForm;