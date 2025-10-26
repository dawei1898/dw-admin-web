import {DesktopOutlined} from "@ant-design/icons";
import React from "react";

/**
 * 路由菜单配置
 */
export default {
    route: {
        path: '/',
        name: '首页',
        component: '../pages/home/HomeLayout.tsx',
        routes: [
            {
                path: '/dashboard',
                name: '控制台',
                icon: <DesktopOutlined/>,
                access: 'canAdmin', // 访问权限
                routes: [
                    {
                        path: '/dashboard/workbench',
                        name: '工作台',
                        component: '../pages/dashboard/workbench/WorkbenchIndex.tsx',
                    },
                    {
                        path: '/dashboard/analysis',
                        name: '分析页',
                        component: '../pages/dashboard/analysis/AnalysisIndex.tsx',
                    }
                ]
            },
            {
                path: '/home',
                name: 'home',
                component: '../App.tsx',
            },
            {
                path: '/error',
                name: '异常页',
                routes: [
                    {
                        path: '/error/403',
                        name: '403',
                        component: '../pages/error/403/NotAuthorized.tsx',
                    },
                    {
                        path: '/error/404',
                        name: '404',

                        component: '../pages/error/404/NotFound.tsx',
                    },
                    {
                        path: '/error/500',
                        name: '500',
                        component: '../pages/error/500/Error.tsx',
                    }
                ]
            },
            {
                path: './*',
                component: '../pages/error/404/NotFound.tsx',
            },
        ],
    },
    location: {
        pathname: '/',
    },
};
