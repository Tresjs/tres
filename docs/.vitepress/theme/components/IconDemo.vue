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
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview">{{ camera }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
