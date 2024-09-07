<script setup lang="ts">
import { reactive } from 'vue'
import type { Loader } from 'three'
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
