<script lang="ts" setup>
import { useAbsolutePosition } from '.'
import type { UseAbsolutePositionOptions } from './index'

const props = defineProps<UseAbsolutePositionOptions>()

const { position: absolutePosition } = useAbsolutePosition(props)
</script>

<template>
  <TresGroup :position="absolutePosition">
    <slot></slot>
  </TresGroup>
</template>
