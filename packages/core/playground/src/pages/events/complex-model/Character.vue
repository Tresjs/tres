<script setup lang="ts">
/* eslint-disable no-console */
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF('/models/Artificer.glb', { draco: true })
console.log(nodes)
const model = nodes.Engineer_Rig

model.position.set(-4, 0, 0)

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
