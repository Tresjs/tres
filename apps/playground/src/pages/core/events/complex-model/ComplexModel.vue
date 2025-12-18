<script setup lang="ts">
/* eslint-disable no-console */
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF('/models/cyber_samurai/scene.gltf', { draco: true })
console.log(nodes)
const model = nodes.Sketchfab_model

const handleClick = (e: PointerEvent) => {
  console.log('clicked', e)
}

const handlePointerEnter = (e: PointerEvent) => {
  console.log('pointer-enter', e)
}

const handlePointerLeave = (e: PointerEvent) => {
  console.log('pointer-leave', e)
}
/* eslint-enable no-console */
</script>

<template>
  <primitive :object="model" @click="handleClick" @pointer-enter="handlePointerEnter" @pointer-leave="handlePointerLeave" />
</template>
