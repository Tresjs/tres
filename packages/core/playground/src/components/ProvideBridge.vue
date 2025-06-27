<!-- ProvideBridge.vue -->
<script setup lang="ts">
import { provide } from 'vue'

interface Props {
  keysValues: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  keysValues: () => ({}),
})
for (const [key, value] of Object.entries(props.keysValues)) {
  provide(key, value)
}
</script>

<template>
  <TresGroup>
    <slot></slot>
  </TresGroup>
</template>
