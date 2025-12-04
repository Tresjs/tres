<script setup lang="ts">
import { shallowRef } from 'vue'
import { extend } from '@tresjs/core'
import { ImageMaterialImpl } from './ImageMaterialImpl'

extend({ ImageMaterial: ImageMaterialImpl })

const materialRef = shallowRef()

defineExpose({ instance: materialRef })
</script>

<template>
  <TresImageMaterial ref="materialRef" />
</template>
