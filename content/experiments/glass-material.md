---
thumbnail: /glass-example.png
title: Glass/Plastic Material
author: jaime-bboyjt
status: published
description: A realistic glass/plastic effect, play with it!
tags: ['materials', 'useTweakPane']
---

::glass-example
::

::the-info

![Glass material](/glass-example.png)

# Glass material

Author: [@**jaimebboyjt**](https://twitter.com/jaimebboyjt).

> This effect is base on: https://tympanus.net/codrops/2021/10/27/creating-the-effect-of-transparent-glass-and-plastic-in-three-js/

```vue
// App.vue
<script setup>
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const { map, normalMap } = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/bg-texture.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/normal-example.jpg',
})

const planeRef = shallowRef(null)

// the hdrEquirect image add a beautiful realistic glass effect
const hdrEquirect = await new RGBELoader().load(
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/glass-effect/glass-effect.hdr',
  () => {
    hdrEquirect.mapping = EquirectangularReflectionMapping
  },
)

const options = reactive({
  transmission: 1,
  thickness: 0.5,
  roughness: 0,
  envMap: hdrEquirect,
  clearcoatNormalMap: normalMap,
  envMapIntensity: 1.5,
})

const { pane } = useTweakPane()
pane.addInput(options, 'transmission', {
  label: 'transmission',
  min: 0,
  max: 1,
  step: 0.01,
})
pane.addInput(options, 'thickness', {
  label: 'thickness',
  min: 0,
  max: 1,
  step: 0.01,
})
pane.addInput(options, 'envMapIntensity', {
  label: 'envMapIntensity',
  min: 0,
  max: 3,
  step: 0.1,
})
pane.addInput(options, 'roughness', {
  label: 'roughness',
  min: 0,
  max: 1,
  step: 0.01,
})

const hdrEquiredButton = pane.addButton({
  title: 'Enable/Disable hdrEquired',
})
hdrEquiredButton.on('click', () => {
  options.envMap = options.envMap ? null : hdrEquirect
})
</script>

<template>
  <TresCanvas
    window-size
    clear-color="#F7F7F7"
    class="over-hidden"
    grid
  >
    <TresPerspectiveCamera
      :position="[0, 0, 3]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <TresGridHelper
      :args="[30, 30]"
      :position="[0, -2.5, 0]"
    />
    <TresMesh :position="[-0, 0, 0]">
      <TresIcosahedronGeometry :args="[1, 10]" />
      <TresMeshPhysicalMaterial v-bind="options" />
    </TresMesh>
    <TresMesh
      ref="planeRef"
      :position="[0, 0, -1]"
    >
      <TresPlaneGeometry :args="[5, 5]" />
      <TresMeshBasicMaterial :map="map" />
    </TresMesh>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
      cast-shadow
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

::
