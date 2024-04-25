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
    <TresCanvas>
      <TresPerspectiveCamera
        :position="[5, 5, 5]"
        :look-at="[0, 0, 0]"
      />

      <TresAmbientLight
        :intensity="0.5"
        color="red"
      />
      <TresMesh
        ref="mesh"
        :position="[0, 2, 0]"
      >
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresDirectionalLight
        :position="[0, 2, 4]"
        :intensity="1"
        cast-shadow
      />
      <TresAxesHelper />
      <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
    </TresCanvas>
  </div>
</template>
