<script setup lang="ts">
import { useAnimations, useGLTF } from '@tresjs/cientos'
import { computed } from 'vue'
import type { AnimationAction } from 'three'

const { state: model, nodes } = useGLTF('/models/cube-boy/cube-boy-dance.glb', {
  draco: true,
})

const rig = computed(() => nodes.value.Rig)

const animations = computed(() => model.value?.animations || [])

watch(animations, (animations) => {
  console.log('animations', animations)
}, { immediate: true })

const { actions } = useAnimations(animations, rig)
const currentAction = ref<AnimationAction>()


watch(actions, (actions) => {
  if (Object.keys(actions || {}).length === 0) { return }

  currentAction.value = actions.Wave
  currentAction.value?.reset().play()
}, { immediate: true })

</script>

<template>
  <primitive v-if="rig" :object="rig" />
</template>
