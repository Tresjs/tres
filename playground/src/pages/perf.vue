<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls } from '@tresjs/cientos'

import { TresLeches, Perf, useControls } from '@tresjs/leches'
import { ref } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')
const { showObj } = useControls({
  showObj: true,
})

const boxRef = ref()
const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (boxRef.value) {
    boxRef.value.scale.set(Math.sin(elapsed), Math.sin(elapsed), Math.sin(elapsed))
    boxRef.value.rotation.set(Math.cos(elapsed), Math.cos(elapsed), Math.cos(elapsed))
  }
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
  >
    <Perf />
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresMesh
      v-if="showObj"
      ref="boxRef"
    >
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <!-- <Sphere v-if="showObj">
      <TresMeshToonMaterial />
    </Sphere> -->
    <!-- <TresDirectionalLight
      :args="[0xffffff, 1]"
      :position-x="lightPosition.x"
    /> -->
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>