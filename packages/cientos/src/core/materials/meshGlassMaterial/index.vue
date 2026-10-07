<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { shallowRef } from 'vue'

import MeshGlassMaterial from './material'
import { useWebGPUSupportWarning } from '../../../utils/useWebGPUSupportWarning'

useWebGPUSupportWarning('MeshGlassMaterial', 'relies on WebGL shader defines and renders as a plain standard material')

const MeshGlassMaterialClass = shallowRef()

const { extend } = useTresContext()

extend({ MeshGlassMaterial })

defineExpose({ instance: MeshGlassMaterialClass })
</script>

<template>
  <TresMeshGlassMaterial ref="MeshGlassMaterialClass" />
</template>
