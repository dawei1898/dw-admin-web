import {type User, USER_KEY} from "../types/auth.ts";
import {create} from "zustand";
import {persist} from "zustand/middleware";

type State = {
    user: User | null;
}

type Action = {
    setUser: (user: User | null) => void;
}

/**
 * 登录用户信息 全局状态管理
 */
export const useUserStore = create<State & Action>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: User | null) => set({user: user}),
        }),
        {
            name: USER_KEY, // 保存在 localStorage 中的 key
            partialize: (state) => ({
                user: state.user // 指定保存的字段
            }),
        }
    )
)