<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { WebGPURenderer } from 'three/webgpu'
import type { TresRendererSetupContext } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import HologramCube from './HologramCube.vue'

const createWebGPURenderer = async (ctx: TresRendererSetupContext) => {
  const renderer = new WebGPURenderer({
    canvas: toValue(ctx.canvas),
    // WebGPU specific configuration
    alpha: true,
    antialias: true,
    // Note: Tone mapping in WebGPU is handled through the render pipeline
    // and shader configuration, not through renderer properties
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
