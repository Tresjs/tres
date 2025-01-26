<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const constrols = useControls({
  awiwi: true,
})
</script>

<template>
  <div class="w-full h-full bg-gray-200 p-4 dark:bg-dark-800 mb-8 ">
    <div class="container h-full mx-auto grid grid-cols-2 gap-8 items-center">
      <div class="relative">
        <h3 class="text-sm font-bold mb-2">No float</h3>

        <pre class="bg-dark p-4 rounded text-white text-xs">{{ constrols }}</pre>
      </div>
      <div>
        <TresLeches :float="false" />
      </div>
    </div>
  </div>
</template>
