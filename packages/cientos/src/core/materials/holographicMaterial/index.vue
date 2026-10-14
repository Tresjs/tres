<script setup lang="ts">
import { extend, useLoop } from '@tresjs/core'
import { computed, shallowRef } from 'vue'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'
import HolographicMaterial from './HolographicMaterial'
import type { HolographicMaterialProps } from './props'
import { holographicDefaults, toHolographicMaterialProps } from './props'

const props = withDefaults(defineProps<HolographicMaterialProps>(), holographicDefaults)

useWebGPUSupportWarning('HolographicMaterial', 'uses a GLSL ShaderMaterial, which WebGPURenderer cannot compile. Import HolographicMaterial from @tresjs/cientos/webgpu instead')

extend({ HolographicMaterial })

const materialRef = shallowRef<HolographicMaterial>()

defineExpose({ root: materialRef, constructor: HolographicMaterial })

const materialProps = computed(() => toHolographicMaterialProps(props))

// The GLSL `time` uniform needs a per-frame update. The TSL version reads the `time` node instead.
useLoop().onBeforeRender(() => {
  materialRef.value?.update()
  // TODO: comment this until invalidate is back in the loop callback on v5
  // invalidate()
})
</script>

<template>
  <TresHolographicMaterial ref="materialRef" v-bind="materialProps" />
</template>
