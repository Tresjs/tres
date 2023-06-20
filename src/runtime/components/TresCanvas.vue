<script setup lang="ts">
import { TresCanvas as TC, TresCanvasProps } from '@tresjs/core';
defineProps<TresCanvasProps>()

const stateRef = ref()

defineExpose({
  state: stateRef
})
</script>

<template>
  <ClientOnly>
    <TC
      ref="stateRef"
      v-bind="$props"
    >
      <slot />
    </TC>
  </ClientOnly>
</template>
