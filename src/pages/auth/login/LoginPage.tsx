import React, {useState} from 'react';
import {Button, Card, Checkbox, Flex, Input, message, Space, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useAuth} from "../../../provider/AuthProvider.tsx";
import {Link, useNavigate} from "react-router";

/**
 * 登录页面
 */
const LoginPage = () => {

    const {login, isLogin} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * 处理登录操作
     */
    const handleLogin = async () => {
        try {
            setLoading(true)
            setError('')

            if (!username.trim()) {
                setError('请输入用户名')
                return
            }
            if (!password.trim()) {
                setError('请输入密码')
                return
            }

            await login(username, password)

            // 跳到首页
            console.log('跳到首页')
            navigate('/')

            /*if (isLogin) {
                // 跳到首页
                console.log('跳到首页')
                navigate('/')
            }*/
        } catch (e) {
            console.log('登录失败：', e)
            if (e instanceof Error) {
                message.error(e.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-slate-50'>
            <div className='max-w-sm'>
                <Card
                    style={ {
                        borderRadius: '1rem',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    }}
                    variant={'outlined'}
                >
                    <div>
                        <div className='pb-6 text-center space-y-3'>
                            <Typography.Title level={3} >
                                Dw Admin
                            </Typography.Title>
                            <Typography.Text type='secondary' strong>
                                请登录您的账号
                            </Typography.Text>
                        </div>

                        <form  className='space-y-6'>
                            <Input
                                size='large'
                                prefix={<UserOutlined/>}
                                placeholder='用户名: admin'
                                allowClear
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <Input.Password
                                size='large'
                                prefix={<LockOutlined />}
                                placeholder='密码: 123456'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <p className={'text-red-500'}>{error}</p>}

                            <Flex justify='space-between'>
                                <Space>
                                    <Checkbox
                                        value={ remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                    />
                                    <p>记住我</p>
                                </Space>
                                <p>忘记密码？</p>
                            </Flex>

                            <div className='mt-6'>
                                <Button
                                    block
                                    type='primary'
                                    size={'large'}
                                    loading={loading}
                                    onClick={handleLogin}
                                >
                                    登录
                                </Button>
                            </div>

                            <div className='text-center'>
                                <span>还没有账号？</span>
                                <Link to={'/register'}>
                                    <span>注册</span>
                                </Link>
                            </div>
                        </form>

                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;