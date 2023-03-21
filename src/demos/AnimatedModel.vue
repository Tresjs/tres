<script setup lang="ts">
import { Color, sRGBEncoding } from 'three'

/* import { OrbitControls, useTweakPane, useGLTF, useAnimations } from '../../../cientos/src/' */
import { OrbitControls, useTweakPane, useGLTF, useAnimations } from '@tresjs/cientos'

const bgColor = new Color('#F78B3D')

const { pane } = useTweakPane()

const { scene: model, animations } = await useGLTF('/models/ugly-naked-bunny/ugly-naked-bunny-animated.gltf')

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

console.log({ animations, actions, mixer })
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
      <OrbitControls />
      <TresPerspectiveCamera :position="8" :fov="45" :near="0.1" :far="10000" />
      <TresScene :fog="bgColor">
        <TresAmbientLight :color="0xffffff" :intensity="0.75" />
        <TresMesh v-bind="model" />
        <!--   <FBXModel ref="jeepRef" path="/models/low-poly-truck/Jeep_done.fbx" /> -->
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
