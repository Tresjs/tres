<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid1 = 'demo-instance1'
const controls1 = useControls({
  scale: {
    value: 1,
    min: 0.1,
    max: 2,
    step: 0.1,
  },
  color: '#ff0000',
}, {
  uuid: uuid1,
})

const uuid2 = 'demo-instance2'
const controls2 = useControls({
  rotation: {
    value: 0,
    min: 0,
    max: 360,
    step: 1,
  },
  visible: true,
}, {
  uuid: uuid2,
})
</script>

<template>
  <div class="w-full min-h-300px bg-gray-200 p-4 dark:bg-dark-800 mb-8 relative grid grid-cols-2 gap-8 items-center">
    <div class="relative">
      <h3 class="text-sm font-bold !mb-4">Instance 1</h3>
      <TresLeches :uuid="uuid1" :float="false" />
      <pre class="bg-dark p-4 rounded text-white text-xs">{{ controls1 }}</pre>
    </div>
    <div class="relative">
      <h3 class="text-sm font-bold !mb-4">Instance 2</h3>
      <TresLeches :uuid="uuid2" :float="false" />
      <pre class="bg-dark p-4 rounded text-white text-xs">{{ controls2 }}</pre>
    </div>
  </div>
</template>
