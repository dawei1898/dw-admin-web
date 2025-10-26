import React from 'react';
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import {PageContainer} from "@ant-design/pro-components";

/**
 * 个人中心
 */
const PersonCenter = () => {
    return (
        <PageContainer
            breadcrumbRender={(route) => {
                return <Breadcrumbs/> // 面包屑
            }}
        >
            <p>个人中心</p>

        </PageContainer>
    );
};

export default PersonCenter;