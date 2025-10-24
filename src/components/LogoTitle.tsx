import React from 'react';
import Logo from "./Logo.tsx";
import Title from "./Title.tsx";
import {Flex} from "antd";
import {Link} from "react-router";

const LogoTitle = () => {
    return (
        <Link to={'/'}>
            <Flex justify='start' align='center' gap={10}>
                <Logo/>
                <Title/>
            </Flex>
        </Link>
    );
};

export default LogoTitle;