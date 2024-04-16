<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/AkuAku.glb', { draco: true })
const model = nodes.Cube

model.position.set(0, 1, 0)

const state = useTresContext()

state.invalidate()
</script>

<template>
  <primitive :object="model" />
</template>
