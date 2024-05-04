<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { useThrottleFn } from '@vueuse/core'

const sphereRef = ref()

const log = useThrottleFn(() => console.log('updating sphere'), 3000)
const log2 = useThrottleFn(() => console.log('this should happen before updating the sphere'), 3000)

const { onBeforeRender, pause, resume } = useLoop()

onBeforeRender((state) => {
  if (!sphereRef.value) { return }
  log()
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
})

onBeforeRender(() => {
  log2()
}, -1)

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
/* const anotherLog = useThrottleFn(() => console.log('after render'), 3000)
 */
/* useUpdate(() => {
  anotherLog()
}, 1) */

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
    :position="[2, 0, 0]"
    name="sphere"
    cast-shadow
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
</template>
