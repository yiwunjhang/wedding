import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

const loading = document.getElementById('loading')
if (loading) {
  loading.classList.add('done')
  loading.addEventListener('transitionend', () => loading.remove(), { once: true })
}
