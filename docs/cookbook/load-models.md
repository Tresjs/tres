---
title: Load Models
description: Load 3D models into your Tres scenes.
author: alvarosabu
thumbnail: /recipes/gltf-model.png
difficulty: 1
---

# Load Models

> All models used in this guide are from [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

3D models are available in hundreds of file formats, each with different purposes, assorted features, and varying complexity.

For this guide we are going to focus on loading gLTF (GL Transmission Format) models, which are the most common format for 3D models on the web.

<SandboxDemo url="https://play.tresjs.org/#eNqVVdtu2zgQ/RVC++AsVpacuu12tc7CidsGu+i2Re0+VX2gpbHMhCIJkrLjBvn3DqmLJfeCFPCDNXNmeOZ+H6w0mEulol0FQRLMTKaZssSArdQ/qWClktqSe+JgCyp21JAHstGyJKO5RdmNiTOpYfR3D/tOr5ldSGG15N+BMxBWmoHFFTUsW25pLvf/UxWS5Yfrq4XkUi8VzSAkb+VKCkCVYqLoPNqtBhilonP0sSj44aoS4tAgovgochG6R1ORSWEsKTi5IPepICTjQLV/LiGj317/+eJq+nIUOo3xlExCrK7ASyhXW5qQDeWmFtQQpLY6KEhOI3EIWVlVYT7acJLT8BzIHuNLhuF69Z4J9LhkX9C64fKQillclwsLNbNQKk4t4H9CZr1y7cZrNL5Ig4Kngdc2+vegjYLMsh0saAma1rpEScMskwJNPj0JCf7++pwGjZJLeTum1ukmXjdpdHHrelj9Trys8DFhan5e0qtWh4pPYJ7oS6YdTSkof8OKrW09ZC6FyKQpWcvxJIRpSNyvCwHVTFh8g9kD6s9becfBT0S5dm3qnxvin6RBA53Fxyy7CsRdCYIwqDtyXFIV3RgpcLR8q6WNwqRBUjefk/UnySnSYGutMkkcZ7lA+xw42+lIgI2FKuM+fD6NnkWTOGfGxk6M6DTwLTNwXM/cr/iuLdD98777Rjx8xe6B3ioqHsO9w86fRpPovPHcCqOSOZu+bzfjj/HrcHP0+OwF8v0DTNlPA45+ZeDR+e3B5+cTn2AcIbiLymF2GxyuAA35LziuDX7mGoHjHEr2CKct1AX/NHoec7buu3QecVU8YE9ag5tvw4qTjsxkqRgH/U65kRl2JuVc7v/zsm4FepstZLffkd+Yu5rye2wW0DtM97GUVBdga/Wr5Vu4w/+dspR5xZvi/ED5AYzkleNYw3B15Ei7h/Ns//UDhotzZV7d+bltghoQtbitvfRTuxW6XqsFn33iPN6XY/GTLB0jm0bTXsKHx+f0vBJORYEbxS2D/qnVsOlOnLtZPRU2zyV+UU8hdJ/Xb1avf3hij8funpgMBB4PTCXwkNDOCxpfELqnzLbuzlwEo7bnNN1HBbPbao1qjd4wpTbCnvHbDx+jBqMxcUmZiL13ExfcbuIKYx8Legv5eO1S8I1gXJOAPHJ4d3B/7xOmfuXX/AZxnx3Jh3U8Pbus0hoJXnpjtMRknjWeomssr2uMGt4HRjvKK4hwex/OvLZ3Wb+5rUqzEq/LDkgi1zd4mbCGnkZzGfqH4OErWPcr8A==" />

There are several ways to load models on TresJS:

::: warning
Please note that in the examples below use top level `await`. Make sure to wrap such code with a Vue's [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) component.
:::

## Using `useLoader`

The `useLoader` composable allows you to pass any type of three.js loader and a URL to load the resource from. It returns a `Promise` with the loaded resource.

For a detailed explanation of how to use `useLoader`, check out the [useLoader](/api/composables#useloader) documentation.

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Then you can pass the model scene to a TresJS [`primitive`](/advanced/primitive) component to render it:

```html
<primitive :object="scene" />
```

> The `<primitive />` component is not a standalone component in the Tres source code. Instead, it's a part of the Tres core functionality. When you use `<primitive>`, it is translated to a `createElement` call, which creates the appropriate three.js object based on the provided "object" prop.

Notice in the example above that we are using the `Suspense` component to wrap the `TresCanvas` component. This is because `useLoader` returns a `Promise` and we need to wait for it to resolve before rendering the scene.

## Using `useGLTF`

A more convenient way of loading models is using the `useGLTF` composable available from the [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) package.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf')
```

An advantage of using `useGLTF`is that you can pass a `draco` prop to enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. This will reduce the size of the model and improve performance.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

Alternatively you can easily select objects inside the model using the `nodes` property.

::: code-group

```vue [App.vue]
<script setup lang="ts">
import Model from './Model.vue'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
  >
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <Model />
    </Suspense>
  </TresCanvas>
</template>
```

```vue [Model.vue]
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF('/models/AkuAku.gltf', { draco: true })
</script>

<template>
  <primitive :object="node.AkuAku" />
</template>
```
:::

## Using `GLTFModel`

The `GLTFModel` component is a wrapper around the `useGLTF` composable, which is available from the [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) package.

```vue{2,9}
<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <GLTFModel path="/models/AkuAku.gltf" draco />
    </Suspense>
    <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
```

This particular approach is more straightforward but gives you less control over the model.

## useFBX

The `useFBX` composable is available from the [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) package.

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Then is as straightforward as adding the scene to your scene:

```html
<primitive :object="model" />
```

## FBXModel

The `FBXModel` component is a wrapper around the `useFBX` composable, which is available from the [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) package. It's similar in usage to `GLTFModel`:

```vue{2,9}
<script setup lang="ts">
import { OrbitControls, FBXModel } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
      <Suspense>
        <FBXModel path="/models/AkuAku.fbx" />
      </Suspense>
      <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
```
