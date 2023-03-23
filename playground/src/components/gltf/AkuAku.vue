<script setup lang="ts">
import { useTweakPane, useGLTF } from '@tresjs/cientos'
import {  ref, watch } from 'vue'

useTweakPane()

const { scene: model } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  {
    draco: true,
  },
)
model.position.set(0, 4, 0)
model.updateMatrixWorld()

const akuAkuRef = ref(null)

watch(akuAkuRef, value => {
  console.log('akuAkuRef', value)
})
</script>

<template>
  <TresMesh ref="akuAkuRef" v-bind="model" />
</template>
