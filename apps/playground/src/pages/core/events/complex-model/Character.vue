<script setup lang="ts">
/* eslint-disable no-console */
import { useGLTF } from '@tresjs/cientos'

const { nodes } = useGLTF('/models/Artificer.glb', { draco: true })
const model = computed(() => nodes.value.Engineer_Rig)

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
  <primitive v-if="model" :object="model" :position="[-4, 0, 0]" @click="handleClick" @pointer-enter="handlePointerEnter" @pointer-leave="handlePointerLeave" />
</template>
