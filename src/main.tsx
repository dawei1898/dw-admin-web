import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AuthProvider} from "./provider/AuthProvider.tsx";
import {RouterProvider} from "react-router";
import router from "./routers/Router.tsx";
import '@ant-design/v5-patch-for-react-19';  // 兼容 React 19
import './index.css'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </StrictMode>
)
