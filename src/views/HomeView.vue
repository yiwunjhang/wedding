<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import MapSection from '../components/MapSection.vue'
import RsvpSection from '../components/RsvpSection.vue'
import FooterSection from '../components/FooterSection.vue'
import ScrollToTop from '../components/ScrollToTop.vue'
import BackgroundMusic from '../components/BackgroundMusic.vue'
import SectionProgress from '../components/SectionProgress.vue'

onMounted(() => {
  AOS.init({
    once: true,
    duration: 800,
    offset: 80,
    easing: 'ease-out-cubic',
  })
})
</script>

<template>
  <div class="min-h-screen">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <MapSection />
      <RsvpSection />
    </main>
    <FooterSection />
    <ScrollToTop />
    <BackgroundMusic />
    <SectionProgress />
  </div>
</template>
