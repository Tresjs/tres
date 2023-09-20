---
thumbnail: /haunted-house-demo.png
title: Haunted house
slug: haunted-house
author: jaime-bboyjt
status: published
description: The classical threejs-journey haunted house, done with TresJs
tags: ['PointLight', 'fog', 'useTexture', 'threejs-journey']
---

::haunted-house
::

::the-info

![Haunted house demo](/haunted-house-demo.png)

# Haunted house

Author: [@**jaimebboyjt**](https://twitter.com/jaimebboyjt).

> This is a TresJs implementation of Haunted house demo from Bruno Simon.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { PCFSoftShadowMap, SRGBColorSpace } from 'three'
import Floor from './floor.vue'
import House from './house.vue'
import Ghosts from './ghosts.vue'

const { pane } = useTweakPane()

const gl = {
  clearColor: '#262837',
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
}

const moonOptions = reactive({
  intensity: 1.12,
  position: [4, 5, -2],
  color: '#b9d5ff',
})

pane.addInput(moonOptions, 'intensity', {
  label: 'intensity',
  min: 0,
  max: 3,
  step: 0.001,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[4, 2, 5]" />
    <TresFog :args="['#262837', 1, 15]" />
    <OrbitControls />

    <Suspense>
      <House />
    </Suspense>
    <Suspense>
      <Floor />
    </Suspense>
    <Ghosts />
    <TresAmbientLight
      color="#b9d5ff"
      :intensity="0.3"
    />
    <TresDirectionalLight
      v-bind="moonOptions"
      :shadow-map-size-width="256"
      :shadow-map-size-height="256"
      :shadow-camera-far="15"
      cast-shadow
    />
  </TresCanvas>
</template>
```

```vue
// floor.vue
<script setup>
import { shallowRef } from 'vue'
import { useTexture } from '@tresjs/core'
import { Float32BufferAttribute, RepeatWrapping, BoxGeometry, MeshStandardMaterial, Mesh } from 'three'

const floorRef = shallowRef()
const gravesRef = shallowRef()
const floorTexture = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/color.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/normal.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/roughness.jpg',
  aoMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/ambientOcclusion.jpg',
})

for (const key in floorTexture) {
  if (floorTexture[key]) {
    floorTexture[key].repeat.set(8, 8)
    floorTexture[key].wrapS = RepeatWrapping
    floorTexture[key].wrapT = RepeatWrapping
  }
}

const floorOptions = {
  color: '#82DBC5',
  roughness: 0.5,
  metalness: 0.5,
  map: floorTexture.map,
  normalMap: floorTexture.normalMap,
  roughnessMap: floorTexture.roughnessMap,
  aoMap: floorTexture.aoMap,
}
watch(floorRef, (value) => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})

const bushes = [
  {
    scale: [0.5, 0.5, 0.5],
    position: [0.8, 0.2, 2.2],
  },
  {
    scale: [0.25, 0.25, 0.25],
    position: [1.4, 0.1, 2.1],
  },
  {
    scale: [0.4, 0.4, 0.4],
    position: [-0.8, 0.1, 2.2],
  },
  {
    scale: [0.15, 0.15, 0.15],
    position: [-1, 0.05, 2.6],
  },
]

const graveGeometry = new BoxGeometry(0.6, 0.8, 0.1)
const graveMaterial = new MeshStandardMaterial({ color: '#727272' })
const graves = []

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2 // Random angle
  const radius = 3 + Math.random() * 6 // Random radius
  const x = Math.cos(angle) * radius // Get the x position using cosinus
  const z = Math.sin(angle) * radius // Get the z position using sinus

  // Create the mesh
  const grave = new Mesh(graveGeometry, graveMaterial)
  grave.castShadow = true
  // Position
  grave.position.set(x, 0.3, z)

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  graves.push(grave)
}
</script>

<template>
  <TresMesh
    ref="floorRef"
    receive-shadow
    :rotation="[-Math.PI * 0.5, 0, 0]"
    :position="[0, 0, 0]"
  >
    <TresPlaneGeometry :args="[20, 20]" />
    <TresMeshStandardMaterial v-bind="floorOptions" />
  </TresMesh>
  <TresMesh
    v-for="({ position, scale }, index) in bushes"
    :key="index"
    :position="position"
    :scale="scale"
  >
    <TresSphereGeometry :args="[1, 16, 16]" />
    <TresMeshStandardMaterial color="#89c854" />
  </TresMesh>
  <TresGroup ref="gravesRef">
    <TresMesh
      v-for="({ position, scale, rotation }, index) in graves"
      :key="index"
      :position="position"
      :scale="scale"
      :rotation="rotation"
      :material="graveMaterial"
      :geometry="graveGeometry"
    />
  </TresGroup>
