import React from 'react';
import {appConfig} from "../utils/appConfig.ts";

const Title = () => {
    return (
        <>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                 {appConfig.appName}
            </span>
        </>
    );
};

export default Title;