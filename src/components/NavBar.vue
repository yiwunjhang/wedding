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

      <!-- RSVP button -->
      <a
        href="#rsvp"
        class="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
        :style="scrolled
          ? 'background: #6E8F3C; color: white; box-shadow: 0 2px 10px rgba(110,143,60,0.3)'
          : 'background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.4); backdrop-filter: blur(4px)'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        出席回覆
      </a>

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
