import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createApp(App).mount('#app')
