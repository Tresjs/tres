<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { shallowRef } from 'vue'
import { MeshDiscardNodeMaterial } from './MeshDiscardNodeMaterial'

const meshDiscardMaterialRef = shallowRef<MeshDiscardNodeMaterial>()

const { extend } = useTresContext()

extend({ MeshDiscardNodeMaterial })

defineExpose({ instance: meshDiscardMaterialRef })
</script>

<template>
  <TresMeshDiscardNodeMaterial ref="meshDiscardMaterialRef" />
</template>
