<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { BufferAttribute } from 'three'
import type { LineSegments } from 'three'
import { ref } from 'vue'

import { useRapierContext } from '../composables/useRapier'

const { world } = useRapierContext()
const { onBeforeRender } = useLoop()

const lineSegmentsRef = ref<LineSegments | null>(null)

onBeforeRender(() => {
  // No boundingSphere check: three sets it once on the first render (empty geometry, radius -1)
  // and never updates it, so it is not a readiness signal. Culling is off in the template instead.
  if (!world?.value || !lineSegmentsRef.value?.geometry) { return }

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
    <!--
      frustum-culled=false: the bounding sphere goes stale as the positions change every frame.
      White base color: vertex colors multiply it, so any other color darkens Rapier's palette.
      depth-test=false + high render order: draw colliders on top of the meshes that contain them.
    -->
    <TresLineSegments ref="lineSegmentsRef" :frustum-culled="false" :render-order="999">
      <TresLineBasicMaterial color="#ffffff" vertex-colors :depth-test="false" />
      <TresBufferGeometry />
    </TresLineSegments>
  </TresGroup>
</template>
