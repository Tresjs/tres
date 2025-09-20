<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

useControls('fpsgraph')
</script>

<template>
  <div
    class="aspect-video pattern-dot-bg relative w-full h-full flex items-center justify-center border border-gray-200 dark:border-default rounded-lg"
  >
    <TresLeches />
  </div>
</template>
