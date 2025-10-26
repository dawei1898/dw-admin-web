import React from 'react';
import Breadcrumbs from "../../../components/Breadcrumbs.tsx";
import {PageContainer} from "@ant-design/pro-components";
import UserManage from "./UserManage.tsx";

/**
 * 用户管理首页
 */
const UserManageIndex = () => {
    return (
        <div>
            <PageContainer
                // 面包屑
                breadcrumbRender={(route) => {
                    return <Breadcrumbs/>
                }}
            >
                <UserManage/>
            </PageContainer>
        </div>
    );
};

export default UserManageIndex;