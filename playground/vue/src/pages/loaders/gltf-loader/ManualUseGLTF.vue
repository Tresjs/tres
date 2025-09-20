<script setup lang="ts">
import { usePocGLTF } from '../../../composables/usePocGLTF'

const modelPath = ref('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb')

const { state } = usePocGLTF(modelPath, {
  draco: true,
})
</script>

<template>
  <primitive v-if="state?.nodes.Cube" :object="state.nodes.Cube" />
</template>
