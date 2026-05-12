import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import GalleryPage from './views/GalleryPage.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/gallery', component: GalleryPage },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
