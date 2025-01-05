<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'
import { Mesh } from 'three'

const { nodes } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  { draco: true },
)

const modelRef = shallowRef<TresObject | null>(null)

const model = nodes.Cube

watch(modelRef, (model) => {
  if (model) {
    model.traverse((child: Mesh) => {
      if (child instanceof Mesh) {
        child.castShadow = true
      }
    })
  }
})
</script>

<template>
  <primitive ref="modelRef" :object="model" />
</template>
