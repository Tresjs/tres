<script setup lang="ts">
import { useGLTF, useTweakPane } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import { shallowRef, watch } from 'vue'
import Airplane from './Airplane.vue'
import Cloud from './Cloud.vue'

const { scene: planet } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/planet.gltf',
)

const { pane } = useTweakPane()

const planetRef = shallowRef()

planet.traverse(child => {
  if (child.isMesh) {
    child.receiveShadow = true
  }
})

watch(
  () => planetRef.value,
  planet => {
    if (!planet) return
    pane.addInput(planetRef.value, 'visible', { label: 'Planet' })
  },
)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (!planet) return
  planet.rotation.y += delta * 0.04
  planet.rotation.z += delta * 0.02
  planet.rotation.x += delta * 0.05
  planet.updateMatrixWorld()
})
</script>
<template>
  <TresMesh ref="planetRef" v-bind="planet" />
  <Airplane :planet="planetRef" />
  <Cloud v-for="cloud of [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="cloud" :planet="planetRef" />
</template>
