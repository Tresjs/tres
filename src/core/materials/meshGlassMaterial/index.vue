<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { shallowRef } from 'vue'

import MeshGlassMaterial from './material'

const MeshGlassMaterialClass = shallowRef()

const { extend } = useTresContext()

extend({ MeshGlassMaterial })

defineExpose({ instance: MeshGlassMaterialClass })
</script>

<template>
  <TresMeshGlassMaterial ref="MeshGlassMaterialClass" />
</template>
