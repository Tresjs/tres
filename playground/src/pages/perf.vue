<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, Sphere } from '@tresjs/cientos'

import { TresLeches, Perf, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
  >
    <Perf />
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresGridHelper />
    <Sphere>
      <TresMeshToonMaterial />
    </Sphere>
    <!-- <TresDirectionalLight
      :args="[0xffffff, 1]"
      :position-x="lightPosition.x"
    /> -->
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>