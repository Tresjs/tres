<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'
import { computed, shallowRef } from 'vue'

const { nodes } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  { draco: true },
)

const modelRef = shallowRef<TresObject | null>(null)

const model = computed(() => nodes.value?.BlenderCube)
</script>

<template>
  <primitive v-if="model" ref="modelRef" :object="model" />
</template>
