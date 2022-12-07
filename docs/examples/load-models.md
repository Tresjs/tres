# Load Models

> All models used in this guide are from [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

3D models are available in hundreds of file formats, each with different purposes, assorted features, and varying complexity.

For this guide we are going to focus on loading glTF (GL Transmission Format) models, which are the most common format for 3D models on the web.

<StackBlitzEmbed projectId="tresjs-gltf-load-model" />

There are several ways to load models on TresJS:

## Using `useLoader`

The `useLoader` composable allows you to pass any type of Three.js loader and a URL to load the resource from. It returns a `Promise` with the loaded resource.

For a detailed explanation of how to use `useLoader`, check out the [useLoader](/composables/use-loader) documentation.

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Then you can pass the model scene to a `TresMesh` component:

```html{4}
<Suspense>
  <TresCanvas>
    <TresScene>
      <TresMesh v-bind="scene" />
    </TresScene>
  </TresCanvas>
</Suspense>
```

Notice in the example above that we are using the `Suspense` component to wrap the `TresCanvas` component. This is because `useLoader` returns a `Promise` and we need to wait for it to resolve before rendering the scene.

## Using `useGLTF`

A more convenient way of loading models is using the `useGLTF` composable available from [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) package.

To learn more about `useGLTF`, check out the [useGLTF](/cientos/composables/use-gltf) documentation.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/AkuAku.gltf')
```

An advantage of using `useGLTF`is that you can pass a `draco` prop to enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. This will reduce the size of the model and improve performance.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

## Using `GLTFModel`

The `GLTFModel` component is a wrapper around `useGLTF` that's available from [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) package.

```vue{2,10}
<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>
<template>
  <Suspense>
    <TresCanvas clear-color="#82DBC5" shadows alpha>
      <TresPerspectiveCamera :position="[11, 11, 11]" />
      <OrbitControls />
      <TresScene>
        <GLTFModel path="/models/AkuAku.gltf" draco />
        <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
```

This particular approach is more straightforward but gives you less control over the model.
