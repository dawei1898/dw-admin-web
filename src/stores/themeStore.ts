import {create} from "zustand";
import {persist} from "zustand/middleware/persist";

type State = {
    light: boolean;
}

type Action = {
    changeLight: (change: boolean) => void;
}

/**
 * 主题配置 全局状态管理
 */
export const useThemeStore = create<State & Action>()(
    persist(
        (set) => ({
            light: true,
            changeLight: (newValue: boolean) => set({light: newValue}),
        }),
        {
            name: 'theme', // localStorage中的键名
            partialize: (state) => ({ // 只保存需要的字段
                light: state.light,
            })
        }
    )
)