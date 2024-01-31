<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import { TresCanvas, vLightHelper, vAlwaysLookAt, vDistanceTo, vLog, vRotate } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls } from '@tresjs/cientos'

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
      v-rotate
      :position="[3, 3, 3]"
    />
    <OrbitControls />
   
    <TresDirectionalLight
      v-light-helper
      v-always-look-at="[8, 16, 0]"
      :position="[0, 8, 4]"
      :intensity="0.7"
      color="yellow"
      cast-shadow
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
      v-rotate="0.01"
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