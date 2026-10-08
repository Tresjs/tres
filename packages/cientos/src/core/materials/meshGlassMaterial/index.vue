<script setup lang="ts">
import { extend } from '@tresjs/core'
import { shallowRef } from 'vue'

import MeshGlassMaterial from './MeshGlassMaterial'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'

useWebGPUSupportWarning('MeshGlassMaterial', 'relies on WebGL shader defines and renders as a plain standard material. Import MeshGlassMaterial from @tresjs/cientos/webgpu instead')

const materialRef = shallowRef()

extend({ MeshGlassMaterial })

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshGlassMaterial ref="materialRef" />
</template>
