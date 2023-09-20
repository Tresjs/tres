<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const gameboyRef = shallowRef()

watch(gameboyRef, ({ model }) => {
  if (model) {
    model.scale.set(0.4, 0.4, 0.4)
  }
})
</script>

<template>
  <GLTFModel
    ref="gameboyRef"
    path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf"
    draco
  />
</template>
