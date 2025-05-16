<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
const model = computed(() => nodes.value.BlenderCube)

defineExpose({
  model,
})
</script>

<template>
  <TresGroup :position="[0, 1, 0]">
    <primitive v-if="model" :object="model" />
  </TresGroup>
</template>
