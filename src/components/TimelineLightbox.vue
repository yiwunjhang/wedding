<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="visible"
        class="fixed inset-0 z-[200] flex items-center justify-center"
        @click.self="close"
      >
        <!-- Overlay -->
        <div class="absolute inset-0" style="background: rgba(253,250,244,0.93); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px)" @click="close" />

        <!-- Panel -->
        <div class="panel relative z-10 w-full max-w-2xl mx-4">
          <!-- Close -->
          <button
            @click="close"
            class="close-btn absolute -top-5 right-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-200"
          >
            <XMarkIcon class="close-icon w-5 h-5 text-stone-500" />
          </button>

          <!-- Header -->
          <div class="text-center mb-4">
            <p class="text-xs tracking-widest mb-1" style="color:#D4B87A">{{ event?.year }}</p>
            <h3 class="font-serif text-xl" style="color:#4a3f2f">{{ event?.title }}</h3>
          </div>

          <!-- Photo -->
          <div class="relative rounded-2xl overflow-hidden" style="aspect-ratio:4/3; background:#e8e0d0">
            <template v-if="photos.length">
              <Transition :name="direction === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
                <img
                  :key="current"
                  :src="photos[current]"
                  class="w-full h-full object-contain"
                />
              </Transition>

              <!-- Prev -->
              <button
                v-if="photos.length > 1"
                @click="prev"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition"
                style="background: rgba(255,255,255,0.75); backdrop-filter: blur(4px)"
              >
                <ChevronLeftIcon class="w-6 h-6 text-stone-600" />
              </button>

              <!-- Next -->
              <button
                v-if="photos.length > 1"
                @click="next"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition"
                style="background: rgba(255,255,255,0.75); backdrop-filter: blur(4px)"
              >
                <ChevronRightIcon class="w-6 h-6 text-stone-600" />
              </button>

              <!-- Counter -->
              <div class="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full" style="background: rgba(255,250,244,0.85); color:#4a3f2f">
                {{ current + 1 }} / {{ photos.length }}
              </div>
            </template>

            <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2">
              <PhotoIcon class="w-12 h-12 opacity-25" style="color:#4a3f2f" />
              <p class="text-sm opacity-40" style="color:#4a3f2f">尚未上傳照片</p>
            </div>
          </div>

          <!-- Dots -->
          <div v-if="photos.length > 1" class="flex justify-center gap-2 mt-4">
            <button
              v-for="(_, i) in photos"
              :key="i"
              @click="jumpTo(i)"
              class="rounded-full transition-all duration-300"
              :style="i === current
                ? 'width:20px;height:8px;background:#D4B87A'
                : 'width:8px;height:8px;background:rgba(74,63,47,0.2)'"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  visible: Boolean,
  event: Object,
})
const emit = defineEmits(['close'])

const current = ref(0)
const direction = ref('next')

const photos = computed(() => props.event?.photos ?? [])

watch(() => props.visible, (val) => {
  if (val) {
    current.value = 0
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function close() { emit('close') }

function next() {
  direction.value = 'next'
  current.value = (current.value + 1) % photos.value.length
}

function prev() {
  direction.value = 'prev'
  current.value = (current.value - 1 + photos.value.length) % photos.value.length
}

function jumpTo(i) {
  direction.value = i > current.value ? 'next' : 'prev'
  current.value = i
}

function onKey(e) {
  if (!props.visible) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Overlay fade */
.lightbox-enter-active { transition: opacity 0.3s ease; }
.lightbox-leave-active { transition: opacity 0.25s ease; }
.lightbox-enter-from,
.lightbox-leave-to     { opacity: 0; }

/* Panel pop-up */
.lightbox-enter-active .panel { animation: panelIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.lightbox-leave-active .panel { animation: panelOut 0.2s ease forwards; }

@keyframes panelIn {
  from { opacity: 0; transform: scale(0.88) translateY(24px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes panelOut {
  from { opacity: 1; transform: scale(1) translateY(0); }
  to   { opacity: 0; transform: scale(0.92) translateY(12px); }
}

/* Photo slide */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from  { transform: translateX(48px); opacity: 0; }
.slide-left-leave-to    { transform: translateX(-48px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-48px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(48px); opacity: 0; }

/* Close button rotate on hover */
.close-btn { transition: background 0.2s ease; }
.close-icon { transition: transform 0.25s ease; }
.close-btn:hover .close-icon { transform: rotate(90deg); }
</style>
