<script setup>
import Theme from 'vitepress/theme'
import HeroDemo from './components/HeroDemo.vue'

const { Layout } = Theme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HeroDemo />
    </template>
  </Layout>
</template>
