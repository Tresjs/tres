<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { Vector3 } from 'three'

const uuid = 'icon'
const { camera } = useControls({
  camera: {
    label: 'Camera Position',
    value: new Vector3(0, 0, 0),
    icon: 'i-carbon-camera',
  },
}, {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 dark:bg-dark-800 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4">
      <pre class="bg-dark p-8 rounded text-white">{{ camera }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
