<script setup lang="ts">
import { inject, watchEffect } from 'vue'

const awiwi = inject('awiwi')
const bululu = inject('bululu')
const vRoute = inject('v-route')
// eslint-disable-next-line no-console
watchEffect(() => console.log('tres:awiwi', awiwi.a))
// eslint-disable-next-line no-console
watchEffect(() => console.log('tres:bululu', bululu.value))
// eslint-disable-next-line no-console
watchEffect(() => console.log('tres:v-route', vRoute))
// eslint-disable-next-line no-console
watchEffect(() => console.log('tres:useTres', inject('useTres')))
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
