<script setup lang="ts">
import type { PBRUseTextureMap } from './index'
import { reactive } from 'vue'
import { useTexture } from './index'

const props = defineProps<PBRUseTextureMap>()

const data = await reactive(useTexture(props))
</script>

<template>
  <slot :textures="data"></slot>
</template>
