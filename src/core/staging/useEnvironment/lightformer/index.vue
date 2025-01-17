<script setup lang="ts">
import { Color, DoubleSide } from 'three'
/*
** This section of code is inspired by the Lightformer component from the drei library:
** https://github.com/pmndrs/drei/blob/master/src/core/Lightformer.tsx
** The Lightformer component in drei provides functionality for creating light probes in a scene.
*/
import { ref, watchEffect } from 'vue'
import type { MeshBasicMaterial, Texture } from 'three'

const props = withDefaults(defineProps<{
  args?: any[]
  form?: 'circle' | 'ring' | 'rect' | any
  toneMapped?: boolean
  map?: Texture
  intensity?: number
  color?: any
}>(), {
  args: null as any,
  form: 'rect',
  toneMapped: false,
  map: null as any,
  intensity: 1,
  color: new Color(0xFFFFFF),
})

const material = ref<MeshBasicMaterial>()
const mesh = ref()

watchEffect(() => {
  if (material.value) {
    // Reset color before applying intensity to avoid accumulation
    material.value.color.copy(new Color(props.color))
    material.value.color.multiplyScalar(props.intensity)
    material.value.needsUpdate = true
  }
})

// Expose mesh for parent components
defineExpose({ mesh })
</script>

<template>
  <TresMesh ref="mesh">
    <TresRingGeometry
      v-if="form === 'circle'"
      :args="[0, 1, 64]"
    />
    <TresRingGeometry
      v-else-if="form === 'ring'"
      :args="[0.5, 1, 64]"
    />
    <TresPlaneGeometry v-else-if="form === 'rect'" />
    <props.form
      v-else
      :args="args"
    />

    <TresMeshBasicMaterial
      ref="material"
      :tone-mapped="toneMapped"
      :map="map"
      :side="DoubleSide"
      :color="color"
    />
  </TresMesh>
</template>
