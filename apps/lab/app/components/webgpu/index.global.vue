<script setup lang="ts">
import { WebGPURenderer } from 'three/webgpu'
import type { TresRendererSetupContext } from '@tresjs/core'
import { DoubleSide } from 'three'

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
  <TresCanvas :renderer="createWebGPURenderer">
    <TresPerspectiveCamera
      :position="[5, 2.2, 15]"
      :look-at="[0, 2, 0]"
      :fov="25"
    />

    <WebgpuHologramCube />
    <OrbitControls :target="[0, 1, 0]" />

    <TresMesh :scale="[100, 100, 1]" :position="[0, -0.1, 0]" :rotation-x="-Math.PI / 2" receive-shadow>
       <TresPlaneGeometry  />
      <TresMeshPhysicalMaterial color="#A590FF" :side="DoubleSide" />
    </TresMesh>
    <TresFog color="#000" :near="2" :far="50" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight color="#FF3F00" :intensity="0.6" :position="[3, 3, 3]" :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024" :shadow-camera-far="50" :shadow-camera-left="-10" :shadow-camera-right="10"
      :shadow-camera-top="10" :shadow-camera-bottom="-10" :shadow-bias="-0.000001" cast-shadow />
    <TresDirectionalLight color="white" :intensity="0.4" :position="[2, 1, 3]" :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024" :shadow-camera-far="50" :shadow-camera-left="-10" :shadow-camera-right="10"
      :shadow-camera-top="10" :shadow-camera-bottom="-10" :shadow-bias="-0.000001" />
    <TheScreenshot />
  </TresCanvas>
</template>
