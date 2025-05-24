<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useTresContext } from '@tresjs/core'

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
const { renderer } = useTresContext()

renderer.invalidate()
</script>

<template>
  <primitive :object="scene" />
</template>
