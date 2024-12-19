<script setup lang="ts">
import type { PBRUseTextureMap } from './index.js'
import { reactive } from 'vue'
import { useTexture } from './index.js'

const props = defineProps<PBRUseTextureMap>()

const data = await reactive(useTexture(props))
</script>

<template>
  <slot :textures="data"></slot>
</template>
