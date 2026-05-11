<template>
  <section id="about" class="py-24 overflow-hidden bg-hero-pattern" style="background-color: #FDFAF4">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Header -->
      <div data-aos="fade-up">
        <h2 class="section-title font-serif">我們的故事</h2>
        <p class="section-subtitle">OUR STORY</p>
        <div class="flex items-center justify-center gap-3 mb-16">
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
          <span style="color:#D4B87A">✦</span>
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
        </div>
      </div>

      <!-- Couple intro -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-20">
        <!-- Groom -->
        <div data-aos="fade-right" data-aos-duration="900" class="text-center">
          <div class="relative inline-block mb-6">
            <div class="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-xl ring-4 ring-offset-4"
                 style="ring-color: #B1C97A">
              <div class="w-full h-full flex items-center justify-center"
                   style="background: #B1C97A">
              <img src="@/assets/images/leyin1.jpg" alt="新郎 Leyin" class="w-full h-full object-cover" style="transform: rotate(-25deg); transform-origin: center;" />
              </div>
            </div>
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm"
                 style="background:#D4B87A">新郎</div>
          </div>
          <h3 class="font-serif text-2xl mt-6 mb-2" style="color:#B1C97A">Leyin（宗毅）</h3>
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
            熱愛攝影與旅行<br/>
            習慣用工程人的理性規劃人生<br/>
            用攝影人的角度體驗生活<br/>
            每一張照片都藏著對生活的熱忱
          </p>
        </div>

        <!-- Bride -->
        <div data-aos="fade-left" data-aos-duration="900" class="text-center">
          <div class="relative inline-block mb-6">
            <div class="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-xl ring-4 ring-offset-4"
                 style="ring-color: #D4B87A">
              <img src="@/assets/images/Risa3.jpg" alt="新娘 Risa" class="w-full h-full object-cover" style="transform: rotate(-25deg); transform-origin: center;" />
            </div>
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm"
                 style="background:#D4B87A">新娘</div>
          </div>
          <h3 class="font-serif text-2xl mt-6 mb-2" style="color:#B1C97A">Risa（怡雯）</h3>
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
            一位熱愛畫畫的軟體工程師！<br/>
            喜歡用色彩繽紛的畫筆描繪生活的美好<br/>
            座右銘是「Enjoy every moment as it comes.」<br/>
            最近開始創作狐狸先生與小沙鼠的系列作品
          </p>
        </div>
      </div>

      <!-- Timeline -->
      <div data-aos="fade-up" class="mb-8">
        <h3 class="font-serif text-2xl text-center mb-10" style="color:#6E8F3C">相遇的足跡</h3>
      </div>

      <div class="relative">
        <!-- Center line -->
        <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden md:block"
             style="background: #D4B87A"></div>

        <div v-for="(event, i) in timeline" :key="i"
             :data-aos="i % 2 === 0 ? 'fade-right' : 'fade-left'"
             :data-aos-delay="i * 100"
             class="relative flex md:items-center mb-10 md:mb-16"
             :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        >
          <!-- Content -->
          <div class="md:w-5/12 bg-white rounded-2xl shadow-md p-6 border border-gray-100 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
               :class="i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'"
               @click="openLightbox(event)"
          >
            <p class="text-xs tracking-widest font-medium mb-1" style="color:#D4B87A">{{ event.year }}</p>
            <h4 class="font-serif text-lg mb-2" style="color:#6E8F3C">{{ event.title }}</h4>
            <p class="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{{ event.desc }}</p>
            <p class="text-xs mt-3 flex items-center gap-1" style="color:#B1C97A">
              <PhotoIcon class="w-3.5 h-3.5" />
              {{ event.photos?.length ? `${event.photos.length} 張照片` : '查看相片' }}
            </p>
          </div>
          <!-- Dot -->
          <div class="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full shadow"
               style="background: #B1C97A">
            <component :is="event.icon" class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>

    <TimelineLightbox
      :visible="lightboxVisible"
      :event="activeEvent"
      @close="lightboxVisible = false"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { SparklesIcon, HeartIcon, PaperAirplaneIcon, StarIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import TimelineLightbox from './TimelineLightbox.vue'

const lightboxVisible = ref(false)
const activeEvent = ref(null)

function openLightbox(event) {
  activeEvent.value = event
  lightboxVisible.value = true
}

const timeline = [
  {
    year: '2017 · 秋',
    title: '初次相遇',
    desc: '怡雯畢業後第一份工作遇到剛好轉職來的宗毅，雖然此時還只是同事，但也因此展開了我們的故事。',
    icon: SparklesIcon,
    photos: [],
  },
  {
    year: '2020 · 秋',
    title: '交往',
    desc: '偶然的機緣讓兩人再度接線，慢慢開始到處約會旅遊。',
    icon: HeartIcon,
    photos: [],
  },
  {
    year: '2023 · 秋',
    title: '求婚登記',
    desc: '在一個平凡的日子裡，宗毅訂了一間景觀餐廳和一束花要慶祝紀念日，飯後兩人散步時宗毅帶著戒指和滿滿的誠意求婚，怡雯也答應了！',
    icon: PaperAirplaneIcon,
    photos: [],
  },
  {
    year: '2024 · 春',
    title: '蜜月旅行',
    desc: '宗毅和怡雯第一次一起出國旅行，兩人一起出國去日本渡蜜月，體驗了當地生活\n（e.g.凌晨跟清水寺的阿公阿嬤一起跳早操XD）\n不論是美食、文化還是風景都留下了美好的回憶，也仗著蜜月在各個景點收到很多祝福跟贈品。\n之後也讓我們更期待未來一起探索世界的日子！',
    icon: StarIcon,
    photos: [],
  },
  {
    year: '2027 · 春',
    title: '永結同心',
    desc: '從認識到交往再到結婚也已經10年了！\n雖然兩個人各有固執的地方，接下來兩個人也會繼續相互扶持、一起成長，迎接人生的下一個階段！',
    icon: SparklesIcon,
    photos: [],
  },
]
</script>
