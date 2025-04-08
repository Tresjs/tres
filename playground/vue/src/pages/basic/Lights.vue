<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, vLightHelper } from '@tresjs/core'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
}

const planeRef: Ref<TresObject | null> = ref(null)
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[8, 8, 8]"
    />
    <OrbitControls />

    <TresDirectionalLight
      v-light-helper
      :position="[0, 8, 4]"
      :intensity="0.7"
      color="yellow"
      cast-shadow
    />
    <TresMesh
      ref="planeRef"
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
