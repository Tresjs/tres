<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'

const mesh = shallowRef({ position: { x: 0 } })
const { pause, resume, isActive, onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  mesh.value.position.x = Math.sin(elapsed)
})

function togglePause() {
  if (isActive.value) {
    pause()
  }
  else {
    resume()
  }
}
</script>

<template>
  <button @click="togglePause">{{ isActive ? 'pause' : 'resume' }}</button>
  <div class="aspect-video">
    <TresCanvas clear-color="#000" @render="() => {}">
      <TresPerspectiveCamera
        :position="[5, 5, 5]"
        :look-at="[0, 0, 0]"
      />
      <TresMesh ref="mesh">
        <TresSphereGeometry :args="[1, 32, 32]" />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresAmbientLight
        :intensity="0.5"
        color="red"
      />
    </TresCanvas>
  </div>
</template>
