<template>
  <nav class="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3">
    <button
      v-for="s in sections"
      :key="s.id"
      @click="scrollTo(s.id)"
      class="group relative flex items-center justify-end gap-2"
      :title="s.label"
    >
      <!-- Label tooltip -->
      <span
        class="absolute right-full mr-3 text-xs whitespace-nowrap px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none -translate-x-1 group-hover:translate-x-0"
        style="background: rgba(253,250,244,0.9); color:#4a3f2f; box-shadow: 0 2px 8px rgba(0,0,0,0.1)"
      >{{ s.label }}</span>

      <!-- Dot -->
      <span
        class="block rounded-full transition-all duration-300"
        :style="active === s.id
          ? 'width:10px; height:28px; background:#D4B87A'
          : 'width:10px; height:10px; background:rgba(74,63,47,0.25)'"
      />
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sections = [
  { id: 'hero',   label: '首頁' },
  { id: 'about',  label: '我們的故事' },
  { id: 'map',    label: '婚禮資訊' },
  { id: 'rsvp',  label: '出席確認' },
  { id: 'footer', label: '尾頁' },
]

const active = ref('hero')

function getActive() {
  const mid = window.innerHeight / 2
  let current = sections[0].id
  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (!el) continue
    const { top } = el.getBoundingClientRect()
    if (top <= mid) current = s.id
  }
  active.value = current
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  getActive()
  window.addEventListener('scroll', getActive, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', getActive))
</script>
