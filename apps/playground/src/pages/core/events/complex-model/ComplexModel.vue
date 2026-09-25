<script setup lang="ts">
/* eslint-disable no-console */
import { useGLTF } from '@tresjs/cientos'

const { nodes } = useGLTF('/models/cyber_samurai/cyber_samurai.glb', { draco: true })
const model = computed(() => nodes.value.Sketchfab_model)

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
  <primitive v-if="model" :object="model" @click="handleClick" @pointer-enter="handlePointerEnter" @pointer-leave="handlePointerLeave" />
</template>
