<script setup lang="ts">
import { Vector3 } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'vector3'
const { position } = useControls({
  position: new Vector3(0, 1, 2),
}, {
  uuid,
})
</script>

<template>
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview">{{ position }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
