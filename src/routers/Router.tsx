import {createBrowserRouter, useRouteError} from "react-router";
import App from "../App.tsx";

import NotFoundPage from "../pages/error/404/NotFound.tsx";
import ErrorPage from "../pages/error/500/Error.tsx";
import NotAuthorizedPage from "../pages/error/403/NotAuthorized.tsx";
import RegisterIndex from "../pages/auth/register";
import LoginIndex from "../pages/auth/login";
import HomeLayout from "../pages/home/HomeLayout.tsx";
import WorkbenchIndex from "../pages/dashboard/workbench/WorkbenchIndex.tsx";
import AnalysisIndex from "../pages/dashboard/analysis/AnalysisIndex.tsx";
import HomeIndex from "../pages/home/HomeIndex.tsx";
import UserManageIndex from "../pages/system/user";
import RoleManageIndex from "../pages/system/role/RoleManageIndex.tsx";
import ImageIndex from "../pages/file/ImageIndex.tsx";
import LoginLogIndex from "../pages/system/log/LoginLogIndex.tsx";


/**
 * 根据错误类型跳转到对应的页面
 */
function GeneralErrorBoundary() {
    const error: any = useRouteError();
    if (error.status === 403) {
        return <NotAuthorizedPage/>;
    } else if (error.status === 404) {
        return <NotFoundPage/>;
    } else {
        return <ErrorPage/>;
    }
}

/**
 * 页面路由
 */
const Router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        errorElement: <GeneralErrorBoundary/>,
        //handle: {breadcrumb: "首页"},
        children: [
            {
                index: true,
                Component: HomeIndex,
            },
            {
                path: "dashboard",
                handle: {breadcrumb: "控制台"},
                children: [
                    {
                        path: "workbench",
                        Component: WorkbenchIndex,
                        handle: {breadcrumb: "工作台"},
                    },
                    {
                        path: "analysis",
                        Component: AnalysisIndex,
                        handle: {breadcrumb: "分析页"},
                    },
                ]
            },
            {
                path: "system",
                handle: {breadcrumb: "系统管理"},
                children: [
                    {
                        path: "user",
                        Component: UserManageIndex,
                        handle: {breadcrumb: "用户管理"},
                    },
                    {
                        path: "role",
                        Component: RoleManageIndex,
                        handle: {breadcrumb: "角色管理"},
                    },
                    {
                        path: "log",
                        handle: {breadcrumb: "日志管理"},
                        children: [
                            {
                                path: "login",
                                Component: LoginLogIndex,
                                handle: {breadcrumb: "登录日志"},
                            },
                        ]
                    },
                ]
            },
            {
                path: "file",
                handle: {breadcrumb: "文件管理"},
                children: [
                     {
                         path: "image",
                         Component: ImageIndex,
                         handle: {breadcrumb: "图片管理"},
                     }
                ]
            }
        ]
    },
    {
        path: "/error",
        children: [
            {
                path: "403",
                Component: NotAuthorizedPage,
            },
            {
                path: "404",
                Component: NotFoundPage,
            },
            {
                path: "500",
                Component: ErrorPage,
            }
        ]
    },
    {
        path: "/home",
        element: <App/>,
    },
    {
        path: "/login",
        Component: LoginIndex,
    },
    {
        path: "/register",
        Component: RegisterIndex,
    }

])

export default Router