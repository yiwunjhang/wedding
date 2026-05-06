<template>
  <div class="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-1">
    <span class="text-xs text-white rounded-full px-2 py-0.5 shadow" style="background:#B1C97A80">
      {{ isPlaying ? '♪ 播放中' : '背景音樂' }}
    </span>
    <button
      @click="togglePlay"
      class="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      :class="isPlaying ? 'ring-2 ring-offset-2' : ''"
      style="background: #B1C97A; ring-color: #B1C97A"
      :title="isPlaying ? '暫停音樂' : '播放音樂'"
    >
      <MusicalNoteIcon v-if="!isPlaying" class="w-6 h-6 text-white" />
      <PauseIcon v-else class="w-6 h-6 text-white" />
    </button>
  </div>

  <audio ref="audio" loop :src="musicSrc" />
</template>

<script setup>
import { ref } from 'vue'
import { MusicalNoteIcon, PauseIcon } from '@heroicons/vue/24/outline'
import musicSrc from '@/assets/music/Japanese R&B.mp3'

const isPlaying = ref(false)
const audio = ref(null)

function togglePlay() {
  if (!audio.value) return
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
  isPlaying.value = !isPlaying.value
}
</script>
