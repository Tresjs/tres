<script setup lang="ts">
import { shallowRef } from 'vue'
import { extend } from '@tresjs/core'
import ImageMaterial from './ImageMaterialImpl'

extend({ ImageMaterial })

const materialRef = shallowRef()

defineExpose({ instance: materialRef })
</script>

<template>
  <TresImageMaterial ref="materialRef" />
</template>
