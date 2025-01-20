<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import { useLoop } from '@tresjs/core'
import { shallowRef } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const { onBeforeRender } = useLoop()

const boxRef = shallowRef<TresObject | null>(null)

onBeforeRender(({ elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y = elapsed
    boxRef.value.rotation.z = elapsed
  }
})

const { wireframe } = useControls({
  wireframe: false,
})
</script>

<template>
  <TresPerspectiveCamera :position="[5, 5, 5]" />
  <OrbitControls />
  <TresAmbientLight
    :intensity="0.5"
    color="red"
  />
  <TresMesh
    ref="boxRef"
    :position="[0, 2, 0]"
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial :wireframe="wireframe" />
  </TresMesh>
  <TresDirectionalLight
    :position="[0, 2, 4]"
    :intensity="1"
    cast-shadow
  />
  <TresAxesHelper />
  <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
</template>
