<template>
  <div class="relative overflow-hidden w-full h-full" :style="bgStyle">
    <div v-if="!loaded" class="absolute inset-0 shimmer" />
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="w-full h-full object-cover transition-opacity duration-500"
      :class="loaded ? 'opacity-100' : 'opacity-0'"
      @load="loaded = true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ src: String, alt: { type: String, default: '' } })

const loaded = ref(false)
const bgStyle = 'background:#ede8e0'
</script>

<style scoped>
.shimmer {
  background: linear-gradient(90deg, #ede8e0 25%, #e0d9ce 50%, #ede8e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
