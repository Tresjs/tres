---
title: Lights and Shadows
description: Learn how to add lights and shadows to your scene.
author: alvarosabu
thumbnail: /recipes/lights-and-shadows.png
difficulty: 0
---

# Light-shadows

This guide will help you get started with simple light and shadows in TresJS.

We will build a simple scene with three meshes and a plane but only two will have shadows.
<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## Setting up the scene (optional)

We import all the modules that we need, for comfort we can use the orbit-controls from cientos,
[check here to know how](/cookbook/orbit-controls).

Let's put four objects in our scene, one will be the plane that receive shadows, two of them will cast shadows and the last one will not cast any shadow at all.

I'm going to use [MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial). Simply because we can see the "soft shadow" easily.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
    clear-color="#111"
    window-size
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[5, 7.5, 7.5]" />

    <TresMesh
      :position="[-2, 2, 0]"
      :rotation="[0, Math.PI, 0]"
    >
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh
      :position="[0, 0, 0]"
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh
      :position="[2, -2, 0]"
    >
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh
      :position="[0, -3, 0]"
      :rotation="[-Math.PI / 2, 0, 0]"
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshStandardMaterial color="#f7f7f7" />
    </TresMesh>
  </TresCanvas>
</template>
```

## Lights (explanation)

As you know every instance in [ThreeJs](https://threejs.org/) is available in **TresJs** so are all the light types, we just need to add the `Tres` prefix to use them.

But not all lights can cast shadows, this definition comes directly from ThreeJs and makes sense, for example the purpose of an [ambientLight](https://threejs.org/docs/index.html?q=ambient#api/en/lights/AmbientLight) is to iluminate everysingle side of your scene, so it makes no sense for it to cast shadows, on the contrary, a [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/helpers/DirectionalLightHelper) immitating the sun can and should cast shadows.

## Shadows (explanation)

There are also many types of shadows, for example the "soft shadow" is generated automatially when an object receives more light from one side, but in summary a "ThreeJS default shadow" that is directed towards another surface needs to be cast by a mesh and another mesh needs to receive it. As we see in our example, the `Plane` is receiving a shadow but not casting it. Please note that not all materials can cast or receive shadows.

Internally, ThreeJS automatically generates a new mesh with a [ShadowMaterial](https://threejs.org/docs/index.html?q=shado#api/en/materials/ShadowMaterial) which gets updated in each frame, that is why if you apply animations, the shadow also is animated, but also why you have to use shadows carefully, because they could slow your performance down.

::: warning
The overuse of shadows in this way could drop your performance. However, there are ways to increase your performance, for more information please check out [this video](https://youtu.be/WGNvVGrS0kY?si=q7XyL5eABKUh3gbS&t=1256)
:::

## Enabling shadows

We could divide this into three steps:

### Activate shadows on the renderer

```vue
//...

<template>
  <TresCanvas
    clear-color="#111"
    shadows
    window-size
  />
  //...
</template>
```
### Set the light to cast shadows

We can simply add the boolean `cast-shadow`, Vue understands this as a `prop` with a value of `true`.

_The AmbientLight doesn't generate any type of shadow here_

```vue
//...

<template>
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight
    cast-shadow
    :position="[0, 2, 0]"
    :intensity="1"
  />

  //...
</template>
```
### Set the objects to cast or receive shadows

Similarly to the previous step, we set the mesh that we want to cast shadow (our sphere) with the `cast-shadow` prop, and set the object to receive shadow (our plane) with the `receive-shadow` prop.

```vue
//...

<template>
  <TresMesh
    cast-shadow
    :position="[2, -2, 0]"
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
  <TresMesh
    receive-shadow
    :position="[0, -3, 0]"
    :rotation="[-Math.PI / 2, 0, 0]"
  >
    <TresPlaneGeometry :args="[10, 10, 10, 10]" />
    <TresMeshStandardMaterial color="#f7f7f7" />
  </TresMesh>
  //...
</template>
```

Now we have all the necessary steps to add shadows to our scene, and if we apply what we learned in [basic animations](/cookbook/basic-animations), and we add movement to our cube, you will see the shadow is animated as well. 🤩

```vue
<script setup>
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'

const boxRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
  }
})
</script>

<template>
  //...
  <TresMesh
    ref="boxRef"
    cast-shadow
    :position="[0, 0, 0]"
  >
    <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
    <TresMeshToonMaterial color="#4F4F4F" />
  </TresMesh>
  //...
</template>
```

_Note that I intentionally did not apply `cast-shadow` to the `Cone` so it doesn't cast any shadow_
