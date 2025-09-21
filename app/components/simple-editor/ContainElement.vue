<script setup lang="ts">
import { useElementSize, useParentElement } from '@vueuse/core'

const props = defineProps({
  enabled: { type: Boolean, default: true },
  aspectRatio: { type: Number, required: true },
})

const containerRef = ref<HTMLElement | null>(null)
const parentElementRef = useParentElement()

const { width, height } = useElementSize(parentElementRef)

const containerAspectRatio = computed(() => width.value / height.value)

const isLandscape = computed(() => props.aspectRatio < containerAspectRatio.value)
const containedWidth = computed(() => isLandscape.value ? height.value * props.aspectRatio : width.value)
const containedHeight = computed(() => isLandscape.value ? height.value : width.value / props.aspectRatio)
</script>

<template>
  <div
    ref="containerRef"
    class="absolute"
    :style="{
      width: `${enabled ? containedWidth : width}px`,
      height: `${enabled ? containedHeight : height}px`,
    }"
  >
    <slot />
  </div>
</template>

