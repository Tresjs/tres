<script setup lang="ts">
defineProps({
  active: Boolean,
})

onMounted(() => {
  console.log('card mounted')
})
</script>

<template>
  <div
    class=" shadow-lg transition-all duration-1000 p-2 rounded-lg"
    :class="active ? 'bg-light' : 'bg-dark'"
  >
    I'm a card {{ active ? '📦' : '📭' }}
  </div>
</template>