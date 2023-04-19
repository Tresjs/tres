<script setup lang="ts">
import { Color, sRGBEncoding } from 'three'
import { TresCanvas } from '/@/'
import { OrbitControls, useTweakPane, useGLTF, useAnimations } from '@tresjs/cientos'

const bgColor = new Color('#F78B3D')

const { pane } = useTweakPane()

const { scene: model, animations } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
)

const { actions, mixer } = useAnimations(animations, model)

let currentAction = actions.Greeting

currentAction.play()

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

console.log({ model, animations, actions, mixer })
</script>

<template>
  <Suspense>
    <TresCanvas
      :clear-color="bgColor"
      shadows
      alpha
      window-size
      power-preference="high-performance"
      :output-encoding="sRGBEncoding"
    >
      <TresPerspectiveCamera :position="[8, 8, 8]" :fov="45" :near="0.1" :far="10000" />
      <OrbitControls />

      <TresAmbientLight :color="0xffffff" :intensity="2" />
      <TresMesh v-bind="model" />
      <TresDirectionalLight />
    </TresCanvas>
  </Suspense>
</template>
