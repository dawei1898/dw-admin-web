import {type LoginParam, type RegisterParam, type User} from "../types/auth.ts";
import {createContext, useContext, useState} from "react";
import {loginAPI, logoutAPI, registerAPI} from "../apis/authApi.ts";
import {getLoginUserAPI} from "../apis/userApi.ts";
import {useUserStore} from "../stores/userStore.ts";


interface AuthContextType {
    user: User | null;
    isLogin: boolean;
    loading: boolean;
    register: (param:  RegisterParam) => Promise<void>;
    login: (param: LoginParam) => Promise<void>;
    logout: () => Promise<void>;
    clearUser: () => void;
}

/**
 * 创建认证上下文
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 认证 Hook
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.log('useAuth must be used within an AuthProvider')
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


/**
 * 用户登录认证组件
 */
export const AuthProvider = (
    {children}: { children: React.ReactNode }
) => {

    const {user, setUser} = useUserStore();
    const [loading, setLoading] = useState(false)


    /**
     * 处理注册
     */
    const handleRegister = async (param:  RegisterParam) => {
        try {
            setLoading(true)

            const resp = await registerAPI(param);
            if (resp.code === 200) {
                console.log('注册成功')
            } else {
                throw new Error(resp.message);
            }
        } catch (e: any) {
            console.log('注册失败：', e)
            throw new Error(e.message);
        } finally {
            setLoading(false)
        }
    }

    /**
     * 处理登录
     */
    const handleLogin = async (param: LoginParam) => {
        try {
            setLoading(true)
            const resp = await loginAPI(param);
            if (resp.code === 200) {
                console.log('登录成功')
                const token = resp.data;

                const userInfo = {
                    name: '',
                    token: token,
                }
                setUser(userInfo)

                // 获取登录用户信息
                await getLoginUserAPI()
                    .then((resp) => {
                        if (resp.code !== 200) {
                            throw new Error(resp.message);
                        }
                        console.log('获取登录用户信息成功：', resp.data)
                        const userInfo = {
                            id: resp.data.id,
                            name: resp.data.name,
                            email: resp.data.email,
                            avatarUrl: resp.data.avatarUrl,
                            token: token,
                        }
                        setUser(userInfo)
                    })
            } else {
                throw new Error(resp.message);
            }
        } catch (e: any) {
            console.log('登录失败：', e)
            throw new Error(e.message);
        } finally {
            setLoading(false)
        }
    }

    /**
     * 处理登出
     */
    const handleLogout = async () => {
        try {
            setLoading(true)
            const resp = await logoutAPI();
            if (resp.code === 200) {
                console.log('登出成功')
            } else {
                throw new Error(resp.message);
            }
        } catch (e: any) {
            console.log('登出失败：', e)
            throw new Error(e.message);
        } finally {
            setLoading(false)
            handleClearUser()
        }
    }

    const handleClearUser = () => {
        setUser(null)
    }


    const value = {
        user,
        isLogin: !!user?.token,
        loading: loading,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        clearUser: handleClearUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


