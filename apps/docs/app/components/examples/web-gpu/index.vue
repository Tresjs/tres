<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { WebGPURenderer } from 'three/webgpu'
import type { TresRendererSetupContext } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import HologramCube from './HologramCube.vue'

const createWebGPURenderer = (ctx: TresRendererSetupContext) => {
  const renderer = new WebGPURenderer({
    canvas: toValue(ctx.canvas),
    // WebGPU specific configuration
    alpha: true,
    antialias: true,
  })
  return renderer
}
</script>

<template>
  <SceneWrapper>
    <TresCanvas :renderer="createWebGPURenderer">
      <TresPerspectiveCamera
        :position="[3, 3, 3]"
        :look-at="[0, 0, 0]"
      />
      <Suspense>
        <HologramCube />
      </Suspense>
      <OrbitControls />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </SceneWrapper>
</template>
