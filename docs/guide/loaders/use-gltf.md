# useGLTF

<DocsDemo>
  <UseGLTFDemo />
</DocsDemo>

A composable that allows you to easily load glTF models into your **TresJS** scene.

## Usage

::: code-group
```vue [app.vue]
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import TheModel from './TheModel.vue'
</script>

<template>
  <TresCanvas clear-color="#F78B3D">
    <TresPerspectiveCamera :position="[3, 2, 5]" />
    <OrbitControls />
    <Suspense>
      <TheModel />
    </Suspense>
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```
```vue{2,6} [TheModel.vue]
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/gltf/blender-cube.glb'
const { scene } = await useGLTF(path, { draco: true })
</script>

<template>
  <primitive :object="scene" />
</template>
```
:::

An advantage of using `useGLTF`is that you can pass a `draco` prop to enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. This will reduce the size of the model and improve performance.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

## Options

| Name            | Type      | Default     | Description                          |
| :-------------- | --------- | ----------- | ------------------------------------ |
| **draco**       | `boolean` | `false`     | Whether to enable Draco compression. |
| **decoderPath** | `string`  | `undefined` | Local path to the Draco decoder.     |
