import React from 'react';
import type {HeaderViewProps} from "@ant-design/pro-layout/es/components/Header";
import {Button} from "antd";
import {GithubFilled, MoonFilled, SunOutlined} from "@ant-design/icons";
import {useThemeStore} from "../stores/themeStore.ts";

interface HeaderActionsType {
    props: HeaderViewProps
}

/**
 * 顶部操作区
 */
const HeaderActions = (
    {props}: HeaderActionsType
) => {

    const {dark, toggleTheme} = useThemeStore();

    if (props.isMobile) return [];
    if (typeof window === 'undefined') return [];

    return [
        /* 亮暗模式切换 */
        <Button
            key='dark'
            type='text'
            shape='default'
            style={{padding: '0 6px'}}
            onClick={toggleTheme}
        >
            {dark ?
                <MoonFilled style={{fontSize: '18px'}}/>
                : <SunOutlined style={{fontSize: '18px'}}/>
            }
        </Button>,

        /* Github */
        <a
            key='github_link'
            href="https://github.com/dawei1898/dw-admin"
            target="_blank"
            className='flex justify-center items-center'
        >
            <Button
                key='github'
                type='text'
                shape='default'
                style={{padding: '0 6px'}}
            >
                <GithubFilled style={{fontSize: '18px'}}/>
            </Button>
        </a>,
    ];
};

export default HeaderActions;