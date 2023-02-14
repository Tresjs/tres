<script setup lang="ts">
import { useGLTF, useAnimations } from '@tresjs/cientos'

const { scene: model, animations } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/tlou-ellie/ellie-thriller.gltf',
)

const { actions } = useAnimations(animations, model)

let currentAction = actions.dance

currentAction.play()
</script>

<template>
  <TresMesh v-bind="model" :position="[0, -8, 0]" />
</template>
