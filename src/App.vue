<script setup>
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import BackgroundMusic from './components/BackgroundMusic.vue'
import SectionProgress from './components/SectionProgress.vue'
import ScrollToTop from './components/ScrollToTop.vue'

function dismissLoading() {
  const el = document.getElementById('loading')
  if (!el) return
  el.classList.add('done')
  el.addEventListener('transitionend', () => el.remove(), { once: true })
}

const router = useRouter()
router.afterEach(() => {
  nextTick(dismissLoading)
})
</script>

<template>
  <RouterView />
  <BackgroundMusic />
  <SectionProgress />
  <ScrollToTop />
</template>
