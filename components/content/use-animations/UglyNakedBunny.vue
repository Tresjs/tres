<script setup lang="ts">
import { useAnimations, useGLTF, useTweakPane } from '@tresjs/cientos'

const { scene: model, animations } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
)

const { actions, mixer } = useAnimations(animations, model)

let currentAction = actions.Greeting

currentAction.play()

const { pane } = useTweakPane()

pane
  .addBlade({
    view: 'list',
    label: 'scene',
    options: Object.keys(actions).map(name => ({
      text: name,
      value: name,
    })),
    value: 'Greeting',
  })
  .on('change', ({ value }) => {
    if (currentAction) {
      currentAction.stop()
    }

    currentAction = actions[value]

    currentAction.play()
  })
</script>
<template>
  <primitive :object="model"></primitive>
</template>
