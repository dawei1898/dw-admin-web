import React, {useState} from 'react';
import {
    ProConfigProvider,
    ProLayout,
    PageContainer,
} from "@ant-design/pro-components";
import {theme} from "antd";
import Logo from "../../components/Logo.tsx";
import UserDropMenu from "./UserDropMenu.tsx";
import LogoTitle from "../../components/LogoTitle.tsx";
import {useThemeStore} from "../../stores/themeStore.ts";
import HeaderActions from "../../components/HeaderActions.tsx";
import Menus from "../../components/Menus.tsx";
import {Outlet} from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";


const {useToken} = theme;



/**
 * 网站布局
 */
const HomeLayout = () => {
    const {token} = useToken();
    const {dark} = useThemeStore();
    const [pathname, setPathname] = useState('/')

    return (
        <div>
            <ProConfigProvider
                hashed={false}
                dark={dark}
            >
                <ProLayout
                    token={{
                        colorPrimary: '#1677ff', // 品牌色
                        pageContainer: {
                            paddingInlinePageContainerContent: 40, // page左右内距
                            paddingBlockPageContainerContent: 30, // page上下内距
                        }
                    }}
                    locale={'zh-CN'}
                    layout='mix' // 布局模式
                    siderWidth={220} // 侧边栏宽度
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

                    // pure={false} // 是否删除默认布局
                    // navTheme={dark ? 'realDark' : 'light'} // 主题样式
                    //  {...defaultProps}
                    //  location={{ pathname, }}
                    //  splitMenus={true} // 分割菜单
                    /* headerContentRender={(props) => {
                       // 顶部面包屑
                        return <ProBreadcrumb/>
                    }} */
                    /* menuItemRender={(item, dom) => {
                        return <div onClick={() => {setPathname(item.path as string || '/')}}>
                            <Link to={item.path as string || '/'}>
                                {dom}
                            </Link>
                        </div>
                    }} */
                >
                    {/* 路由切入点 */}
                    <Outlet/>

                </ProLayout>
            </ProConfigProvider>
        </div>
    );
};

export default HomeLayout;