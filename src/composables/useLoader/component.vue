<script setup lang="ts">
import type { LoaderProto } from './index'
import { reactive } from 'vue'
import { useLoader } from './index'

const props = defineProps<{
  loader: LoaderProto<unknown>
  url: string | string[]
}>()

const data = await reactive(useLoader(props.loader, props.url))
</script>

<template>
  <slot :data="data"></slot>
</template>
