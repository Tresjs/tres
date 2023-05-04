<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'

import { useCientos } from '/@/core/useCientos'
import { WobbleMaterialImpl as MeshWobbleMaterial } from './material'
import { shallowRef } from 'vue'

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

const { extend } = useCientos()
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
