<script setup lang="ts">
import { useLocalNodes, useUniforms } from '@tresjs/core/webgpu'
import { fog, rangeFogFactor } from 'three/tsl'

const props = defineProps<{ color: string }>()

useUniforms({ uFogColor: () => props.color, uNear: 3, uFar: 10 }, 'fog')

// Install form: the returned function puts the nodes on the scene, and its return value removes them on unmount.
useLocalNodes(({ scene, uniforms }) => {
  const { uFogColor, uNear, uFar } = uniforms.fog
  const fogNode = fog(uFogColor, rangeFogFactor(uNear, uFar))

  return () => {
    scene.fogNode = fogNode
    scene.backgroundNode = uFogColor
    return () => {
      scene.fogNode = null
      scene.backgroundNode = null
    }
  }
})
</script>

<template>
  <slot></slot>
</template>
