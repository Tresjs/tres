<script setup lang="ts">
import { reactive } from 'vue'
import { useTexture } from './index'
import type { PBRUseTextureMap } from './index'

const props = defineProps<PBRUseTextureMap>()

const data = await reactive(useTexture(props))
</script>
<template>
  <slot :textures="data"></slot>
</template>
