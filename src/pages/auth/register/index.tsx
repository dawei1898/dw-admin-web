import React from 'react';
import RegisterForm from "./RegisterForm.tsx";

/**
 * 注册页面
 */
const RegisterIndex = () => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-blue-50'>
            <div className='max-w-xl'>
                <RegisterForm/>
            </div>
        </div>
    );
};

export default RegisterIndex;