<script setup lang="ts">
import { useRenderLoop, extend } from '@tresjs/core'

import { WobbleMaterialImpl as MeshWobbleMaterial } from './material'
import { shallowRef, watchEffect } from 'vue'

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

extend({ MeshWobbleMaterial })

const { onLoop } = useRenderLoop()

watchEffect(() => {
  console.log(materialRef.value)
})

onLoop(({ elapsed }) => {
  if (materialRef.value) {
    materialRef.value.time = elapsed * props?.speed
  }
})
</script>
<template>
  <TresMeshWobbleMaterial ref="materialRef" :factor="factor" v-bind="$attrs" />
</template>
