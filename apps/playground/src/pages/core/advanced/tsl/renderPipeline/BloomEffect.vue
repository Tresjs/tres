<script setup lang="ts">
import { useRenderPipeline, useUniforms } from '@tresjs/core/webgpu'
import { bloom } from 'three/addons/tsl/display/BloomNode.js'

const props = defineProps<{ strength: number, threshold: number }>()

useUniforms({ uStrength: () => props.strength, uThreshold: () => props.threshold }, 'bloom')

// Runs once per scene pass (and on camera changes), not when the sliders move: the sliders write uniforms.
useRenderPipeline(({ renderPipeline, passes, uniforms }) => {
  const { uStrength, uThreshold } = uniforms.bloom
  const sceneColor = passes.scenePass.getTextureNode()
  renderPipeline.outputNode = sceneColor.add(bloom(sceneColor, uStrength, 0.4, uThreshold))
})
</script>

<template>
  <slot></slot>
</template>
