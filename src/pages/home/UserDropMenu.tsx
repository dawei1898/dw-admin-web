import React from 'react';
import {useAuth} from "../../provider/AuthProvider.tsx";
import {NavLink, useNavigate} from "react-router";
import {Avatar, Button, Dropdown, type MenuProps} from "antd";
import {LogoutOutlined} from "@ant-design/icons";



/**
 * 用户下拉菜单
 */
const UserDropMenu = () => {

    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }


    /**
     * 用户下拉菜单
     */
    const dropMenuItems: MenuProps['items'] = [
        {
            key: '1',
            label: <NavLink to="/person/center">个人中心</NavLink>,
        },
        {
            key: '2',
            label: <NavLink to="/person/settings">个人设置</NavLink>,
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            label: <div onClick={handleLogout}>退出登录</div>,
            icon: <LogoutOutlined />,
        },
    ];

    if (user) {
        return (
            <Dropdown menu={{items: dropMenuItems}}>
                <Button type={'text'} style={{padding: '20px 6px'}}>
                    <Avatar src={user?.avatarUrl}/>
                    <p>{user?.name}</p>
                </Button>
            </Dropdown>
        )
    }

    return  (
        <NavLink to={'/login'}>
            <Button type="primary">
                去登录
            </Button>
        </NavLink>
    );
};

export default UserDropMenu;