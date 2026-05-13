<script setup>
import BackgroundMusic from './components/BackgroundMusic.vue'
import SectionProgress from './components/SectionProgress.vue'
import ScrollToTop from './components/ScrollToTop.vue'
</script>

<template>
  <RouterView />
  <BackgroundMusic />
  <SectionProgress />
  <ScrollToTop />
</template>
