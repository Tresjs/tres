<!-- eslint-disable no-console -->
<script setup lang="ts">
import { type LoopCallbackWithCtx, useLoop } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { useThrottleFn } from '@vueuse/core'
import { onTresReady } from '../../../src'

const sphereRef = ref()

const log = useThrottleFn(state => console.log('updating sphere', state), 3000)
const log2 = useThrottleFn(() => console.log('this should happen before updating the sphere'), 3000)

const { onBeforeRender, pause, resume } = useLoop()

const updateCallback = (state: LoopCallbackWithCtx) => {
  if (!sphereRef.value) { return }
  log(state)
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
}

const { off } = onBeforeRender(updateCallback)

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

const { unregister } = useControls({
  unregister: {
    value: false,
    type: 'boolean',
    label: 'Unregister update callback',
  },
})

onTresReady(() => {
  watchEffect(() => {
    if (areUpdatesPaused.value) {
      pause()
    }
    else {
      resume()
    }
  })
})

watchEffect(() => {
  if (unregister.value) {
    off()
  }
})
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
