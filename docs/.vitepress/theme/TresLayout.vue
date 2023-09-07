<script setup>
// eslint-disable-next-line import/no-named-as-default
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
