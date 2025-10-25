import React from 'react';
import {useMatches} from "react-router";
import {Breadcrumb} from "antd";



/**
 * 根据路由生成面包屑
 */
const Breadcrumbs = () => {

    const matches = useMatches();

    // matches 是一个数组，每个 match 包含： route, params, pathname, etc.
    const crumbs = matches
        .filter((match) => {
            // 只保留有 breadcrumb 定义的 route
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return match.handle?.breadcrumb != null;
        })
        .map((match, index) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const title: React.ReactNode  = match.handle!.breadcrumb;

            // 最后一个 item 不需要链接
            const isLast = index === matches.length - 2;

            return {
                key: match.pathname,
                title: title,
                href: isLast ? undefined :match.pathname,
            };
        });

    return <Breadcrumb items={crumbs} />;
};

export default Breadcrumbs;