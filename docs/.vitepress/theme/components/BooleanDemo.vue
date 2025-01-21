<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'boolean'
const { awiwi } = useControls({
  awiwi: true,
}, {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4">
      <pre class="bg-dark p-8 rounded text-white">awiwi: {{ awiwi }}</pre>
    </div>
    <div class="relative w-280px min-h-200px">
      <TresLeches
        :uuid="uuid"
      />
    </div>
  </div>
</template>
