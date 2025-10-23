import React, {useState} from 'react';
import {Link, useNavigate} from "react-router";
import {Card, Flex, message, theme, Form, Image} from "antd";
import {
    LoginForm, ProConfigProvider,
    ProFormCheckbox, ProFormText
} from "@ant-design/pro-components";

import {
    LockOutlined, UserOutlined
} from "@ant-design/icons";
import {useAuth} from "../../../provider/AuthProvider.tsx";
import type {LoginParam} from "../../../types/auth.ts";

const {useToken} = theme

/**
 * 登录页面
 */
const LoginForm2 = () => {

    const {token} = useToken();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {login} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);


    /**
     * 处理登录操作
     */
    const handleLogin = async (param: LoginParam) => {
        try {
            setLoading(true)

            await login(param)

            // 跳到首页
            console.log('跳到首页')
            navigate('/')
        } catch (e) {
            console.log('登录失败：', e)
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
                <LoginForm<LoginParam>
                    style={{}}
                    form={form}
                    logo={<div><Image src={'/log.svg'}/></div>}
                    title={<span className='text-blue-500'>DW Admin</span>}
                    subTitle={'一个简单易用的后台管理系统'}
                    actions={
                        <div className='text-center'>
                            <span>还没有账号？</span>
                            <Link to={'/register'}>
                                <span>注册</span>
                            </Link>
                        </div>
                    }
                    submitter={{searchConfig: {submitText: '登录'}}}
                    loading={loading}
                    onFinish={handleLogin}
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

                    <Flex justify='space-between' align='start'>
                        <ProFormCheckbox>
                            记住我
                        </ProFormCheckbox>
                        <a>忘记密码</a>
                    </Flex>

                </LoginForm>
            </Card>
        </ProConfigProvider>
    </>);
};

export default LoginForm2;