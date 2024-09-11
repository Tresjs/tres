<script setup>
import Theme from 'vitepress/theme'
import HomeSponsors from './components/HomeSponsors.vue'
import LoveVueThreeJS from './components/LoveVueThreeJS.vue'

const { Layout } = Theme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <LoveVueThreeJS />
    </template>
    <template #home-features-after>
      <HomeSponsors />
    </template>
  </Layout>
</template>
