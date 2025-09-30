<script setup>
import Theme from 'vitepress/theme'
import LoveVueThreeJS from './components/LoveVueThreeJS.vue'

const { Layout } = Theme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <LoveVueThreeJS />
    </template>
  </Layout>
</template>
