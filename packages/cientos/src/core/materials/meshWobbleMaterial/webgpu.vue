<script setup lang="ts">
import { useLoop, useTres } from '@tresjs/core'
import { shallowRef, watch } from 'vue'

import { MeshWobbleNodeMaterial } from './MeshWobbleNodeMaterial'
import type { MeshWobbleMaterialProps } from './props'
import { meshWobbleMaterialDefaults } from './props'

const props = withDefaults(defineProps<MeshWobbleMaterialProps>(), meshWobbleMaterialDefaults)

const materialRef = shallowRef<MeshWobbleNodeMaterial>()

const { extend, invalidate } = useTres()

extend({ MeshWobbleNodeMaterial })

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
  <TresMeshWobbleNodeMaterial
    ref="materialRef"
    :factor="factor"
  />
</template>
