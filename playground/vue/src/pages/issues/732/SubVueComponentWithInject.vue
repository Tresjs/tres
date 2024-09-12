<script setup lang="ts">
import { inject, watchEffect } from 'vue'

const awiwi = inject('awiwi')
const bululu = inject('bululu')
// eslint-disable-next-line no-console
watchEffect(() => console.log('vue:awiwi', awiwi.a))
// eslint-disable-next-line no-console
watchEffect(() => console.log('vue:bululu', bululu.value))
// eslint-disable-next-line no-console
watchEffect(() => console.log('vue:v-route', inject('v-route')))
// eslint-disable-next-line no-console
watchEffect(() => console.log('vue:useTres', inject('useTres')))
</script>

<template>
  <p>awiwi: {{ awiwi }}</p>
  <p>bululu: {{ bululu }}</p>
  <p>v-route: {{ inject('v-route') }}</p>
</template>
