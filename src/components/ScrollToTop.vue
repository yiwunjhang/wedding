<template>
  <transition name="fade-up">
    <button
      v-if="visible"
      @click="scrollToTop"
      class="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      style="background: #6E8F3C; box-shadow: 0 4px 16px rgba(110,143,60,0.45)"
      aria-label="回到頂部"
    >
      <ChevronUpIcon class="w-5 h-5 text-white" />
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
