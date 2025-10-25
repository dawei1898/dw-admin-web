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
import {Outlet} from "react-router";


const {useToken} = theme;



/**
 * 网站布局
 */
const HomeLayout = () => {
    const {token} = useToken();
    const {dark} = useThemeStore();



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
                    // logo 标题
                    headerTitleRender={(logo, title, props) => {
                        return <LogoTitle/>
                    }}
                    // 顶部操作
                    actionsRender={(props) => {
                        return <HeaderActions props={props}/>
                    }}
                    // 用户头像
                    avatarProps={{
                        render: (props, dom) => {
                            return <UserDropMenu/>
                        }
                    }}
                    // 侧边栏菜单
                    menuContentRender={(props) => {
                        return <Menus/>
                    }}
                >

                    <PageContainer
                        // 面包屑
                        breadcrumbRender={(route) => {
                            return <Breadcrumbs/>
                        }}
                    >
                        {/* 路由切入点 */}
                        <Outlet/>
                    </PageContainer>

                </ProLayout>
            </ProConfigProvider>
        </div>
    );
};

export default HomeLayout;