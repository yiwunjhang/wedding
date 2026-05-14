<template>
  <section id="moments" class="py-20 overflow-hidden" style="background-color: #fbfdf4">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div data-aos="fade-up" class="mb-10 text-center">
        <h3 class="section-title font-serif">相處時刻</h3>
        <p class="section-subtitle">OUR MOMENTS</p>
        <div class="flex items-center justify-center gap-3 mt-2">
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
          <span style="color:#D4B87A">✦</span>
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
        </div>
      </div>

      <!-- Tabs -->
      <div data-aos="fade-up" data-aos-delay="50" class="flex flex-col md:flex-row justify-center gap-3 mb-10">
        <button
          v-for="(group, i) in groups"
          :key="i"
          @click="switchGroup(i)"
          class="w-full md:w-auto px-6 py-3 rounded-[10px] text-sm font-medium tracking-wide transition-all duration-300"
          :style="activeGroup === i
            ? 'background:#D4B87A; color:#fff; box-shadow: 0 4px 14px rgba(212,184,122,0.4);'
            : 'background:rgba(212,184,122,0.12); color:#9a7d45;'"
        >
          <span class="block text-xs opacity-75 leading-none mb-0.5">{{ group.en }}</span>
          <span>{{ group.zh }}</span>
        </button>
      </div>

      <!-- Carousel -->
      <div data-aos="fade-up" data-aos-delay="100" class="relative max-w-3xl mx-auto">
        <Transition name="group-fade" mode="out-in">
          <div :key="activeGroup">

            <!-- No photos placeholder -->
            <div v-if="currentPhotos.length === 0"
                 class="rounded-3xl flex flex-col items-center justify-center gap-3 text-center"
                 style="aspect-ratio:4/3; background:#f0ece4;">
              <PhotoIcon class="w-12 h-12 opacity-20" style="color:#4a3f2f" />
              <p class="text-sm opacity-40" style="color:#4a3f2f">尚未加入照片</p>
            </div>

            <!-- Photo frame -->
            <template v-else>
              <div class="relative rounded-3xl overflow-hidden shadow-xl" style="aspect-ratio:4/3; background:#e8e0d0">
                <Transition :name="slideDirection === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
                  <img
                    :key="current"
                    :src="currentPhotos[current].src"
                    :alt="currentPhotos[current].caption"
                    decoding="async"
                    class="w-full h-full object-cover"
                  />
                </Transition>

                <!-- Caption -->
                <div v-if="currentPhotos[current].caption"
                     class="absolute bottom-0 left-0 right-0 px-6 py-4 text-sm text-white text-center"
                     style="background: linear-gradient(to top, rgba(74,63,47,0.7), transparent)">
                  {{ currentPhotos[current].caption }}
                </div>

                <!-- Prev -->
                <button
                  v-if="currentPhotos.length > 1"
                  @click="prev"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition hover:scale-110"
                  style="background: rgba(255,255,255,0.8); backdrop-filter: blur(4px)"
                >
                  <ChevronLeftIcon class="w-6 h-6" style="color:#4a3f2f" />
                </button>

                <!-- Next -->
                <button
                  v-if="currentPhotos.length > 1"
                  @click="next"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition hover:scale-110"
                  style="background: rgba(255,255,255,0.8); backdrop-filter: blur(4px)"
                >
                  <ChevronRightIcon class="w-6 h-6" style="color:#4a3f2f" />
                </button>

                <!-- Counter -->
                <div v-if="currentPhotos.length > 1"
                     class="absolute top-3 right-3 text-xs px-3 py-1 rounded-full"
                     style="background: rgba(255,250,244,0.85); color:#4a3f2f">
                  {{ current + 1 }} / {{ currentPhotos.length }}
                </div>
              </div>

              <!-- Dots -->
              <div v-if="currentPhotos.length > 1" class="flex justify-center gap-2 mt-5">
                <button
                  v-for="(_, i) in currentPhotos"
                  :key="i"
                  @click="jumpTo(i)"
                  class="rounded-full transition-all duration-300"
                  :style="i === current
                    ? 'width:24px;height:8px;background:#D4B87A'
                    : 'width:8px;height:8px;background:rgba(74,63,47,0.2)'"
                />
              </div>
            </template>

          </div>
        </Transition>

        <!-- 看更多 -->
        <div class="flex justify-center mt-6">
          <RouterLink
            to="/gallery"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-[10px] text-sm font-medium border transition-all duration-300 hover:shadow-md"
            style="border-color:#D4B87A; color:#9a7d45; background:rgba(212,184,122,0.08);"
          >
            <PhotoIcon class="w-4 h-4" />
            看更多照片
          </RouterLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import { groups } from '@/data/photos.js'

const activeGroup = ref(0)
const current = ref(0)
const slideDirection = ref('next')

const currentPhotos = computed(() => groups[activeGroup.value].photos.slice(0, 6))

function switchGroup(i) {
  if (i === activeGroup.value) return
  activeGroup.value = i
  current.value = 0
  slideDirection.value = 'next'
}

function next() {
  slideDirection.value = 'next'
  current.value = (current.value + 1) % currentPhotos.value.length
}

function prev() {
  slideDirection.value = 'prev'
  current.value = (current.value - 1 + currentPhotos.value.length) % currentPhotos.value.length
}

function jumpTo(i) {
  slideDirection.value = i > current.value ? 'next' : 'prev'
  current.value = i
}

function onKey(e) {
  if (!currentPhotos.value.length) return
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
/* Tab group fade */
.group-fade-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.group-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.group-fade-enter-from   { opacity: 0; transform: translateY(8px); }
.group-fade-leave-to     { opacity: 0; transform: translateY(-8px); }

/* Photo slide */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from  { transform: translateX(60px); opacity: 0; }
.slide-left-leave-to    { transform: translateX(-60px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-60px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(60px); opacity: 0; }
</style>
