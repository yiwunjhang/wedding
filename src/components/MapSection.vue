<template>
  <section id="map" class="py-24 overflow-hidden " style="background-color: #F5EFE6">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div data-aos="fade-up">
        <h2 class="section-title font-serif">婚禮資訊</h2>
        <p class="section-subtitle">VENUE &amp; DETAILS</p>
        <div class="flex items-center justify-center gap-3 mb-16">
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
          <span style="color:#D4B87A">✦</span>
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
        </div>
      </div>

      <!-- Info cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-14">
        <div
          v-for="(info, i) in infos"
          :key="i"
          data-aos="zoom-in"
          :data-aos-delay="i * 120"
          class="bg-white rounded-3xl shadow-md p-8 text-center border hover:shadow-xl transition-shadow duration-300"
          style="border-color: #C9CCB220"
        >
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow"
               style="background: #B1C97A">
            <component :is="info.icon" class="w-8 h-8 text-white" />
          </div>
          <h4 class="font-serif text-lg mb-2" style="color:#6E8F3C">{{ info.title }}</h4>
          <p class="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{{ info.content }}</p>
        </div>
      </div>

      <!-- Map embed -->
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        class="rounded-3xl overflow-hidden shadow-xl border-4"
        style="border-color: #D4B87A30"
      >
        <div class="relative">
          <iframe
            src="https://maps.google.com/maps?q=高雄市鳳山區西四巷41號&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style="border:0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="婚禮地點"
          ></iframe>
          <!-- Map overlay label -->
          <div class="absolute top-4 left-4 bg-white bg-opacity-90 rounded-2xl px-4 py-2 shadow-md flex items-center gap-2">
            <MapPinIcon class="w-5 h-5" style="color:#B1C97A" />
            <div>
              <p class="text-xs font-medium" style="color:#B1C97A">婚禮地點</p>
              <p class="text-sm font-semibold text-gray-700">黃埔新村</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Transportation -->
      <div data-aos="fade-up" data-aos-delay="200" class="mt-10 bg-white rounded-3xl shadow-md p-8">
        <h4 class="font-serif text-xl text-center mb-6" style="color:#6E8F3C">交通指南</h4>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(t, i) in transport" :key="i" class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                 style="background: #F5EFE6">
              <component :is="t.icon" class="w-5 h-5" style="color:#6E8F3C" />
            </div>
            <div>
              <p class="font-medium text-gray-700 mb-1">{{ t.method }}</p>
              <p class="text-sm text-gray-500 leading-relaxed">{{ t.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  CalendarDaysIcon,
  HomeModernIcon,
  ClockIcon,
  MapPinIcon,
  TruckIcon,
  PhoneIcon,
} from '@heroicons/vue/24/outline'

const infos = [
  {
    icon: CalendarDaysIcon,
    title: '婚禮日期',
    content: '2027 年 3 月 27 日（週六）\n晚宴：18:00 入場',
  },
  {
    icon: HomeModernIcon,
    title: '婚禮場地',
    content: '黃埔新村\n830高雄市鳳山區\n西四巷41號',
  },
  {
    icon: ClockIcon,
    title: '宴客資訊',
    content: '晚宴時間：18:00\n入場時間：17:30 起\n敬請準時蒞臨',
  },
]

const transport = [
  {
    icon: MapPinIcon,
    method: '捷運',
    desc: '搭乘高雄捷運橘線至鳳山西站，出站後步行約 10 分鐘。',
  },
  {
    icon: TruckIcon,
    method: '自行開車',
    desc: '國道1號鳳山交流道下，沿光遠路往鳳山市區，約 5 分鐘車程，附近有路邊停車位。',
  },
  {
    icon: TruckIcon,
    method: '公車',
    desc: '搭乘高雄市公車至「鳳山」或「鳳山火車站」站，再步行約 10 分鐘。',
  },
  {
    icon: PhoneIcon,
    method: 'Uber / 計程車',
    desc: '請告知司機「黃埔新村」或輸入地址「鳳山區西四巷41號」導航前往。',
  },
]
</script>
