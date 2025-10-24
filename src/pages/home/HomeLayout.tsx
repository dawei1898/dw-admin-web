import React from 'react';
import {ProConfigProvider, ProLayout} from "@ant-design/pro-components";
import {Button, Flex, theme} from "antd";
import Logo from "../../components/Logo.tsx";
import UserDropMenu from "./UserDropMenu.tsx";
import LogoTitle from "../../components/LogoTitle.tsx";
import {useThemeStore} from "../../stores/themeStore.ts";
import HeaderActions from "../../components/HeaderActions.tsx";


const {useToken} = theme;



/**
 * 网站布局
 */
const HomeLayout = () => {
    const {token} = useToken();
    const {theme, dark} = useThemeStore();



    return (
        <div>
            <ProConfigProvider hashed={false}>
                <ProLayout
                    pure={false} // 是否删除默认布局
                    navTheme={dark ? 'realDark' : 'light'}
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
                >
                    <div>
                        <h1>HomeLayout</h1>
                    </div>
                </ProLayout>
            </ProConfigProvider>
        </div>
    );
};

export default HomeLayout;