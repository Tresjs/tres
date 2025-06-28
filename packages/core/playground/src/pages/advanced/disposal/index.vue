<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const boxRef = shallowRef()

const tests = [
  {
    getPass: () => {
      const show = boxRef.value?.show
      const parentName = boxRef.value?.instance?.parent?.name || null
      return !show || parentName === 'intended-parent'
    },
    msg: 'v-if is false or Box has intended parent',
  },
]

const testsRef = shallowRef({ run: () => {} })
let intervalId: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  intervalId = setInterval(() => testsRef.value.run(), 100)
})
onUnmounted(() => intervalId && clearInterval(intervalId))
</script>

<template>
  <TresCanvas clear-color="gray">
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[1, 2, 3]" />
    <TresMesh :position="[1, 2, 3]" name="intended-parent">
      <TresMesh
        v-for="(_, i) of Array.from({ length: 8 }).fill(0)"
        :key="i"
        :position="[
          i % 2 ? -0.5 : 0.5,
          Math.floor(i / 2) % 2 ? -0.5 : 0.5,
          Math.floor(i / 4) % 2 ? -0.5 : 0.5,
        ]"
      >
        <TresBoxGeometry :args="[0.1, 0.1, 0.1]" />
        <TresMeshBasicMaterial color="red" />
      </TresMesh>
    </TresMesh>
  </TresCanvas>
  <OverlayInfo>
    <h1>Issue #717: v-if</h1>
    <h2>Setup</h2>
    <p>
      In this scene, there is a Box with a <code>v-if</code>. Its <code>v-if</code> value is toggled on and off.
      When visible, the box's 8 corners should appear at the centers of the red boxes.
    </p>
    <h2>Tests</h2>
    <Tests ref="testsRef" :tests="tests" />
    <h2>Issue</h2>
    <a href="https://github.com/Tresjs/tres/issues/706#issuecomment-2146244326">
      Toggle v-if on a Tres component declared in a separate SFC makes it detach from its parent</a>
  </OverlayInfo>
</template>
