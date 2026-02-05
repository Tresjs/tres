<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import {
  BasicShadowMap,
  NoToneMapping,
  SRGBColorSpace,
} from 'three'

const uuid = 'core-models-primitives'
const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph', { uuid })

const modelsPositions = ref([
  {
    position: [0, 2, 2],
  },
  {
    position: [0, 3, 5],
  },
  {
    position: [0, 1, 1],
  },
])
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    v-bind="gl"
    window-size
    class="awiwi"
    :style="{ background: '#008080' }"
  >
    <TresPerspectiveCamera
      :position="[7, 7, 7]"
    />
    <OrbitControls />

    <Suspense>
      <DynamicModel v-for="model in modelsPositions" :key="model" :position="model.position" />
    </Suspense>
    <TresAxesHelper :args="[1]" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
      cast-shadow
    />
  </TresCanvas>
</template>
