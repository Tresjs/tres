<script setup lang="ts">
import { LoopOnce } from 'three'

const { nodes, animations } = await useGLTF('/models/cult-of-the-lamb/Lamb.glb', { draco: true })
console.log(animations)
const lamb = nodes['rig']

const { actions, mixer } = useAnimations(animations, lamb)

const currentAction = ref(actions['rigAction'])

currentAction.value.clampWhenFinished = true
currentAction.value.loop = LoopOnce
currentAction.value.play()
</script>

<template>
  <Levioso>
    <primitive :object="lamb" />
  </Levioso>
</template>