<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'
import { TresCanvas, vDistanceTo, vLog } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import DirectiveSubComponent from './DirectiveSubComponent.vue'

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
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera v-distance-to="planeRef" :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <DirectiveSubComponent />
    <TresAmbientLight :intensity="1" />
    <TresMesh
      ref="planeRef"
      v-log:material
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
  </TresCanvas>
</template>
