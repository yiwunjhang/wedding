<template>
  <footer class="relative overflow-hidden py-16" style="background: #eef4e6">
    <!-- Decorative top border -->
    <div class="absolute top-0 left-0 right-0 h-1" style="background: #b1c97a"></div>

    <!-- Floating decoration -->
    <div
      class="absolute top-0 right-0 w-64 h-64 rounded-full"
      style="background: rgba(212, 184, 122, 0.12); transform: translate(30%, -30%)"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-48 h-48 rounded-full"
      style="background: rgba(177, 201, 122, 0.12); transform: translate(-30%, 30%)"
    ></div>

    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <!-- Main title -->
      <div data-aos="fade-up">
        <p class="tracking-[0.5em] text-xs mb-4" style="color: #b1c97a">
          FOREVER BEGINS HERE
        </p>
        <h2 class="font-serif text-4xl md:text-5xl mb-2" style="color: #6e8f3c">Leyin</h2>
        <p class="font-serif text-2xl mb-2" style="color: #d4b87a">&amp;</p>
        <h2 class="font-serif text-4xl md:text-5xl mb-8" style="color: #6e8f3c">Risa</h2>
      </div>

      <!-- Divider -->
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        class="flex items-center justify-center gap-4 mb-8"
      >
        <span class="block h-px w-24 opacity-40" style="background: #d4b87a"></span>
        <HeartIcon class="w-5 h-5" style="color: #d4b87a" />
        <span class="block h-px w-24 opacity-40" style="background: #d4b87a"></span>
      </div>

      <!-- Date & Venue -->
      <div data-aos="fade-up" data-aos-delay="200" class="mb-10">
        <p class="font-serif italic text-xl mb-2 text-gray-600">2027 年 3 月 27 日</p>
        <p class="text-sm text-gray-400">黃埔新村 · 高雄市鳳山區西四巷41號</p>
      </div>

      <!-- Quote -->
      <div data-aos="fade-up" data-aos-delay="300" class="max-w-md mx-auto mb-12">
        <p class="font-serif italic text-base leading-loose text-gray-400">
          "婚姻就是把尋常的每一天，<br />
          過成有你的樣子，一直到永遠。(´,,•ω•,,)♡"
        </p>
        
      </div>

      <!-- Quick Links -->
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        class="flex justify-center gap-6 mb-12"
      >
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
            style="
              background: rgba(110, 143, 60, 0.08);
              border-color: rgba(110, 143, 60, 0.25);
            "
          >
            <component :is="link.icon" class="w-5 h-5" style="color: #6e8f3c" />
          </div>
          <span class="text-xs tracking-widest" style="color: #6e8f3c">{{
            link.label
          }}</span>
        </a>
      </div>

      <!-- Countdown reminder -->
      <div
        data-aos="zoom-in"
        data-aos-delay="500"
        class="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-10 border"
        style="background: rgba(177, 201, 122, 0.15); border-color: #b1c97a"
      >
        <EnvelopeIcon class="w-5 h-5" style="color: #6e8f3c" />
        <span class="text-sm" style="color: #4a6b28">
          敬請回覆出席 · 截止日期：2026 年 12 月 31 日
        </span>
      </div>

      <!-- Copyright -->
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        class="border-t pt-8 mt-4"
        style="border-color: rgba(0, 0, 0, 0.08)"
      >
        <p class="text-xs text-gray-400">© 2027 Leyin &amp; Risa Wedding.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { HomeIcon, HeartIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/vue/24/outline";

const links = [
  { icon: HomeIcon, label: "HOME", href: "#hero" },
  { icon: HeartIcon, label: "STORY", href: "#about" },
  { icon: MapPinIcon, label: "VENUE", href: "#map" },
  { icon: EnvelopeIcon, label: "RSVP", href: "#rsvp" },
];
</script>
