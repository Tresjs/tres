<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'

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

const { extend } = useTresContext()
extend({ MeshWobbleMaterial })

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (materialRef.value) {
    materialRef.value.time = elapsed * props?.speed
  }
})
</script>
<template>
  <TresMeshWobbleMaterial ref="materialRef" :factor="factor" v-bind="$attrs" />
</template>
