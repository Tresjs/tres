<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/style.css'
import { OrbitControls } from '@tresjs/cientos'
import { watch, watchEffect } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')

// Single control

const { value: test } = useControls({
  test: false,
})

watch(test, (value) => {
  console.log('Watcher', value)
})

watchEffect(() => {
  console.log('Single control', test.value)
})

// Double control

const { awiwi, color } = useControls({
  awiwi: false,
  color: '#ff0000',
})

watchEffect(() => {
  console.log('Double control', awiwi.value.value)
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    :clear-color="color.value"
  >
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>