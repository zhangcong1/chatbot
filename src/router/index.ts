import { createRouter, createWebHistory } from 'vue-router'
// 可能是路径别名配置问题，尝试使用相对路径导入
import ChatBot from '@/views/chatbot/index.vue'

const routes = [{ path: '/:userKey', name: 'ChatBot', component: ChatBot }]

const router = createRouter({
  history: createWebHistory('/chatbot'),
  routes,
})

export default router
