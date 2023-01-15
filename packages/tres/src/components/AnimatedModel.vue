<script setup lang="ts">
import { AnimationMixer, Clock, Color, sRGBEncoding } from 'three'

/* import { OrbitControls, useTweakPane, useGLTF, useAnimations } from '../../../cientos/src/' */
import { OrbitControls, useTweakPane, useGLTF, useAnimations } from '@tresjs/cientos'
import { useRenderLoop } from '../core'

const bgColor = new Color('#F78B3D')
useTweakPane()

/* const jeepRef = ref() */

const { scene: model, animations } = await useGLTF('/models/ugly-naked-bunny/ugly-naked-bunny-animated.gltf')

const { actions, mixer } = useAnimations(animations, model)

console.log({ animations, actions, mixer })

actions.Greeting.play()

/* const mixer = new AnimationMixer(model)

const actions = {}

animations.forEach(animation => {
  const action = mixer.clipAction(animation)
  actions[animation.name] = action
})

actions.Greeting.play()

const { onLoop } = useRenderLoop()
const clock = new Clock()
onLoop(({ elapsed }) => {
  const delta = clock.getDelta()
  mixer.update(delta)
}) */

/* watch(jeepRef, ({ getModel }) => {
  const model = getModel()
  model.scale.set(0.01, 0.01, 0.01)
  model.rotation.y = -Math.PI / 2
}) */
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
