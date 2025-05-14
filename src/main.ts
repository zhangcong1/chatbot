import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index'
import router from './router'
import SvgIcon from './components/SvgIcon.vue'
import '@/assets/styles/index.less'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
