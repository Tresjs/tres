---
sidebar: false
---

# Tres Ecosystem Update 8/11/23

It's exciting that updates are coming out so fast, that we need a more general post about the whole ecosystem news rather than a post for each package updates 😊.

![](https://media.giphy.com/media/ONxw4niC96zwk/giphy.gif)

Lets jump right into it like it was a mountain of leaves. 🍂

## TresJS `v3.5.0`

Core package has been updated to v3.5.0, this update includes a new feature that comes extrenemly handy when working with gltf models.

### useSeek new methods

Until now the `seek` and `seekByName` function traverses the object and returns the child object with the specified property and value. If no child with the given property and value is found, it returns null and logs a warning.

But it was not possible to retrieve multiple objects with similar name conventions like `"Cloth001"`, `"Cloth002"`, `"Cloth003"`, etc.

![](/blog/seek-all.png)

Now, you can use the new `seekAll` and `seekAllByName` methods to retrieve an array of objects with the specified property and value.

```ts
import { useSeek } from '@tresjs/core'

const { seekAll, seekAllByName } = useSeek()

const clothes = seekAllByName(model, 'Cloth')
```

Thanks to [Garret Walker](https://twitter.com/garrlker), [@PatrickByrn](https://github.com/PatrickByrn) and [@not-Ryan](https://github.com/not-Ryan) for their first contributions. 🎉 👏🏻

Check the full changelog [here](https://github.com/Tresjs/tres/releases/tag/3.5.0)

## Cientos v3.6.0

Of course this ecosystem update wouldn't be complete without a new Cientos release. Welcome `v3.6.0` 🎉 to the party. This release includes a new feature and some bug fixes.

### CustomShaderMaterial

A convenient wrapper for creating custom shaders. It's a wrapper around the [three-custom-shader-material](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial) library made by [@FarazzShaikh](https://github.com/FarazzShaikh) that makes it easier to extend ThreeJS standard materials with your own shaders.

![](/blog/custom-shader-material.png)

```html
<script setup lang="ts">
import {
  CustomShaderMaterial,
} from '@tresjs/cientos'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

const texture01 = await useTexture({
  matcap: '/matcap_01.png',
})
<script>

<template>
  <TresMesh>
    <TresTorusKnotGeometry :args="[1, 0.3, 512, 32]" />
    <CustomShaderMaterial
      base-material="MeshStandardMaterial"
      :matcap="texture01.matcap"
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="{
        u_Time: { value: 0 },
        u_WobbleSpeed: { value: 3 },
        u_WobbleAmplitude: { value: 0.07 },
        u_WobbleFrequency: { value: 3 },
      }"
    />
  </TresMesh>
</template>
```

Thanks to [Francesco Michelini](https://twitter.com/fra_michelini) for this amazing contribution. 🎉 👏🏻

Check the docs [here](https://cientos.tresjs.org/guide/materials/custom-shader-material.html#trescustomshadermaterial)

### Sparkles ✨

A new fancy abstraction `<Sparkles />` makes sparkles on your geometry's vertices – optionally guided by a directional light.

![](/blog/sparkles.png)

Not gonna lie,  I spent hours mesmerized by this effect when reviewing the PR by [@andretchen0](https://github.com/andretchen0). 🤤

```html
<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Sparkles, OrbitControls, Torus, Sphere } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const lightRef = shallowRef()

useRenderLoop().onLoop(({ elapsed }) => {
  if (lightRef.value) {
    lightRef.value.position.x = Math.cos(elapsed) * 2.5
    lightRef.value.position.y = Math.sin(elapsed) * 2.5
  }
})
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 0, 8]" />
    <TresDirectionalLight ref="lightRef">
      <Sphere
        color="white"
        :scale="0.1"
      />
    </TresDirectionalLight>
    <Torus :args="[1, 0.25, 16, 48]">
      <TresMeshBasicMaterial color="#222" />
      <Sparkles :directional-light="lightRef" />
    </Torus>
    <OrbitControls />
  </TresCanvas>
</template>
```

More usage examples in the docs [here](https://cientos.tresjs.org/guide/staging/sparkles.html#sparkles)

### Superformula 

A new shape `<Superformula />` that generates a 3D shape based on the [superformula](https://en.wikipedia.org/wiki/Superformula) equation.

![](/blog/superformula.gif)


```html
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Superformula, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#777">
    <Superformula
      :num-arms-b="24"
      :exp-b="[40, 30, 20]"
    >
      <TresMeshNormalMaterial />
    </Superformula>
    <OrbitControls />
  </TresCanvas>
</template>
```

More usage examples in the docs [here](https://cientos.tresjs.org/guide/shapes/superformula.html#superformula)

Thanks [@andretchen0](https://github.com/andretchen0) for another great contribution.

### CSS Transitions on `<Html />`

A highly requested bugfix that allows you to use CSS transitions on the `<Html />` component.

![](/blog/html-css-transitions-fix.gif)


```html
<Html
  v-bind="state"
  transform
  :occlude="[sphereRef]"
>
  <h1
    class="text-xs p-0.5 rounded transition-all duration-500"
    :class="isActive ? 'bg-dark' : 'bg-white'"
  >
    Box
  </h1>
</Html>
```

## Time for dessert 🍰

To finish this update, we have a new package in the ecosystem thats near to hit alpha soon. 🎉

![Tresleches package](/blog/tres-leches.png)

When you are building an 3D scene, you often need to fine-tune the position, rotation and scale of your objects. This can be a tedious task, especially when you are working with complex scenes.

Tresleches is the missing VueJS GUI that allows you to easily create controls and monitor things like the `fps` of your scene and manipulate the position of an object, the rotation of a light, etc.

Documentation available on https://tresleches.tresjs.org/

More coming soon... in the next weeks. 😊

## Thanks

Thanks to all the contributors that made this update possible and the community for creating so many amazing showcases with TresJS. 🙏🏻

You can join the community in our [Discord server](https://discord.gg/UCr96AQmWn) or follow us on [Twitter](https://twitter.com/tresjs_dev) to stay up to date with the latest news.