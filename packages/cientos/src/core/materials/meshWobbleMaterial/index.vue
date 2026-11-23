<script setup lang="ts">
import { useLoop, useTres } from '@tresjs/core'
import { shallowRef, watch } from 'vue'

import { MeshWobbleMaterial } from './MeshWobbleMaterial'
import type { MeshWobbleMaterialProps } from './props'
import { meshWobbleMaterialDefaults } from './props'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'

const props = withDefaults(defineProps<MeshWobbleMaterialProps>(), meshWobbleMaterialDefaults)

useWebGPUSupportWarning('MeshWobbleMaterial', 'patches the shader with onBeforeCompile, which WebGPURenderer ignores. Import MeshWobbleMaterial from @tresjs/cientos/webgpu instead')

const materialRef = shallowRef<MeshWobbleMaterial>()

const { extend, invalidate } = useTres()

extend({ MeshWobbleMaterial })

watch(props, () => {
  invalidate()
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (materialRef.value) {
    materialRef.value.time = elapsed * props.speed
    invalidate()
  }
})

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshWobbleMaterial
    ref="materialRef"
    :factor="factor"
  />
</template>
