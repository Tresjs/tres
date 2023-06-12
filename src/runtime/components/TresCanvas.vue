<script setup lang="ts">
import { TresCanvas as TC, TresCanvasProps } from '@tresjs/core';
defineProps<TresCanvasProps>()
</script>

<template>
  <ClientOnly>
    <TC v-bind="$props">
      <slot />
    </TC>
  </ClientOnly>
</template>
