import React from 'react';
import LoginForm2 from "./LoginForm2.tsx";


/**
 * 登录页面
 */
const LoginIndex = () => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-blue-50'>
            <div className='max-w-xl'>
                 <LoginForm2/>
            </div>
        </div>
    );
};

export default LoginIndex;