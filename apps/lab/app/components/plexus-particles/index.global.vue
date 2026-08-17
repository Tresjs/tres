<script setup lang="ts">
import { WebGPURenderer } from 'three/webgpu'
import { ACESFilmicToneMapping } from 'three'
import type { TresRendererSetupContext } from '@tresjs/core'

const createWebGPURenderer = (ctx: TresRendererSetupContext) =>
  new WebGPURenderer({
    canvas: toValue(ctx.canvas),
    antialias: true,
  })
</script>

<template>
  <TheLoadingScreen background="#14171a" text-color="#ffffff" />
  <ClientOnly>
    <TresLeches uuid="plexus-particles" />
  </ClientOnly>
  <TresCanvas
    :renderer="createWebGPURenderer"
    clear-color="#14171a"
    :tone-mapping="ACESFilmicToneMapping"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 0, 10]" :fov="60" :near="0.1" :far="200" />
    <PlexusParticlesThePlexus />
    <OrbitControls :auto-rotate="true" :enable-damping="true" :max-distance="75" />
    <TheScreenshot />
  </TresCanvas>
</template>
