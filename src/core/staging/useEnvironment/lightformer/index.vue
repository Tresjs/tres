<script setup lang="ts">
/* 
** This section of code is inspired by the Lightformer component from the drei library:
** https://github.com/pmndrs/drei/blob/master/src/core/Lightformer.tsx
** The Lightformer component in drei provides functionality for creating light probes in a scene.
*/
import { defineProps, ref, watchEffect } from 'vue'
import type { MeshBasicMaterial, Texture } from 'three'
import { Color, DoubleSide } from 'three'

const props = withDefaults(defineProps<{
  args?: any[]
  from?: 'circle' | 'ring' | 'rect' | any
  toneMapped?: boolean
  map?: Texture
  intensity?: number
  color?: any
}>(), {
  args: null as any,
  from: 'rect',
  toneMapped: false,
  map: null as any,
  intensity: 1,
  color: new Color(0xffffff),
})

const material = ref<MeshBasicMaterial>()
watchEffect(() => {
  if (material.value) {
    material.value.color.multiplyScalar(props.intensity)
    material.value.needsUpdate = true
  }
})
</script>

<template>
  <TresMesh>
    <TresRingGeometry
      v-if="from === 'circle'"
      :args="[0, 1, 64]"
    />
    <TresRingGeometry
      v-else-if="from === 'ring'"
      :args="[0.5, 1, 64]"
    />
    <TresPlaneGeometry v-else-if="from === 'rect'" />
    <props.from
      v-else
      :args="props"
    />

    <TresMeshBasicMaterial
      ref="material"
      :toneMapped="toneMapped"
      :map="map"
      :side="DoubleSide"
      :color="color"
    />
  </TresMesh>
</template>
