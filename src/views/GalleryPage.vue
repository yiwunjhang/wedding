<template>
  <div class="min-h-screen bg-hero-pattern" style="background-color: #FDFAF4">

    <NavBar force-scrolled />

    <div class="max-w-6xl mx-auto px-4 md:px-6 pt-28 pb-12">

      <!-- Back -->
      <div class="mb-6">
        <RouterLink to="/#moments" class="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70" style="color:#6E8F3C">
          <ChevronLeftIcon class="w-4 h-4" />
          返回
        </RouterLink>
      </div>

      <!-- Tabs -->
      <div class="flex flex-col md:flex-row justify-center gap-3 mb-6">
        <button
          v-for="(group, i) in groups"
          :key="i"
          @click="switchTab(i)"
          class="w-full md:w-auto px-6 py-3 rounded-[10px] text-sm font-medium tracking-wide transition-all duration-300"
          :style="activeTab === i
            ? 'background:#D4B87A; color:#fff; box-shadow: 0 4px 14px rgba(212,184,122,0.4);'
            : 'background:rgba(212,184,122,0.12); color:#9a7d45;'"
        >
          <span class="block text-xs opacity-75 leading-none mb-0.5">{{ group.en }}</span>
          <span>{{ group.zh }}</span>
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="currentPhotos.length === 0"
           class="flex flex-col items-center justify-center gap-3 py-32 text-center">
        <PhotoIcon class="w-14 h-14 opacity-20" style="color:#4a3f2f" />
        <p class="text-sm opacity-40" style="color:#4a3f2f">尚未加入照片</p>
      </div>

      <template v-else>
        <!-- Page flip container -->
        <div class="relative overflow-hidden rounded-2xl" style="perspective: 1400px;">
          <Transition :name="flipDir === 'next' ? 'flip-next' : 'flip-prev'" mode="out-in">
            <div :key="`${activeTab}-${currentPage}`"
                 class="grid grid-cols-1 md:grid-cols-3 gap-3"
                 style="transform-style: preserve-3d; will-change: transform;">
              <div
                v-for="(photo, i) in pagePhotos"
                :key="i"
                class="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300"
                style="aspect-ratio: 4/3;"
                @click="openLightbox(pageStart + i)"
              >
                <img :src="photo.src" :alt="photo.caption" class="w-full h-full object-cover" />
                <div v-if="photo.caption"
                     class="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs truncate"
                     style="background: rgba(255,255,255,0.55); color:#4a3f2f; backdrop-filter:blur(4px)">
                  {{ photo.caption }}
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Pagination controls -->
        <div class="mt-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
          <button
            @click="prevPage"
            :disabled="currentPage === 0"
            class="w-full md:w-auto flex items-center justify-center gap-1.5 px-5 py-3 rounded-[10px] text-sm font-medium border transition-all duration-300"
            :style="currentPage === 0
              ? 'opacity:0.3; cursor:not-allowed; border-color:#D4B87A; color:#9a7d45;'
              : 'border-color:#D4B87A; color:#9a7d45; background:rgba(212,184,122,0.08); cursor:pointer;'"
          >
            <ChevronLeftIcon class="w-4 h-4" />
            上一頁
          </button>

          <!-- Page dots -->
          <div class="flex items-center gap-2 order-first md:order-none">
            <button
              v-for="n in totalPages"
              :key="n"
              @click="goToPage(n - 1)"
              class="rounded-full transition-all duration-300"
              :style="currentPage === n - 1
                ? 'width:24px; height:8px; background:#D4B87A;'
                : 'width:8px; height:8px; background:rgba(74,63,47,0.2);'"
            />
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages - 1"
            class="w-full md:w-auto flex items-center justify-center gap-1.5 px-5 py-3 rounded-[10px] text-sm font-medium border transition-all duration-300"
            :style="currentPage >= totalPages - 1
              ? 'opacity:0.3; cursor:not-allowed; border-color:#D4B87A; color:#9a7d45;'
              : 'border-color:#D4B87A; color:#9a7d45; background:rgba(212,184,122,0.08); cursor:pointer;'"
          >
            下一頁
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- Page counter -->
        <p class="text-center text-xs mt-3" style="color:rgba(74,63,47,0.4)">
          第 {{ currentPage + 1 }} 頁，共 {{ totalPages }} 頁 · {{ currentPhotos.length }} 張
        </p>
      </template>

    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lb-fade">
        <div v-if="lightboxIndex !== null"
             class="fixed inset-0 z-[200] flex items-center justify-center"
             @click.self="closeLightbox">
          <div class="absolute inset-0" style="background:rgba(30,25,20,0.85); backdrop-filter:blur(6px)" @click="closeLightbox" />

          <div class="relative z-10 max-w-4xl w-full mx-4">
            <button @click="closeLightbox"
                    class="absolute -top-10 right-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition">
              <XMarkIcon class="w-5 h-5 text-white" />
            </button>

            <Transition :name="lbDirection === 'next' ? 'lb-slide-left' : 'lb-slide-right'" mode="out-in">
              <img :key="lightboxIndex"
                   :src="currentPhotos[lightboxIndex].src"
                   :alt="currentPhotos[lightboxIndex].caption"
                   class="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
            </Transition>

            <p v-if="currentPhotos[lightboxIndex].caption"
               class="text-center text-white/80 text-sm mt-3">
              {{ currentPhotos[lightboxIndex].caption }}
            </p>

            <button v-if="currentPhotos.length > 1" @click="lbPrev"
                    class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 rounded-full flex items-center justify-center transition hover:bg-white/10">
              <ChevronLeftIcon class="w-6 h-6 text-white" />
            </button>
            <button v-if="currentPhotos.length > 1" @click="lbNext"
                    class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 rounded-full flex items-center justify-center transition hover:bg-white/10">
              <ChevronRightIcon class="w-6 h-6 text-white" />
            </button>

            <div class="absolute top-3 left-3 text-xs text-white/60">
              {{ lightboxIndex + 1 }} / {{ currentPhotos.length }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import NavBar from '../components/NavBar.vue'
import { groups } from '@/data/photos.js'

const PER_PAGE = 6

const activeTab   = ref(0)
const currentPage = ref(0)
const flipDir     = ref('next')

const lightboxIndex = ref(null)
const lbDirection   = ref('next')

const currentPhotos = computed(() => groups[activeTab.value].photos)
const totalPages    = computed(() => Math.ceil(currentPhotos.value.length / PER_PAGE))
const pageStart     = computed(() => currentPage.value * PER_PAGE)
const pagePhotos    = computed(() => currentPhotos.value.slice(pageStart.value, pageStart.value + PER_PAGE))

function switchTab(i) {
  if (i === activeTab.value) return
  activeTab.value = i
  currentPage.value = 0
  flipDir.value = 'next'
}

function nextPage() {
  if (currentPage.value >= totalPages.value - 1) return
  flipDir.value = 'next'
  currentPage.value++
}

function prevPage() {
  if (currentPage.value === 0) return
  flipDir.value = 'prev'
  currentPage.value--
}

function goToPage(n) {
  flipDir.value = n > currentPage.value ? 'next' : 'prev'
  currentPage.value = n
}

function openLightbox(i) {
  lightboxIndex.value = i
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxIndex.value = null
  document.body.style.overflow = ''
}

function lbNext() {
  lbDirection.value = 'next'
  lightboxIndex.value = (lightboxIndex.value + 1) % currentPhotos.value.length
}

function lbPrev() {
  lbDirection.value = 'prev'
  lightboxIndex.value = (lightboxIndex.value - 1 + currentPhotos.value.length) % currentPhotos.value.length
}

function onKey(e) {
  if (lightboxIndex.value !== null) {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') lbNext()
    if (e.key === 'ArrowLeft') lbPrev()
  } else {
    if (e.key === 'ArrowRight') nextPage()
    if (e.key === 'ArrowLeft') prevPage()
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── 翻頁動畫 ── */
.flip-next-enter-active {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.4s ease;
  transform-origin: left center;
}
.flip-next-leave-active {
  transition: transform 0.4s cubic-bezier(0.64, 0, 0.78, 0),
              opacity 0.3s ease;
  transform-origin: left center;
  position: absolute;
  width: 100%;
}
.flip-next-enter-from {
  opacity: 0;
  transform: rotateY(55deg) translateX(80px) scale(0.88);
}
.flip-next-leave-to {
  opacity: 0;
  transform: rotateY(-55deg) translateX(-80px) scale(0.88);
}

.flip-prev-enter-active {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.4s ease;
  transform-origin: right center;
}
.flip-prev-leave-active {
  transition: transform 0.4s cubic-bezier(0.64, 0, 0.78, 0),
              opacity 0.3s ease;
  transform-origin: right center;
  position: absolute;
  width: 100%;
}
.flip-prev-enter-from {
  opacity: 0;
  transform: rotateY(-55deg) translateX(-80px) scale(0.88);
}
.flip-prev-leave-to {
  opacity: 0;
  transform: rotateY(55deg) translateX(80px) scale(0.88);
}

/* ── Lightbox ── */
.lb-fade-enter-active { transition: opacity 0.3s ease; }
.lb-fade-leave-active { transition: opacity 0.25s ease; }
.lb-fade-enter-from, .lb-fade-leave-to { opacity: 0; }

.lb-slide-left-enter-active,
.lb-slide-left-leave-active,
.lb-slide-right-enter-active,
.lb-slide-right-leave-active {
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
.lb-slide-left-enter-from  { transform: translateX(48px); opacity: 0; }
.lb-slide-left-leave-to    { transform: translateX(-48px); opacity: 0; }
.lb-slide-right-enter-from { transform: translateX(-48px); opacity: 0; }
.lb-slide-right-leave-to   { transform: translateX(48px); opacity: 0; }
</style>
