<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { shallowRef } from 'vue'
import { MeshDiscardMaterial } from './material'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'

useWebGPUSupportWarning('MeshDiscardMaterial', 'uses a GLSL ShaderMaterial, which WebGPURenderer cannot compile')

const meshDiscardMaterialRef = shallowRef()

const { extend } = useTresContext()

extend({ MeshDiscardMaterial })

defineExpose({ instance: meshDiscardMaterialRef })
</script>

<template>
  <TresMeshDiscardMaterial ref="meshDiscardMaterialRef" />
</template>
