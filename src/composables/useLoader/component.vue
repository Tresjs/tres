<script setup lang="ts">
import type { Loader } from 'three'
import { reactive } from 'vue'
import { useLoader } from './index'

const props = defineProps<{
  loader: Loader
  url: string | string[]
}>()

const data = await reactive(useLoader(props.loader, props.url))
</script>

<template>
  <slot :data="data"></slot>
</template>
