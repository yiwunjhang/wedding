<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-center bg-cover bg-no-repeat"
      :style="`background-image: url('${heroBg}'); background-position: center 30%`"
    ></div>

    <!-- Base overlay for text readability -->
    <div class="absolute inset-0" style="background: rgba(28,42,24,0.1)"></div>

    <!-- Frosted glass layer — intensifies on scroll -->
    <div
      class="absolute inset-0"
      :style="{
        backdropFilter: `blur(${glassBlur}px)`,
        WebkitBackdropFilter: `blur(${glassBlur}px)`,
        background: `rgba(238, 228, 208, ${glassOpacity})`,
        transition: 'backdrop-filter 0.1s, background 0.1s',
      }"
    ></div>

    <!-- Floating leaves -->
    <div v-for="i in 5" :key="i" class="leaf" :style="leafStyle(i)">✦</div>

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <p
        data-aos="fade-down"
        data-aos-duration="800"
        class="tracking-[0.5em] text-xs font-light mb-8 text-white drop-shadow"
        style="letter-spacing: 0.45em"
      >
      </p>

      <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="100">
        <h1 class="font-serif mb-1 text-white drop-shadow-lg" style="font-size: clamp(3.5rem, 10vw, 6.5rem); text-shadow: 0 2px 20px rgba(28,42,24,0.5)">
          Leyin
        </h1>
        <p class="font-serif text-3xl md:text-5xl mb-1" style="color: #D4B87A; text-shadow: 0 1px 8px rgba(28,42,24,0.4)">&amp;</p>
        <h1 class="font-serif mb-8 text-white drop-shadow-lg" style="font-size: clamp(3.5rem, 10vw, 6.5rem); text-shadow: 0 2px 20px rgba(28,42,24,0.5)">
          Risa
        </h1>
        <p class="text-sm font-light tracking-widest text-white opacity-80 mb-2" style="text-shadow: 0 1px 6px rgba(0,0,0,0.5)">
          宗毅 &nbsp;·&nbsp; 怡雯
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="280"
        class="flex items-center justify-center gap-3 my-6"
      >
        <!-- <span class="block h-px w-20 opacity-60" style="background:#D4B87A"></span> -->
        <span class="text-lg" style="color:#D4B87A">✦</span>
        <!-- <span class="block h-px w-20 opacity-60" style="background:#D4B87A"></span> -->
      </div>

      <p
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="380"
        class="font-serif italic text-xl md:text-2xl mb-10"
        style="color: rgba(255,255,255,0.9); text-shadow: 0 1px 8px rgba(28,42,24,0.5)"
      >
        2027 年 3 月 27 日
      </p>

      <!-- Countdown -->
      <div
        data-aos="zoom-in"
        data-aos-duration="800"
        data-aos-delay="480"
        class="flex justify-center gap-4 md:gap-6 mb-24"
      >
        <div v-for="unit in countdown" :key="unit.label" class="text-center">
          <div
            class="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2"
            style="background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.35); box-shadow: 0 4px 16px rgba(28,42,24,0.25)"
          >
            <span class="text-white font-serif text-2xl md:text-3xl font-bold" style="text-shadow: 0 1px 6px rgba(0,0,0,0.3)">{{ unit.value }}</span>
          </div>
          <p class="text-xs tracking-widest text-white opacity-70">{{ unit.label }}</p>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <a href="#about" class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20">
      <svg class="w-6 h-6 opacity-60 text-white hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </a>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import heroBg from '../assets/images/A7401450.png'

const weddingDate = new Date('2027-03-27T18:00:00')
const countdown = ref([
  { label: '天', value: '00' },
  { label: '時', value: '00' },
  { label: '分', value: '00' },
  { label: '秒', value: '00' },
])

function updateCountdown() {
  const now = new Date()
  const diff = weddingDate - now
  if (diff <= 0) return
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  countdown.value = [
    { label: '天', value: String(days).padStart(2, '0') },
    { label: '時', value: String(hours).padStart(2, '0') },
    { label: '分', value: String(minutes).padStart(2, '0') },
    { label: '秒', value: String(seconds).padStart(2, '0') },
  ]
}

// Frosted glass scroll effect
const scrollY     = ref(0)
const heroHeight  = ref(0)

const glassProgress = computed(() =>
  Math.min(scrollY.value / (heroHeight.value * 0.55), 1)
)
const glassBlur    = computed(() => glassProgress.value * 16)
const glassOpacity = computed(() => glassProgress.value * 0.58)

function handleScroll() {
  scrollY.value = window.scrollY
}

function dismissLoading() {
  const el = document.getElementById('loading')
  if (!el) return
  el.classList.add('done')
  el.addEventListener('transitionend', () => el.remove(), { once: true })
}

let timer
onMounted(() => {
  const hero = document.getElementById('hero')
  heroHeight.value = hero?.offsetHeight ?? window.innerHeight
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)

  const img = new Image()
  img.src = heroBg
  if (img.complete) {
    dismissLoading()
  } else {
    img.onload = dismissLoading
    img.onerror = dismissLoading
    setTimeout(dismissLoading, 8000)
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearInterval(timer)
})

function leafStyle(i) {
  const pos = [
    { top: '12%', left: '4%',  delay: '0s',   size: '2.8rem' },
    { top: '22%', right: '6%', delay: '1.2s', size: '1.1rem' },
    { top: '65%', left: '2%',  delay: '2.1s', size: '0.85rem' },
    { top: '78%', right: '4%', delay: '0.7s', size: '2.2rem' },
    { top: '45%', left: '93%', delay: '1.7s', size: '1.5rem' },
  ]
  const p = pos[i - 1]
  return {
    position: 'absolute',
    fontSize: p.size,
    color: 'white',
    animation: `leafFloat 5s ease-in-out ${p.delay} infinite alternate`,
    zIndex: 5,
    ...p,
  }
}
</script>

<style scoped>
@keyframes leafFloat {
  from { transform: translateY(0) rotate(-10deg); }
  to   { transform: translateY(-18px) rotate(10deg); }
}
</style>
