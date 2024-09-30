<!-- eslint-disable no-console -->
<script setup lang="ts">
import { inject, watchEffect } from 'vue'

const awiwi = inject('awiwi')
const bululu = inject('bululu')
const vRoute = inject('v-route')
console.log(inject('test'))

watchEffect(() => console.log('tres:awiwi', awiwi?.a))

watchEffect(() => console.log('tres:bululu', bululu?.value))

watchEffect(() => console.log('tres:v-route', vRoute))

watchEffect(() => console.log('tres:useTres', inject('useTres')))
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
