<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useTresContext } from '@tresjs/core'

const { state } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
const { renderer } = useTresContext()

renderer.invalidate()
</script>

<template>
  <primitive v-if="state" :object="state.scene" />
</template>
