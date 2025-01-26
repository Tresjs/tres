<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { Euler, Vector3 } from 'three'

const uuid = 'folder-demo'
const canvasControls = useControls('Canvas', {
  clearColor: '#008080',
  shadows: true,
}, {
  uuid,
})
const cameraControls = useControls('Camera', {
  position: {
    value: new Vector3(0, 0, 0),
    label: 'Position',
  },
  rotation: {
    value: new Euler(0, 0, 0),
    label: 'Rotation',
  },
}, {
  uuid,
})
</script>

<template>
  <div
    class="w-full h-500px bg-gray-200 dark:bg-dark-800 mb-8 relative grid grid-cols-2 gap-16 items-center"
  >
    <div class="p-4 text-xs">
      <pre class="leches-demo-preview"> {{ canvasControls }}</pre>
      <pre class="leches-demo-preview"> {{ cameraControls }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
