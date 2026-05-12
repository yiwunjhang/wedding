import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'

history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createApp(App).use(router).mount('#app')
