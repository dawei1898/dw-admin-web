import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Flex, Form, Input, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import type {UploadChangeParam, UploadFile} from "antd/es/upload/interface";

import {uploadFileAPI} from "../../apis/fileApi.ts";
import type {UserParam} from "../../types/users.ts";
import {getLoginUserAPI, updateUserAPI} from "../../apis/userApi.ts";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import {PageContainer} from "@ant-design/pro-components";


/**
 * 个人设置
 */
const PersonSettings = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        handleGetUserInfo()
    }, []);

    // 获取用户信息
    const handleGetUserInfo = async () => {
        getLoginUserAPI()
            .then(resp => {
                if (resp.code !== 200) {
                    messageApi.error(resp.message);
                    return
                }
                form.setFieldsValue(resp.data);

                setAvatarUrl(resp.data.avatarUrl!)
            }).catch(error => {
            messageApi.error(error.message);
        });
    }

    // 更新用户
    const handleUpdateUser = async (user: UserParam) => {
        if (user) {
            const resp = await updateUserAPI(user);
            if (resp.code !== 200) {
                messageApi.error(resp.message);
                return
            }
            messageApi.success('更新成功')
            await handleGetUserInfo()
        }
    }

    // 上传文件
    const handleUploadChange = async (uploadFile: UploadFile) => {
        if (uploadFile) {
            setLoading(true)
            //const file = uploadFile as FileType;
            const file = uploadFile.originFileObj as File;
            uploadFileAPI(file)
                .then(resp => {
                    if (resp.code !== 200) {
                        messageApi.error(resp.message);
                    } else {
                        const fileUrl = resp.data.url;
                        if (fileUrl) {
                            console.log('上传成功, url:', fileUrl)
                            form.setFieldsValue({avatarUrl: fileUrl});
                            setAvatarUrl(fileUrl)
                        }
                    }
                }).catch(error => {
                messageApi.error(error.message);
            }).finally(() => {
                setLoading(false)
            });
        }
    };

    /**
     * 上传展示头像
     */
    const AvatarUpload = () => {
        return (
            <Flex vertical align={'center'} gap={20} style={{width: 128}}>
                <Avatar
                    size={128}
                    src={avatarUrl}
                />
                <Upload
                    accept='image/*'
                    showUploadList={false}
                    beforeUpload={(file) => {
                        // 以 image/ 开头
                        if (file.type && file.type.startsWith('image/')) {
                            return true;
                        }
                        messageApi.error('请上传图片文件！');
                        return false
                    }}
                    onChange={async (info: UploadChangeParam<UploadFile>) => {
                        console.log('file info:', info)
                        const file = info.file;
                        if (file.status === 'uploading') {
                            await handleUploadChange(file)
                        }
                    }}
                >
                    <Button loading={loading}>
                        <UploadOutlined/>
                        更换头像
                    </Button>
                </Upload>
            </Flex>
        );
    };


    return (
        <PageContainer
            breadcrumbRender={(route) => {
                return <Breadcrumbs/> // 面包屑
            }}
        >
            {contextHolder}
            <div className='h-full p-6 flex flex-col gap-4'>
                <Card>
                    <div className='max-w-sm m-6'>
                        <Form
                            layout='vertical'
                            form={form}
                            onFinish={handleUpdateUser}
                        >
                            <Form.Item name='id' hidden/>

                            <Form.Item label="头像" name="avatarUrl">
                                <AvatarUpload/>
                            </Form.Item>

                            <Form.Item
                                label="用户名"
                                name="name"
                                rules={[{required: true, message: '请输入用户名'}]}
                            >
                                <Input disabled/>
                            </Form.Item>

                            <Form.Item
                                label='邮箱'
                                name='email'
                                rules={[{
                                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                    message: '请输入正确的邮箱'
                                }]}
                            >
                                <Input placeholder='请输入邮箱'/>
                            </Form.Item>

                            <Form.Item
                                label='手机'
                                name='phone'
                                rules={[{pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'}]}
                            >
                                <Input placeholder='请输入手机号'/>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    className='mt-6'
                                    type='primary'
                                    onClick={form.submit}
                                >
                                    更新基本信息
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </PageContainer>
    );
};

export default PersonSettings;