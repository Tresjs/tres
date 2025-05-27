<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { dispose, useTexture } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const { nodes } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
const model = nodes.Cube
model.position.set(0, 1, 0)

const texture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg'])

model.children[0].material.map = texture

useControls({
  disposeBtn: {
    label: 'Dispose',
    type: 'button',
    onClick: () => {
      dispose(model)
    },
    size: 'sm',
  },
})

onUnmounted(() => {
  dispose(model)
})
</script>

<template>
  <primitive :object="model" />
</template>
