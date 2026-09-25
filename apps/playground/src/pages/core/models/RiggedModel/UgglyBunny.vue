<script setup lang="ts">
import { useAnimations, useGLTF } from '@tresjs/cientos'
import { computed, watch } from 'vue'

const { state } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
)

const animations = computed(() => state.value?.animations || [])
const model = computed(() => state.value?.scene)
const { actions } = useAnimations(animations, model)

watch(actions, (newActions) => {
  newActions.Greeting?.play()
})
</script>

<template>
  <primitive v-if="model" :object="model" />
</template>
