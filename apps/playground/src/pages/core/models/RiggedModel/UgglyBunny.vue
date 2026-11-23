<script setup lang="ts">
import { useAnimations, useGLTF } from '@tresjs/cientos'
import { computed, watch } from 'vue'

const { state } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
)

const model = computed(() => state.value?.scene)
const animations = computed(() => state.value?.animations || [])

const { actions } = useAnimations(animations, model)

watch(() => actions.Greeting, action => action?.play(), { immediate: true })
</script>

<template>
  <primitive v-if="model" :object="model" />
</template>
