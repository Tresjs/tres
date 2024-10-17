<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useTresContext } from '@tresjs/core'

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf', { draco: true })
useTresContext().invalidate()
</script>

<template>
  <primitive :object="scene" :position-y="-2" />
</template>
