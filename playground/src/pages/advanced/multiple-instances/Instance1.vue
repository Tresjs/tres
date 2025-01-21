<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'instance1'
const control = useControls({
  awiwi: true,
}, {
  uuid,
})
</script>

<template>
  <div class="relative w-1/2 h-480px bg-gray-200">
    <TresLeches
      :uuid="uuid"
    />
    <div class="font-sans p-4">
      <h1>
        Instance 1
      </h1>
      <pre>{{ control }}</pre>
    </div>
  </div>
</template>
