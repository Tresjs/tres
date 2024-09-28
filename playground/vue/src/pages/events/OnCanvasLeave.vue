<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core'
import { TresCanvas } from '@tresjs/core'
import { ref } from 'vue'

function over(ev: ThreeEvent<PointerEvent>) {
  ev.eventObject.material.color.set('#00F')
}

function out(ev: ThreeEvent<PointerEvent>) {
  ev.eventObject.material.color.set(ev.eventObject.color)
}

const visible = ref(false)
setInterval(() => {
  visible.value = !visible.value
}, 1000)
</script>

<template>
  <OverlayInfo>
    <h1>Canvas' <code>pointerleave</code></h1>
    <p>When the canvas' <code>pointerleave</code> is triggered, "hovered" objects are <code>pointer{leave,out}</code>ed</p>
    <h2>Setup</h2>
    <ol>
      <li>Put the pointer over the red object. It will change to blue.</li>
      <li>Move the pointer onto this overlay or out of the window. A <code>pointerleave</code> will be triggered, causing the color to change back to red.</li>
    </ol>
  </OverlayInfo>
  <TresCanvas
    window-size
  >
    <TresPerspectiveCamera
      :position="[0, 0, 11]"
      :look-at="[0, 0, 0]"
    />
    <TresGroup :scale="10">
      <TresMesh
        color="red"
        :position="[-0.5, 0.5, 0]"
        @pointerover="over"
        @pointerout="out"
      >
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshBasicMaterial color="red" />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>

<style scoped>
img {
  border: 2px solid #ccc;
}
</style>
