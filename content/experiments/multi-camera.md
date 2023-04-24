---
thumbnail: /multi-camera.png
title: Multi-cameras
slug: multi-camera
author: jaime-bboyjt
description: An advance technique using ArrayCamera with a model animation
tags: ['array-camera', 'useGltf', 'useRenderLoop']
---

::multi-camera-demo
::

::the-info

![Multi-camera](/multi-camera.png)

# Multi Camera

Author: [@**jaimebboyjt**](https://twitter.com/jaimebboyjt).

> This is an advance example of how to use array of cameras with TresJS.

```vue
// App.vue
<script setup>
import { computed } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { useAnimations, useGLTF, useTweakPane } from '@tresjs/cientos'
import { PerspectiveCamera, Vector4, Vector3 } from 'three'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const WIDTH = (width.value / 4) * window.devicePixelRatio
const HEIGHT = (height.value / 4) * window.devicePixelRatio
const ASPECT_RATIO = computed(() => width.value / height.value)

const cameras = []

// This is the tricky part, we define some properties for each cameras like viewPort
// More info here https://threejs.org/docs/index.html?q=array#api/en/cameras/ArrayCamera
const cameraOptions = [
  {
    viewPort: new Vector4(Math.floor(0), Math.floor(0), Math.ceil(WIDTH * 2), Math.ceil(HEIGHT * 2)),
    position: new Vector3(15, 0, 3),
    factor: 0.4,
    name: 'left_bottom',
  },
  {
    viewPort: new Vector4(Math.floor(WIDTH), Math.floor(0), Math.ceil(WIDTH * 2), Math.ceil(HEIGHT * 2)),
    position: new Vector3(0, 0, -3),
    factor: 2,
    name: 'center_bottom',
  },
  {
    viewPort: new Vector4(Math.floor(WIDTH * 2), Math.floor(0), Math.ceil(WIDTH * 2), Math.ceil(HEIGHT * 2)),
    position: new Vector3(-15, 0, 3),
    factor: 0.4,
    name: 'right_bottom',
  },
  {
    viewPort: new Vector4(Math.floor(WIDTH - 75), Math.floor(HEIGHT), Math.ceil(WIDTH * 2.5), Math.ceil(HEIGHT * 2.5)),
    position: new Vector3(0, 0, 3),
    factor: 2,
    name: 'center_top',
  },
]

cameraOptions.forEach(data => {
  const currentCam = new PerspectiveCamera(40, ASPECT_RATIO.value, 0.1, 10)
  currentCam.name = data.name
  currentCam.viewport = data.viewPort
  currentCam.position.set(...data.position)
  currentCam.position.multiplyScalar(data.factor)
  currentCam.lookAt(0, 0, 0)
  currentCam.updateMatrixWorld()
  cameras.push(currentCam)
})

const { scene: model, animations } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/warcraft-3-alliance-footmanfanmade/source/Footman_RIG.glb',
)
// with the useAnimations of we have all the necessary to declare the mixer
const { actions, mixer } = useAnimations(animations, model)

let currentAction = actions.Idle

currentAction.play()

const { pane } = useTweakPane()

// Here we define the animations available in the model
const animationList = pane.addBlade({
  view: 'list',
  label: 'Animations',
  options: [
    { text: 'Idle', value: 'Idle' },
    { text: 'SwordAndShieldCrouchBlockIdle', value: 'SwordAndShieldCrouchBlockIdle' },
    { text: 'SwordAndShieldDeath_2', value: 'SwordAndShieldDeath_2' },
    { text: 'SwordAndShieldIdle', value: 'SwordAndShieldIdle' },
    { text: 'SwordAndShieldKick', value: 'SwordAndShieldKick' },
    { text: 'SwordAndShieldRun(back)', value: 'SwordAndShieldRun(back)' },
    { text: 'SwordAndShieldRun', value: 'SwordAndShieldRun' },
    { text: 'SwordAndShieldSlash_2', value: 'SwordAndShieldSlash_2' },
    { text: 'SwordAndShieldSlash', value: 'SwordAndShieldSlash' },
    { text: 'T-Pose', value: 'T-Pose' },
  ],
  value: 'Idle',
})

animationList.on('change', value => {
  currentAction.stop()
  currentAction = actions[value.value]
  currentAction.play()
})

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (mixer) {
    mixer.update(0.01)
  }
})
</script>
<template>
  <TresCanvas window-size clear-color="#82DBC5" class="over-hidden">
    <!-- We define the arrayCameras -->
    <TresArrayCamera :args="[cameras]" :position="[0, 2, 5]" />
    <Suspense>
      <!-- You can see here is just one model -->
      <primitive :object="model" />
    </Suspense>
    <TresAmbientLight :color="0xffffff" :intensity="1" />
    <TresSpotLight :color="0xffffff" :intensity="100" :position="[0, 0, 5]" />
    <TresDirectionalLight :color="0xffffff" :intensity="5" />
    <TresHemisphereLight />
  </TresCanvas>
</template>
```

::
