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
        <div v-for="(info, i) in infos" :key="i" data-aos="zoom-in" :data-aos-delay="i * 120"
          class="bg-white rounded-3xl shadow-md p-8 text-center border hover:shadow-xl transition-shadow duration-300"
          style="border-color: #C9CCB220">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow"
            style="background: #B1C97A">
            <component :is="info.icon" class="w-8 h-8 text-white" />
          </div>
          <h4 class="font-serif text-lg mb-2" style="color:#6E8F3C">{{ info.title }}</h4>
          <p class="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{{ info.content }}</p>
        </div>
      </div>

      <!-- Map embed -->
      <div data-aos="fade-up" data-aos-duration="1000" class="rounded-3xl overflow-hidden shadow-xl border-4"
        style="border-color: #D4B87A30">
        <div class="relative">
          <iframe src="https://maps.google.com/maps?q=高雄市鳳山區西四巷41號&t=&z=17&ie=UTF8&iwloc=&output=embed" width="100%"
            height="400" style="border:0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            title="婚禮地點"></iframe>
          <!-- Map overlay label -->
          <div
            class="absolute top-4 left-4 bg-white bg-opacity-90 rounded-2xl px-4 py-2 shadow-md flex items-center gap-2">
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
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: #F5EFE6">
              <img v-if="typeof t.icon === 'string'" :src="t.icon" class="w-5 h-5"
                style="filter: invert(45%) sepia(40%) saturate(500%) hue-rotate(60deg)" />
              <component v-else :is="t.icon" class="w-5 h-5" style="color:#6E8F3C" />
            </div>
            <div>
              <p class="font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                {{ t.method }}
                <span v-if="t.recommended" class="inline-flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full font-semibold" style="background:#FEF3C7; color:#D97706;">
                  <StarIcon class="w-3 h-3" />
                  最推薦
                </span>
              </p>
              <p v-if="t.descHtml" class="text-sm text-gray-500 leading-relaxed" v-html="t.descHtml"></p>
              <p v-else class="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{{ t.desc }}</p>
              <div v-if="t.links?.length" class="flex flex-wrap gap-2 mt-2">
                <a v-for="l in t.links" :key="l.label" :href="l.href" target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-xs font-medium hover:opacity-75 transition-opacity"
                  style="color:#6E8F3C">
                  <MapPinIcon class="w-3.5 h-3.5" />
                  {{ l.label }}
                </a>
              </div>
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
  StarIcon,
} from '@heroicons/vue/24/outline'
import truckSvg from '@/assets/images/truck-front.svg'
import busSvg from '@/assets/images/bus-front.svg'
import bicycleSvg from '@/assets/images/bicycle.svg'
import carSvg from '@/assets/images/car-front.svg'

const infos = [
  {
    icon: CalendarDaysIcon,
    title: '婚禮日期',
    content: '2027 年 3 月 27 日（週六）\n晚宴：18:00',
  },
  {
    icon: HomeModernIcon,
    title: '婚禮場地',
    content: '黃埔新村\n830高雄市鳳山區西四巷41號',
  },
  {
    icon: ClockIcon,
    title: '宴客資訊',
    content: '晚宴時間：18:00\n入場時間：17:30\n敬請準時蒞臨',
  },
]

const transport = [
  {
    icon: truckSvg,
    method: '捷運＋步行',
    desc: '大東站(O13) 2號出口：穿越大東文化藝術中心，沿鳳山溪步道向南步行，約15分鐘。',
  },
  {
    icon: bicycleSvg,
    method: '✨YouBike(建議)',
    desc: '大東站(O13)2號出口旁均有站點，騎行至「黃埔新村(東四巷）」約5分鐘(1.2公里)。',
    links: [{ label: '查看站點位置', href: 'https://maps.app.goo.gl/HQfQHDaj2wgris6z9' }],
  },
  {
    icon: carSvg,
    method: '✨自行開車(建議)',
    desc: '現場有兩個停車場分別是「黃埔新村停車場」與「宜舍鳳山黃埔新村二停車場」，建議提早抵達以確保有位子停車。',
    links: [
      { label: '黃埔新村停車場', href: 'https://maps.app.goo.gl/YmVRTkzv4E1KmfMr5' },
      { label: '宜舍鳳山黃埔新村二停車場', href: 'https://maps.app.goo.gl/k8XBgzXgDfQQ9MjSA' },
    ],
  },
  {
    icon: busSvg,
    method: '捷運＋公車(橘11A、88建國幹線、8001、8010)',
    descHtml: '- 去程從捷運鳳山站(O12)1號出口 搭乘 17:19 <span style="font-weight: bold;color: #ba7712;">橘11A</span> 公車，17:36 至「黃埔新村站」下車，車程約17分鐘。<br>- 回程末班車：21:28 搭乘至高雄客運鳳山站(澄瀾砲台)再步行至捷運站。',
  },
]
</script>
