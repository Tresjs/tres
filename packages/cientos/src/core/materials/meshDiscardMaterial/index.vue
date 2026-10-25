<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { shallowRef } from 'vue'
import { MeshDiscardMaterial } from './MeshDiscardMaterial'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'

useWebGPUSupportWarning('MeshDiscardMaterial', 'uses a GLSL ShaderMaterial, which WebGPURenderer cannot compile. Import MeshDiscardMaterial from @tresjs/cientos/webgpu instead')

const meshDiscardMaterialRef = shallowRef()

const { extend } = useTresContext()

extend({ MeshDiscardMaterial })

defineExpose({ instance: meshDiscardMaterialRef })
</script>

<template>
  <TresMeshDiscardMaterial ref="meshDiscardMaterialRef" />
</template>
