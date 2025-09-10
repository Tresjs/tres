<script setup lang="ts">
import { useAnimations, useGLTF } from '@tresjs/cientos'
import { computed } from 'vue'
import type { AnimationAction } from 'three'
import { LoopOnce } from 'three'

const { state: model, nodes } = useGLTF('/models/knight/Knight.glb')
const rig = computed(() => nodes.value.Rig)

const animations = computed(() => model.value?.animations || [])

watch(animations, (animations) => {
  console.log('Animations loaded:', animations.map(a => a.name))
}, { immediate: true })

const { actions } = useAnimations(animations, rig)
const currentAction = ref<AnimationAction>()

watch(actions, (actions) => {
  if (!actions) { return }

  // Play the idle animation by default
  currentAction.value = actions.Cheer
  currentAction.value?.setLoop(LoopOnce, 1)
  currentAction.value?.play()

  const nextAnimation = actions.Idle as AnimationAction

  if (nextAnimation) {
    nextAnimation.setEffectiveWeight(1)
    nextAnimation.enabled = true
    nextAnimation.play()
  }
}, { immediate: true })
</script>

<template>
  <primitive v-if="rig" :object="rig" />
</template>
