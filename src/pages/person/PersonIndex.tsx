import React from 'react';
import {Outlet} from "react-router";

/**
 * 个人页
 */
const PersonIndex = () => {
    return (
        <div>
            <p>个人页</p>
            {/* 路由切入点 */}
            <Outlet/>
        </div>
    );
};

export default PersonIndex;