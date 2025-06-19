<script setup lang="ts">
// import { OrbitControls } from '@tresjs/cientos'

import { useLoop, useTresContext } from '@tresjs/core'
import type { Mesh } from 'three'

const { render, onLoop } = useLoop()
const { renderer, scene, camera } = useTresContext() // TODO: why do I need to use this?

render((notifySuccess) => {
  renderer.instance.render(scene.value, camera.activeCamera.value)
  notifySuccess()
})

const boxRef = ref<Mesh>()

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
  }
})

const showGrid = ref(true)

setTimeout(() => {
  showGrid.value = false
}, 10000)
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[2, 0, 0]" />
  <!-- <OrbitControls make-default /> -->
  <TresMesh
    ref="boxRef"
    :position="[2, 0, 0]"
    cast-shadow
  >
    <TresBoxGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
  <TresGridHelper v-if="showGrid" />
  <TresAmbientLight :intensity="1" />
</template>
