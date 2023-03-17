<script setup>
import DefaultTheme from 'vitepress/theme'
import LoveVueThreeJS from './components/LoveVueThreeJS.vue'
import UpdateBanner from './components/UpdateBanner.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <UpdateBanner />
    </template>
    <template #home-hero-image>
      <LoveVueThreeJS />
    </template>
  </Layout>
</template>
