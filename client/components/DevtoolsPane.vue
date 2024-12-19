<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div
    class="relative
    px-4
    py-6
    border
    border-solid
    border-gray-200
    rounded
    my-4"
  >
    <span
      class="absolute
      bg-white
      text-xs
      dark:bg-[#151515]
      text-gray-400
      px-2
      rounded
      -top-2
      left-2"
    >{{ title }}</span>
    <slot />
  </div>
</template>
