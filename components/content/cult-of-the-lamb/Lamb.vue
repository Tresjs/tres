<script setup lang="ts">
import { LoopOnce } from 'three'

const { scene, nodes, animations } = await useGLTF('/models/cult-of-the-lamb/lamb-v2.glb', { draco: true })

const lamb = nodes['rig']

const { actions } = useAnimations(animations, lamb)

const currentAction = ref(actions['elevate'])

currentAction.value.clampWhenFinished = true
currentAction.value.loop = LoopOnce
currentAction.value.play()
</script>

<template>
  <TresGroup>
    <Levioso>
      <primitive :object="scene" />
    </Levioso>
  </TresGroup>
</template>