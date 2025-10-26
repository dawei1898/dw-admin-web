import React, {useEffect, useState} from 'react';
import {Avatar, Button, Flex, Form, Input, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import type {UploadChangeParam, UploadFile} from "antd/es/upload/interface";

import {uploadFileAPI} from "../../apis/fileApi.ts";
import type {UserParam} from "../../types/users.ts";
import {getLoginUserAPI, updateUserAPI} from "../../apis/userApi.ts";



/**
 * 个人设置
 */
const PersonSettings = () => {

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
                    message.error(resp.message);
                    return
                }
                form.setFieldsValue(resp.data);

                setAvatarUrl(resp.data.avatarUrl!)
            }).catch(error => {
            message.error(error.message);
        });
    }

    // 更新用户
    const handleUpdateUser = async (user: UserParam) => {
        if (user) {
            const resp = await updateUserAPI(user);
            if (resp.code !== 200) {
                message.error(resp.message);
                return
            }
            message.success('更新成功')
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
                        message.error(resp.message);
                    } else {
                        const fileUrl = resp.data.url;
                        if (fileUrl) {
                            console.log('上传成功, url:', fileUrl)
                            form.setFieldsValue({avatarUrl: fileUrl});
                            setAvatarUrl(fileUrl)
                        }
                    }
                }).catch(error => {
                message.error(error.message);
            }).finally(() => {
                setLoading(false)
            });
        }
    };

    return (
        <div className='h-full p-6 flex flex-col gap-4'>
            <p>个人设置</p>
            <div className='max-w-sm'>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleUpdateUser}
                >
                    <Form.Item name='id' hidden />

                    <Form.Item
                        label="头像"
                        name="avatarUrl"
                    >
                        <Flex vertical align={'center'} gap={20} style={{width: 128}} >
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
                                    message.error('请上传图片文件！');
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
                    </Form.Item>

                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[{required: true, message: '请输入用户名'}]}
                    >
                        <Input  disabled/>
                    </Form.Item>

                    <Form.Item
                        label='邮箱'
                        name='email'
                        rules={[{type: 'email', message: '邮箱格式错误'}]}
                    >
                        <Input placeholder='邮箱'/>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' onClick={form.submit}>
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PersonSettings;