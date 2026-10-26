<script setup lang="ts">
import { extend } from '@tresjs/core'
import { onMounted, onUpdated, shallowRef } from 'vue'
import { PointNodeMaterial } from './PointNodeMaterial'
import type { PointMaterialProps } from './props'

defineProps<PointMaterialProps>()

extend({ PointNodeMaterial })

const materialRef = shallowRef<PointNodeMaterial>()

const shaderKey = (m: PointNodeMaterial) =>
  [m.sizeAttenuation, m.transparent, m.blending, m.alphaToCoverage, m.vertexColors, !!m.map, !!m.alphaMap, m.alphaTest > 0].join()

// Tres patches props without a version bump, and the node builder reads these only when it builds.
let lastKey = ''
onMounted(() => {
  if (materialRef.value) { lastKey = shaderKey(materialRef.value) }
})
onUpdated(() => {
  const material = materialRef.value
  if (!material) { return }
  const key = shaderKey(material)
  if (key !== lastKey) { material.needsUpdate = true }
  lastKey = key
})

defineExpose({ instance: materialRef })
</script>

<template>
  <TresPointNodeMaterial ref="materialRef" :size-attenuation="sizeAttenuation" />
</template>
