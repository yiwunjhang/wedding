<template>
  <section id="rsvp" class="py-24 overflow-hidden bg-hero-pattern" style="background-color: #FDFAF4">
    <div class="max-w-2xl mx-auto px-6">
      <!-- Header -->
      <div data-aos="fade-up">
        <h2 class="section-title font-serif">出席回覆</h2>
        <p class="section-subtitle">RSVP</p>
        <div class="flex items-center justify-center gap-3 mb-6">
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
          <span style="color:#D4B87A">✦</span>
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
        </div>
        <p class="text-center text-gray-500 text-sm mb-12 leading-relaxed">
          請於 2027 年 3 月 13 日前回覆，<br>以便我們提前準備，感謝您的配合。
        </p>
      </div>

      <!-- Google Form -->
      <div data-aos="fade-up" data-aos-delay="200"
        class="bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-50">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeuLwkJ6mtE6z8oPNwotobxcmqq-GUOFHbDHzxEq7ABqolbeA/viewform?embedded=true"
          width="100%" height="1200" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"
          style="display:block; overflow:hidden">
          載入中…
        </iframe>
      </div>

      <!-- Contact bride -->
      <div data-aos="fade-up" data-aos-delay="100" class="mt-12">
        <div class="flex items-center justify-center gap-3 mb-6">
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
          <span style="color:#D4B87A">✦</span>
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
        </div>
        <div class="text-center">
          <button
            @click="contactOpen = !contactOpen"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition-all duration-300 border"
            :style="contactOpen
              ? 'background:#6E8F3C; color:white; border-color:transparent'
              : 'background:transparent; color:#6E8F3C; border-color:#B1C97A'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            {{ contactOpen ? '關閉聯繫表單' : '表單或網站有問題？點此聯繫新娘 Risa' }}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 transition-transform duration-300" :class="contactOpen ? 'rotate-180' : ''">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        <div
          class="overflow-hidden transition-all duration-500 ease-in-out"
          :style="contactOpen ? 'max-height:600px; opacity:1; margin-top:1.5rem' : 'max-height:0; opacity:0; margin-top:0'"
        >
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-50">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSc2Z7Rj8WxEDgWUmZFc_H02gPv4hBNeuFW_4NAvs695kWNzvg/viewform?embedded=true"
              width="100%" height="438" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"
              style="display:block; overflow:hidden">
              載入中…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const contactOpen = ref(false)
</script>
