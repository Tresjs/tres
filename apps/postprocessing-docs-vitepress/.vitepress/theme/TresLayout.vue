<script setup>
import DefaultTheme from 'vitepress/theme'
import LoveVueThreeJS from './components/LoveVueThreeJS.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <LoveVueThreeJS />
    </template>
  </Layout>
</template>
