<script setup lang="ts">
import type { PointsMaterial } from 'three'
import { shallowRef } from 'vue'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import type { StarsProps } from './props'
import { starsDefaults } from './props'
import { useStars } from './useStars'

const props = withDefaults(defineProps<StarsProps>(), starsDefaults)

useWebGPUSupportWarning('Stars', 'renders Points, which WebGPU draws at 1 pixel, so the size prop has no effect. Import Stars from @tresjs/cientos/webgpu instead')

const materialRef = shallowRef<PointsMaterial>()
const { positions, scales, materialProps } = useStars(props, materialRef)

const starsRef = shallowRef()

defineExpose({
  instance: starsRef,
})
</script>

<template>
  <TresPoints ref="starsRef">
    <TresBufferGeometry
      :position="[positions, 3]"
      :a-scale="[scales, 1]"
    />
    <TresPointsMaterial ref="materialRef" v-bind="materialProps" />
  </TresPoints>
</template>
