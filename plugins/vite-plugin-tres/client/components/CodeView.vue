<script setup>
const { internal } = useDevtoolsHook()

const code = computed(() => JSON.stringify(internal.selectedObject, null, 2).trim())
</script>

<template>
  <pre class="bg-gray-100 dark:bg-gray-800 rounded p2 text-xs">
    <code>{{ code }}</code>
  </pre>
</template>