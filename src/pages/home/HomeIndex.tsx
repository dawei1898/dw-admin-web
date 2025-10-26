import React from 'react';
import {PageContainer, ProCard} from "@ant-design/pro-components";

const HomeIndex = () => {
    return (
        <div>
            <PageContainer>
                <p>首页</p>
                <ProCard
                    style={{
                        height: '20vh',
                        minHeight: 100,
                    }}
                >
                    <div/>
                </ProCard>

                <ProCard
                    style={{
                        height: '80vh',
                        minHeight: 100,
                    }}
                >
                    <div/>
                </ProCard>
            </PageContainer>
        </div>
    );
};

export default HomeIndex;