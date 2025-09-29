<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { shallowRef } from 'vue'
import { MeshDiscardMaterial } from './material'

const meshDiscardMaterialRef = shallowRef()

const { extend } = useTresContext()

extend({ MeshDiscardMaterial })

defineExpose({ instance: meshDiscardMaterialRef })
</script>

<template>
  <TresMeshDiscardMaterial ref="meshDiscardMaterialRef" />
</template>
