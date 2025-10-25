import React, {useState} from 'react';
import {ProCard, ProConfigProvider, ProLayout, PageContainer} from "@ant-design/pro-components";
import {Button, Flex, theme} from "antd";
import Logo from "../../components/Logo.tsx";
import UserDropMenu from "./UserDropMenu.tsx";
import LogoTitle from "../../components/LogoTitle.tsx";
import {useThemeStore} from "../../stores/themeStore.ts";
import HeaderActions from "../../components/HeaderActions.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Menus from "../../components/Menus.tsx";


const {useToken} = theme;



/**
 * 网站布局
 */
const HomeLayout = () => {
    const {token} = useToken();
    const {theme, dark} = useThemeStore();



    return (
        <div>
            <ProConfigProvider
                hashed={false}
                dark={dark}
            >
                <ProLayout
                    token={{
                        pageContainer: {
                            paddingInlinePageContainerContent: 20, // page左右内距
                            paddingBlockPageContainerContent: 50, // page上下内距
                        }
                    }}
                    pure={false} // 是否删除默认布局
                    //navTheme={dark ? 'realDark' : 'light'}
                    layout='mix'
                    siderWidth={220}
                    logo={<Logo/>}
                    headerTitleRender={(logo, title, props) => {
                        return <LogoTitle/>
                    }}
                    actionsRender={(props) => {
                        return <HeaderActions props={props}/>
                    }}
                    avatarProps={{
                        render: (props, dom) => {
                            return <UserDropMenu/>
                        }
                    }}
                    menuContentRender={(props) => {
                        return <Menus/>
                    }}

                >

                    <PageContainer
                        className='px-4'
                        breadcrumbRender={(route) => {
                            return <Breadcrumbs/>
                        }}
                        //title="页面标题"
                        //subTitle="简单的描述"
                        /*extra={[
                            <Button key="3">操作</Button>,
                            <Button key="2">操作</Button>,
                            <Button
                                key="1"
                                type="primary"
                                onClick={() => {
                                    setNum(num > 0 ? 0 : 40);
                                }}
                            >
                                主操作
                            </Button>,
                        ]}*/

                        /*footer={[
                            <Button key="3">重置</Button>,

                        ]}*/

                    >
                        <ProCard
                            style={{
                                height: '20vh',
                                minHeight: 100,
                            }}
                        >
                            <div />
                        </ProCard>

                        <ProCard
                            style={{
                                height: '80vh',
                                minHeight: 100,
                            }}
                        >
                            <div />
                        </ProCard>
                    </PageContainer>

                </ProLayout>
            </ProConfigProvider>
        </div>
    );
};

export default HomeLayout;