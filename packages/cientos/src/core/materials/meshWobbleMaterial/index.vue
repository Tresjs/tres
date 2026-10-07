<script setup lang="ts">
import { useLoop, useTres } from '@tresjs/core'
import { shallowRef, watch } from 'vue'

import { WobbleMaterialImpl as MeshWobbleMaterial } from './material'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'

const props = withDefaults(
  defineProps<{
    speed?: number
    factor?: number
  }>(),
  {
    speed: 1,
    factor: 1,
  },
)

useWebGPUSupportWarning('MeshWobbleMaterial', 'patches the shader with onBeforeCompile, which WebGPURenderer ignores')

const materialRef = shallowRef()

const { extend, invalidate } = useTres()

extend({ MeshWobbleMaterial })

watch(props, () => {
  invalidate()
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (materialRef.value) {
    materialRef.value.time = elapsed * props?.speed
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
