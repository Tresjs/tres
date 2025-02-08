<!-- eslint-disable no-console -->
<script setup lang="ts">
import { inject, watchEffect } from 'vue'
import { injectSymbol } from './constants'

const awiwi = inject('awiwi')
const bululu = inject('bululu')
const symbolInjection = inject(injectSymbol)
const vRoute = inject('v-route')
console.log(inject('test'))

watchEffect(() => console.log('tres:awiwi', awiwi?.a))

watchEffect(() => console.log('tres:bululu', bululu?.value))

watchEffect(() => console.log('tres:symbolInjection', symbolInjection?.value))

watchEffect(() => console.log('tres:v-route', vRoute))

watchEffect(() => console.log('tres:useTres', inject('useTres')))
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
