<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import type { LineSegments } from 'three'
import { BufferAttribute } from 'three'
import { ref } from 'vue'
import { useRapierContext } from '../composables/useRapier'

const { world } = await useRapierContext()
const lineSegmentsRef = ref<LineSegments | null>(null)

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (!world || !lineSegmentsRef.value) { return }
  world.step()

  const buffers = world.debugRender()

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
      <TresLineBasicMaterial
        color="#ff0000"
        vertex-colors
      />
      <TresBufferGeometry />
    </TresLineSegments>
  </TresGroup>
</template>
