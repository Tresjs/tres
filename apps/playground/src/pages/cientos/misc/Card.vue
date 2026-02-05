<script setup lang="ts">
const props = defineProps({
  active: Boolean,
  borderRounded: {
    type: Boolean,
    default: true,
  },
})

const { active, borderRounded } = toRefs(props)
</script>

<template>
  <div
    style="white-space:nowrap"
    class="transition-all duration-1000 p-2 rounded-lg"
    :class="[active ? 'bg-light' : 'bg-dark', active ? 'text-dark' : 'text-light', borderRounded ? 'rounded-full' : 'rounded-none']"
  >
    <slot>
      I'm a card {{ active ? '📦' : '📭' }}
    </slot>
  </div>
</template>
