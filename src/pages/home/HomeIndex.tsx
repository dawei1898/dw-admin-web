import React from 'react';
import {ProCard} from "@ant-design/pro-components";

const HomeIndex = () => {
    return (
        <div>
            <p>首页</p>
            <ProCard
                style={{
                    height: '20vh',
                    minHeight: 100,
                }}
            >
                <div />
            </ProCard>

            <ProCard
                style={{
                    height: '80vh',
                    minHeight: 100,
                }}
            >
                <div />
            </ProCard>
        </div>
    );
};

export default HomeIndex;