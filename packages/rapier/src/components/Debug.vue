<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { BufferAttribute, type LineSegments } from 'three'
import { ref } from 'vue'

import { useRapierContext } from '../composables/useRapier'

const { world } = useRapierContext()
const { onBeforeRender } = useLoop()

const lineSegmentsRef = ref<LineSegments | null>(null)

onBeforeRender(() => {
  if (!world || !lineSegmentsRef.value?.geometry?.boundingSphere) { return }

  const buffers = world.value.debugRender()

  lineSegmentsRef.value.geometry.setAttribute(
    'position',
    new BufferAttribute(buffers.vertices, 3),
  )
  lineSegmentsRef.value.geometry.setAttribute('color', new BufferAttribute(buffers.colors, 4))
})
</script>

<template>
  <TresGroup>
    <TresLineSegments ref="lineSegmentsRef">
      <TresLineBasicMaterial color="#ff0000" vertex-colors />
      <TresBufferGeometry />
    </TresLineSegments>
  </TresGroup>
</template>
