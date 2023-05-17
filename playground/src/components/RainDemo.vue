<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Rain } from '@cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const rain = shallowRef<Rain>(null)

watch(rain, value => {
  console.log(value)
})
</script>
<template>
  <TresCanvas v-bind="gl" ref="canvas">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Suspense>
        <Rain ref="rain" :count="500" :speed="3" :ramdomness="1" :area="[20,20,20]" />
    </Suspense>
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
