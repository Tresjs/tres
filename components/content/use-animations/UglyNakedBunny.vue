<script setup lang="ts">
import { useAnimations, useGLTF, useTweakPane } from '@tresjs/cientos'

const { scene: model, animations } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
)

const { actions, mixer } = useAnimations(animations, model)
console.log({ actions, mixer })
const currentAction = ref(actions.Greeting)

currentAction.value.play()

const { value: action } = useControls({
  actions: {
    label: 'Actions',
    options: Object.keys(actions).map(name => ({
      text: name,
      value: name,
    })),
    value: 'Iddle',
  },
})

watch(action, (value) => {
  console.log({ value })
  if (currentAction.value) {
    currentAction.value.fadeOut(0.2)
  }

  currentAction.value = actions[value]
  currentAction.value.reset()
  currentAction.value.fadeIn(0.2)
  currentAction.value.play()
}, {
  immediate: true,
})

/* const { pane } = useTweakPane()

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
  }) */
</script>

<template>
  <primitive :object="model" />
</template>
