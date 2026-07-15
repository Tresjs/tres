<script setup lang="ts">
import { useAnimations, useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'

const { state } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf', { draco: true })

const animations = computed(() => state.value?.animations || [])
const model = computed(() => state?.value?.scene)
const { actions, mixer } = useAnimations(animations, model, {
  manualUpdate: true,
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  mixer.value.update(delta)
})

const currentAction = ref()

watch(actions, (newActions) => {
  currentAction.value = newActions.Greeting
  currentAction.value.play()
})
</script>

<template>
  <primitive
    v-if="state?.scene"
    :object="state?.scene"
  />
</template>
