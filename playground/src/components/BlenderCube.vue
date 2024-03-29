<script setup lang="ts">
import { dispose } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const { nodes } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', 
  { draco: true })
const model = nodes.Cube

model.position.set(0, 1, 0)

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
</script>

<template>
  <primitive :object="model" />
</template>