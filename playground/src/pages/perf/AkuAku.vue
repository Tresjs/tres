<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  { draco: true },
)

const model = nodes.AkuAku

/* useControls({
  button: {
    label: 'Manual dispose',
    type: 'button',
    onClick() {
      disposeModel()
    },
  },
}) */

/* function disposeModel() {
  console.log('disposingModel')
  model.traverse((child) => {
    if (child.isMesh) {
      // Dispose of the material
      if (child.material) {
        child.material.dispose()
      }

      // Dispose of the geometry
      if (child.geometry) {
        child.geometry.dispose()
      }
    }
  })
  console.log('disposingModel Finished')
} */

model.traverse((child) => {
  if (child.material) {
    console.log('child.material', child.material.uuid)
  }
})
</script>

<template>
  <primitive :object="model" />
</template>
