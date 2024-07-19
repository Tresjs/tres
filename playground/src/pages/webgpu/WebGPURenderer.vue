<script setup lang="ts">
import {
  BasicShadowMap,
  NoToneMapping,
  SRGBColorSpace,
} from 'three'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { nextTick, onMounted } from 'vue'

const state = reactive({
  clearColor: '#201919',
  shadows: false,
  alpha: false,

  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

const { onLoop } = useRenderLoop()

onMounted(async () => {
  await nextTick()

  onLoop(({ elapsed }) => {})
})
</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[0, 1, -3]" :look-at="[0, 0, 0]" />

    <OrbitControls />

    <TresAmbientLight :intensity="0.5" />

    <TresMesh>
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="red" />
    </TresMesh>
  </TresCanvas>
</template>
