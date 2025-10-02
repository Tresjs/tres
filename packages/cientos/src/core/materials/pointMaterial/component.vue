<script setup lang="ts">
import { onUnmounted, shallowRef, watch } from 'vue'
import { extend } from '@tresjs/core'
import { PointMaterial as PointMaterialImpl } from './material'

const props = defineProps<{
  sizeAttenuation?: boolean
}>()

extend({ PointMaterial: PointMaterialImpl })

const materialRef = shallowRef(new PointMaterialImpl({ sizeAttenuation: props.sizeAttenuation }))

watch(() => props.sizeAttenuation, () => {
  // NOTE: sizeAttenuation does not appear to work
  // reactively without recreating the material.
  if (materialRef.value) {
    materialRef.value.dispose()
  }
  materialRef.value = new PointMaterialImpl({ sizeAttenuation: props.sizeAttenuation })
})

onUnmounted(() => {
  if (materialRef.value && materialRef.value.dispose) {
    materialRef.value.dispose()
  }
})

defineExpose({ instance: materialRef })
</script>

<template>
  <primitive :object="materialRef" />
</template>
