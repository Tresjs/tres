<script setup lang="ts">
import { useAttrs } from '#imports'
import { TresCanvas as CoreTresCanvas } from '@tresjs/core'

const attrs = useAttrs()
</script>

<template>
  <CoreTresCanvas v-bind="attrs">
    <slot />
  </CoreTresCanvas>
</template>
