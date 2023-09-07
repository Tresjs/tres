<script setup lang="ts">
import { shallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'

import MeshGlassMaterial from './material'

const MeshGlassMaterialClass = shallowRef()

const { extend } = useTresContext()

extend({ MeshGlassMaterial })

defineExpose({ MeshGlassMaterialClass })
</script>

<template>
  <TresMeshGlassMaterial ref="MeshGlassMaterialClass" />
</template>
