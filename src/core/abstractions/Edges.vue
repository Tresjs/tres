<script setup lang="ts">
import { ref, shallowRef, toRefs, watch } from 'vue'
import type { LineSegments } from 'three'
import { BufferGeometry, EdgesGeometry } from 'three'
import type { TresColor } from '@tresjs/core'

export interface EdgesProps {
  color?: TresColor
  threshold?: number
}

const props = withDefaults(defineProps<EdgesProps>(), {
  color: '#ff0000',
  threshold: 15,
})

const { color, threshold } = toRefs(props)

const lineSegmentsRef = shallowRef<LineSegments>()
const saveGeometry = ref<BufferGeometry | null>(null)
const saveThreshold = ref<number>(1)

defineExpose({
  instance: lineSegmentsRef,
})

// Watch for changes in lineSegments, thresholdAngle, and color.
watch(
  () => [lineSegmentsRef.value, threshold.value],
  () => {
    if (lineSegmentsRef.value) {
      const parent = lineSegmentsRef.value.parent

      if (parent && 'geometry' in parent && parent.geometry instanceof BufferGeometry) {
        const geometry = parent.geometry

        // Update geometry and threshold if necessary.
        if (
          geometry !== saveGeometry.value || threshold.value !== saveThreshold.value
        ) {
          saveGeometry.value = geometry
          saveThreshold.value = threshold.value

          lineSegmentsRef.value.geometry = new EdgesGeometry(geometry, threshold.value)
        }
      }
    }
  },
)
</script>

<template>
  <TresLineSegments
    ref="lineSegmentsRef"
    v-bind="$attrs"
  >
    <slot>
      <TresLineBasicMaterial :color="color" />
    </slot>
  </TresLineSegments>
</template>
