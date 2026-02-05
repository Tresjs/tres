<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useGLTF, useBVH } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const uuid = inject('uuid')

// Load a model with good triangle count to demonstrate BVH benefits
const { state: model } = useGLTF('/feather.glb')

// Controls for BVH options
const { enabled, debug } = useControls({
  enabled: true,
  debug: false,
}, { uuid })

// BVH composable with reactive controls
const { applyBVHWhenReady, meshCount } = useBVH({
  enabled,
  debug,
  verbose: false,
})

// Apply BVH when model loads
applyBVHWhenReady(() => model.value?.scene)
</script>

<template>
  <TresCanvas clear-color="#111111">
    <TresPerspectiveCamera :position="[3, 3, 5]" />
    <OrbitControls />

    <primitive v-if="model" :object="model.scene" />

    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
  </TresCanvas>
</template>
