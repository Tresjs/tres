<script setup lang="ts">
import { FrontSide } from 'three';
import { shallowRef, watch } from 'vue';
import { GLTFModel } from '@tresjs/cientos'


const gameboyRef = shallowRef()

watch(gameboyRef, ({ getModel }) => {
  const model = getModel()

  model.scale.set(0.4, 0.4, 0.4)

})
</script>
<template>
 <GLTFModel
  ref="gameboyRef"
  path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf"
  draco
/>
</template>