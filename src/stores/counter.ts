import { defineStore } from 'pinia'

// 定义一个名为 counter 的 store
const useCounterStore = defineStore('counter', {
    // 状态：存储数据
    state: () => ({
        count: 0
    }),
    // 获取器：计算属性
    getters: {
        doubleCount: (state) => state.count * 2
    },
    // 操作：修改状态的方法
    actions: {
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        }
    }
})

// 导出 store

export default useCounterStore