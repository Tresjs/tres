<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useUpdate } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const sphereRef = ref()
const { pause, resume } = useUpdate((state) => {
  if (!sphereRef.value) { return }
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
})

const { areUpdatesPaused } = useControls({
  areUpdatesPaused: {
    value: false,
    type: 'boolean',
    label: 'Pause Updates',
  },
})

watchEffect(() => {
  if (areUpdatesPaused.value) {
    pause()
  }
  else {
    resume()
  }
})

/* useUpdate(() => {
  console.count('update loop 1')
})

useUpdate(() => {
  console.count('update loop 2')
}) */

/* useUpdate(() => {
  console.count('before renderer')
}, -1)

useUpdate(() => {
  console.log('this should be just before render')
})

useUpdate((state) => {
  if (!sphereRef.value) { return }
  console.count('after renderer')
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
}, 2) */
</script>

<template>
  <TresMesh
    ref="sphereRef"
    :position="[2, 2, 0]"
    name="sphere"
    cast-shadow
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
</template>
