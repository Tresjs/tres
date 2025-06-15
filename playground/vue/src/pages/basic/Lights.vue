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
  <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
  <tres-canvas

    v-bind="gl"
  >
    <tres-perspective-camera
      v-distance-to="planeRef"
      :position="[3, 3, 3]"
    />
    <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
    <orbit-controls />

    <tres-directional-light
      v-light-helper
      :position="[0, 8, 4]"
      :intensity="0.7"
      color="yellow"
      cast-shadow
      :shadow-mapSize="[512, 512]"
    />
    <tres-mesh
      ref="planeRef"
      v-log:material
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <tres-plane-geometry :args="[10, 10, 10, 10]" />
      <tres-mesh-toon-material />
    </tres-mesh>
    <tres-mesh
      :position="[-2, 2, 0]"
    >
      <tres-box-geometry :args="[1, 1, 1]" />
      <tres-mesh-toon-material color="red" />
    </tres-mesh>
    <tres-mesh
      :position="[2, 4, 0]"
      cast-shadow
    >
      <tres-sphere-geometry :args="[1, 32, 32]" />
      <tres-mesh-toon-material color="yellow" />
    </tres-mesh>
    <tres-ambient-light :intensity="1" />
    <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
  </tres-canvas>
</template>
