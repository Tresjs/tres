<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'fps-demo'
useControls('fpsgraph', {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 dark:bg-dark-800 mb-8 relative flex justify-center items-center">
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
