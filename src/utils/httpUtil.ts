import axios from "axios";
import {TOKEN_KEY} from "../types/auth.ts";


/**
 * 创建实例
 */
export const axioser = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 60000
});


/**
 * 添加请求拦截器
 */
axioser.interceptors.request.use(
    // 拦截请求，增加token
    config => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            //console.log(`token : ${token}`)
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 添加响应拦截器
 */
axioser.interceptors.response.use(
    // 成功返回
    resp => {
        //console.log(`response: ${JSON.stringify(res.data)}`)
        if (resp.data.code === 401) {
            // 清楚 tokenn
            localStorage.removeItem(TOKEN_KEY)
            console.log('token失效，转跳到登录页')
            window.location.href = '/login'
        }

        return resp.data
    },
    // 错误返回
    error => {
        console.log(`response error: ${JSON.stringify(error)}`)
        return Promise.reject(error)
    }
)
