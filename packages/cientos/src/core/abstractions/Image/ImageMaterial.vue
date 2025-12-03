<script setup lang="ts">
import { shallowRef } from 'vue'
import { extend } from '@tresjs/core'
import { imageMaterialImpl } from './ImageMaterialImpl'

extend({ ImageMaterial: imageMaterialImpl })

const materialRef = shallowRef()

defineExpose({ instance: materialRef })
</script>

<template>
  <TresImageMaterial ref="materialRef" />
</template>