</template>
```

```vue
// house.vue
<script setup>
import { shallowRef, watch } from 'vue'
import { useTexture } from '@tresjs/core'
import { Float32BufferAttribute } from 'three'

const wallRef = shallowRef()
const doorRef = shallowRef()
const doorLightRef = shallowRef()

const brickTextures = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/color.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/normal.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/roughness.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/ambientOcclusion.jpg',
})

const doorTextures = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/color.jpg',
  alphaMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/alpha.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/ambientOcclusion.jpg',
  displacementMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/height.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/normal.jpg',
  metalnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/metalness.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/roughness.jpg',
})

const wallOptions = {
  map: brickTextures.map,
  aoMap: brickTextures.aoMap,
  normalMap: brickTextures.normalMap,
  roughnessMap: brickTextures.roughnessMap,
}
const doorOptions = {
  transparent: true,
  displacementScale: 0.1,
  map: doorTextures.map,
  alphaMap: doorTextures.alphaMap,
  aoMap: doorTextures.aoMap,
  displacementMap: doorTextures.displacementMap,
  normalMap: doorTextures.normalMap,
  metalnessMap: doorTextures.metalnessMap,
  roughnessMap: doorTextures.roughnessMap,
}
watch(wallRef, (value) => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})

watch(doorRef, (value) => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})
</script>

<template>
  <TresGroup ref="houseRef">
    <TresMesh
      ref="doorRef"
      :position="[0, 0.9, 2.01]"
    >
      <TresPlaneGeometry :args="[2, 2, 100, 100]" />
      <TresMeshStandardMaterial v-bind="doorOptions" />
    </TresMesh>
    <TresMesh
      ref="roofRef"
      :position="[0, 3, 0]"
      :rotation="[0, Math.PI * 0.25, 0]"
    >
      <TresConeGeometry :args="[3.5, 1, 4]" />
      <TresMeshStandardMaterial color="#b35f45" />
    </TresMesh>
    <TresMesh
      ref="wallRef"
      :position="[0, 1.25, 0]"
      cast-shadow
    >
      <TresBoxGeometry :args="[4, 2.5, 4]" />
      <TresMeshStandardMaterial v-bind="wallOptions" />
    </TresMesh>
    <TresPointLight
      :position="[0, 2.2, 2.7]"
      :args="['#ff7d46', 1, 7]"
      :shadow-map-size-width="256"
      :shadow-map-size-height="256"
      :shadow-camera-far="7"
      cast-shadow
    />
  </TresGroup>
</template>
```

```vue
// ghosts.vue
<script setup>
import { shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'

const ghost1 = shallowRef(null)
const ghost2 = shallowRef(null)
const ghost3 = shallowRef(null)

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  const ghost1Angle = elapsed * 0.5
  const ghost2Angle = -elapsed * 0.32
  const ghost3Angle = -elapsed * 0.18
  if (ghost1.value && ghost2.value && ghost3.value) {
    ghost1.value.position.x = Math.cos(ghost1Angle) * 4
    ghost1.value.position.z = Math.sin(ghost1Angle) * 4
    ghost1.value.position.y = Math.sin(elapsed * 3)

    ghost2.value.position.x = Math.cos(ghost2Angle) * 5
    ghost2.value.position.z = Math.sin(ghost2Angle) * 5
    ghost2.value.position.y = Math.sin(elapsed * 4) + Math.sin(elapsed * 2.5)

    ghost3.value.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsed * 0.32))
    ghost3.value.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsed * 0.5))
    ghost3.value.position.y = Math.sin(elapsed * 4) + Math.sin(elapsed * 2.5)
  }
})
</script>

<template>
  <TresPointLight
    ref="ghost1"
    :args="['#ff00ff', 3, 3]"
    cast-shadow
  />
  <TresPointLight
    ref="ghost2"
    :args="['#00ffff', 3, 3]"
    cast-shadow
  />
  <TresPointLight
    ref="ghost3"
    :args="['#ff7800', 3, 3]"
    cast-shadow
  />
</template>
```

::
