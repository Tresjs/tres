<script setup lang="ts">
import { useFBX } from '../../../composables/useFBX'

const scene = await useFBX('https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx')
scene.scale.set(0.01, 0.01, 0.01)
</script>

<template>
  <primitive :object="scene" />
</template>
