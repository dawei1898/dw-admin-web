import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    server: {
        // 设置本地启动的访问地址
        host: 'localhost',   // ip地址
        //port: env.VITE_PORT, // 端口号
        //port: 9110, // 端口号
        open: true,          // 启动后是否自动打开浏览器
        // 配置代理
        proxy: {
            '/dwa/api': {  // 拦截规则
                target: 'http://localhost:8010',   // 后端本地地址
                //changeOrigin: true,              // 是否允许跨域
                rewrite: (path) => path.replace(/^\/dwa\/api/, '')  // 重写路径，去除 /dwa/api 前缀
            },

        }
    }
})
