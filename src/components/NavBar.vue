<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-white bg-opacity-95 shadow-md backdrop-blur-sm' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <a href="#hero" class="font-serif text-xl transition-colors duration-300"
         :style="scrolled ? 'color:#B1C97A' : 'color:white'">
        L &amp; R
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="item in navItems" :key="item.label">
          <a
            :href="item.href"
            class="text-sm tracking-widest transition-colors duration-300 hover:opacity-70 relative nav-link"
            :style="scrolled ? 'color:#555' : 'color:white'"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Desktop right actions -->
      <div class="hidden md:flex items-center gap-3">
        <!-- LINE link -->
        <a
          href="https://lin.ee/5oF9YcR"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
          :style="scrolled
            ? 'background:rgba(0,185,0,0.1); color:#00b900;'
            : 'background:rgba(255,255,255,0.15); color:white; border:1px solid rgba(255,255,255,0.4); backdrop-filter:blur(4px)'"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.365 9.863c.349 0 .63.285.63.63 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
          LINE
        </a>

        <!-- RSVP button -->
        <a
          href="#rsvp"
          class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          :style="scrolled
            ? 'background: #6E8F3C; color: white; box-shadow: 0 2px 10px rgba(110,143,60,0.3)'
            : 'background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.4); backdrop-filter: blur(4px)'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          出席回覆
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden p-2 rounded-lg transition-colors"
        :style="scrolled ? 'color:#B1C97A' : 'color:white'"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition name="slide-down">
      <div v-if="mobileOpen" class="md:hidden bg-white bg-opacity-98 shadow-lg px-6 pb-6">
        <ul class="flex flex-col gap-4 pt-2">
          <li v-for="item in navItems" :key="item.label">
            <a
              :href="item.href"
              @click="mobileOpen = false"
              class="block text-sm tracking-widest py-2 border-b border-gray-100"
              style="color:#555"
            >
              {{ item.label }}
            </a>
          </li>
          <li>
            <a href="#rsvp" @click="mobileOpen = false"
               class="block text-center py-3 rounded-full text-white text-sm font-medium mt-2"
               style="background: #6E8F3C">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              出席回覆
            </a>
          </li>
          <li class="flex flex-col items-center gap-2 pt-2 pb-1">
            <p class="text-xs tracking-widest" style="color:#b1c97a">掃描 QRCode 加入官方 LINE</p>
            <div class="p-2 rounded-xl bg-white shadow-sm inline-block">
              <img
                src="https://qr-official.line.me/gs/M_948acusc_BW.png?oat_content=qr"
                alt="LINE QR Code"
                class="w-28 h-28"
              />
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled    = ref(false)
const mobileOpen  = ref(false)

const navItems = [
  { label: 'HOME',  href: '#hero' },
  { label: 'STORY', href: '#about' },
  { label: 'VENUE', href: '#map' },
  { label: 'RSVP',  href: '#rsvp' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #B1C97A;
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
