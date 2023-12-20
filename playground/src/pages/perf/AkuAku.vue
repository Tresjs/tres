<script setup lang="ts">
import { dispose } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  { draco: true },
)

const model = nodes.AkuAku

function disposeModel() {
  dispose(model)
}

onUnmounted(() => {
  disposeModel()
})
</script>

<template>
  <primitive :object="model" />
</template>
