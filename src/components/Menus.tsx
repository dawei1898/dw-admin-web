import React from 'react';
import {  Menu, type MenuProps} from "antd";
import {
    DesktopOutlined,
    FileOutlined,
    SettingOutlined,
    UserOutlined,
    WarningOutlined
} from "@ant-design/icons";
import {NavLink} from "react-router";




type MenuItem = Required<MenuProps>['items'][number];

/**
 * 菜单列表
 */
const items: MenuItem[] = [
    {
        key: '1',
        label: '控制台',
        icon: <DesktopOutlined/>,
        children: [
            {
                key: '1-1',
                label: <NavLink to="/dashboard/workbench">工作台</NavLink>,
            },
            {
                key: '1-2',
                label: <NavLink to="/dashboard/analysis">分析页</NavLink>,
            },
        ],
    },
    {
        key: '2',
        label: '系统管理',
        icon: <SettingOutlined/>,
        children: [
            {
                key: '2-1',
                label: <NavLink to="/system/user">用户管理</NavLink>,
            },
            {
                key: '2-2',
                label: <NavLink to="/system/role">角色管理</NavLink>,
            },
            {
                key: '2-3',
                label: '日志管理',
                children: [
                    {
                        key: '2-3-1',
                        label: <NavLink to="/system/log/login">登录日志</NavLink>,
                    },
                ],
            },
        ],
    },
    {
        key: '3',
        label: '文件管理',
        icon: <FileOutlined/>,
        children: [
            {
                key: '3-1',
                label: <NavLink to="/file/image"> 图片管理 </NavLink>,
            },
        ],
    },
    {
        key: '4',
        label: '个人页',
        icon: <UserOutlined/>,
        children: [
            {
                key: '4-1',
                label: <NavLink to="/person/center">个人中心</NavLink>,
            },
            {
                key: '4-2',
                label: <NavLink to="/person/settings">个人设置</NavLink>,
            },
        ],
    },
    {
        key: '5',
        label: '异常页',
        icon: <WarningOutlined/>,
        children: [
            {
                key: '5-1',
                label: <NavLink to="/error/403">403</NavLink>,
            },
            {
                key: '5-2',
                label: <NavLink to="/error/404">404</NavLink>,
            },
            {
                key: '5-3',
                label: <NavLink to="/error/500">500</NavLink>,
            },

        ],
    },
]

interface MenusType {

}

/**
 * 侧边栏菜单
 */
const Menus = () => {

    return (
        <Menu
            theme={'light'}
            mode="inline"
            items={items}
        />
    );
};

export default Menus;