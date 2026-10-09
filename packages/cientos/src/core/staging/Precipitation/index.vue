<script setup lang="ts">
import type { PointsMaterial } from 'three'
import { shallowRef } from 'vue'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import type { PrecipitationProps } from './props'
import { precipitationDefaults } from './props'
import { usePrecipitation } from './usePrecipitation'

const props = withDefaults(defineProps<PrecipitationProps>(), precipitationDefaults)

useWebGPUSupportWarning('Precipitation', 'renders Points, which WebGPU draws at 1 pixel, so the size prop has no effect. Import Precipitation from @tresjs/cientos/webgpu instead')

const geometryRef = shallowRef()
const materialRef = shallowRef<PointsMaterial>()
const { positions, materialProps, onPositionsMoved } = usePrecipitation(props, materialRef)

// Tres builds the attribute on `positions` without a copy, so it holds the moved array.
onPositionsMoved(() => {
  const attribute = geometryRef.value?.attributes.position
  if (attribute) { attribute.needsUpdate = true }
})

const pointsRef = shallowRef()
defineExpose({ instance: pointsRef })
</script>

<template>
  <TresPoints ref="pointsRef">
    <TresPointsMaterial ref="materialRef" v-bind="materialProps" />
    <TresBufferGeometry
      ref="geometryRef"
      :position="[positions, 3]"
    />
  </TresPoints>
</template>
