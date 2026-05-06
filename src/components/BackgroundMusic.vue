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

  <iframe
    ref="ytPlayer"
    src="https://www.youtube.com/embed/Ae6YLY1b4IA?enablejsapi=1&loop=1&playlist=Ae6YLY1b4IA"
    allow="autoplay"
    style="position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;bottom:0;right:0;"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MusicalNoteIcon, PauseIcon } from '@heroicons/vue/24/outline'

const isPlaying = ref(false)
const ytPlayer = ref(null)

function send(func) {
  ytPlayer.value?.contentWindow.postMessage(
    JSON.stringify({ event: 'command', func, args: [] }),
    '*'
  )
}

function togglePlay() {
  if (isPlaying.value) {
    send('pauseVideo')
  } else {
    send('playVideo')
  }
  isPlaying.value = !isPlaying.value
}
</script>
