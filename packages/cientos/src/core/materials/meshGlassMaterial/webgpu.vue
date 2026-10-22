<script setup lang="ts">
import { extend } from '@tresjs/core'
import { shallowRef } from 'vue'
import { MeshGlassNodeMaterial } from './MeshGlassNodeMaterial'

const materialRef = shallowRef()

extend({ MeshGlassNodeMaterial })

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshGlassNodeMaterial ref="materialRef" />
</template>
