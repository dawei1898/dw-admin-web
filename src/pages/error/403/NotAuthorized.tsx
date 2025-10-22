import React from 'react';
import {Link} from "react-router";
import {Button, Result} from "antd";

const NotAuthorizedPage = () => {
    return (
        <Result
            status='403'
            title='not authorized'
            subTitle='您无权访问该网页！'
            extra={[
                <Link to={'/'}>
                    <Button type='primary'>
                        返回主页
                    </Button>
                </Link>
            ]}
        />
    );
};

export default NotAuthorizedPage;