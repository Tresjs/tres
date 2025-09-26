<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, vDistanceTo, vLightHelper, vLog } from '@tresjs/core'

import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const planeRef: Ref<TresObject | null> = ref(null)
</script>

<template>
  <TresCanvas

    v-bind="gl"
  >
    <TresPerspectiveCamera
      v-distance-to="planeRef"
      :position="[3, 3, 3]"
    />
    <OrbitControls />

    <TresDirectionalLight
      v-light-helper
      :position="[0, 8, 4]"
      :intensity="0.7"
      color="yellow"
      cast-shadow
      :shadow-mapSize="[512, 512]"
    />
    <TresMesh
      ref="planeRef"
      v-log:material
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
    <TresMesh
      :position="[-2, 2, 0]"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshToonMaterial color="red" />
    </TresMesh>
    <TresMesh
      :position="[2, 4, 0]"
      cast-shadow
    >
      <TresSphereGeometry :args="[1, 32, 32]" />
      <TresMeshToonMaterial color="yellow" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
