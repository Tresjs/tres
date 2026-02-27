<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useBVH, useGLTF } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const uuid = inject('uuid')

// Load a model with good triangle count to demonstrate BVH benefits
const { state: model } = useGLTF('/models/Artificer.glb')

// Controls for BVH options
const { enabled, debug } = useControls({
  enabled: true,
  debug: false,
}, { uuid })

// BVH composable with reactive controls
useBVH(
  () => model.value?.scene,
  {
    enabled,
    debug,
    verbose: false,
  },
)
</script>

<template>
  <TresCanvas clear-color="#111111">
    <TresPerspectiveCamera :position="[3, 3, 5]" :look-at="[0,1,0]" />
    <OrbitControls :target="[0,1,0]" />

    <primitive v-if="model" :object="model.scene" />

    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[-5, 5, 5]" :intensity="1" />

  </TresCanvas>
</template>
