<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  { draco: true },
)

const model = nodes.AkuAku
</script>

<template>
  <primitive :object="model" />
</template>
