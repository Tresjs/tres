<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { WebGPURenderer } from 'three/webgpu'
import type { TresContext } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import HologramCube from './HologramCube.vue'

const createWebGPURenderer = async (ctx: TresContext) => {
  const renderer = new WebGPURenderer({
    canvas: ctx.canvas.value,
  })
  // Initialize WebGPU context
  await renderer.init()
  renderer.setClearColor('#000000')

  // Watch size changes
  watch([ctx.sizes.width, ctx.sizes.height], () => {
    renderer.setSize(ctx.sizes.width.value, ctx.sizes.height.value)
  }, {
    immediate: true,
  })

  return renderer
}
</script>

<template>
  <TresCanvas :renderer="createWebGPURenderer" clear-color="black">
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
</template>
