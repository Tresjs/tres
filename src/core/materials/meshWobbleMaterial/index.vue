<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { shallowRef, watch } from 'vue'

import { WobbleMaterialImpl as MeshWobbleMaterial } from './material'

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

const materialRef = shallowRef()

const { extend, invalidate } = useTresContext()

extend({ MeshWobbleMaterial })

watch(props, () => invalidate())

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed, invalidate }) => {
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
    v-bind="$attrs"
  />
</template>
