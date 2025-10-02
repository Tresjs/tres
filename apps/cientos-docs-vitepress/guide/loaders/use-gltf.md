# useGLTF

<DocsDemo>
  <UseGLTFDemo />
</DocsDemo>

A composable that allows you to easily load glb/glTF models into your **TresJS** scene.

## Usage

::: code-group
```vue{2,6} [TheModel.vue]
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const path = './blender-cube.glb'
const { state, nodes, materials } = useGLTF(path, { draco: true })
</script>

<template>
  <primitive v-if="state" :object="state?.scene" />
</template>
```
```vue [app.vue]
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import TheModel from './TheModel.vue'
</script>

<template>
  <TresCanvas clear-color="#F78B3D">
    <TresPerspectiveCamera :position="[3, 2, 5]" />
    <OrbitControls />
    <TheModel />
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

:::

An advantage of using `useGLTF` is that you can pass a `draco` prop to enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. This will reduce the size of the model and improve performance.

```ts
import { useGLTF } from '@tresjs/cientos'

const { state, nodes, materials } = useGLTF('/models/AkuAku.gltf', { draco: true })
```

## Return Values

| Name         | Type      | Description                                    |
| :----------- | --------- | ---------------------------------------------- |
| **state**    | `GLTF`    | The loaded GLTF model state                    |
| **nodes**    | `object`  | Computed object containing all nodes in the scene |
| **materials**| `object`  | Computed object containing all materials in the scene |
| **isLoading**| `boolean` | Whether the model is currently loading         |
| **progress** | `number`  | The progress of the model loading         |
| **load**     | `() => Promise<void>` | Function to reload the model |

## Options

| Name            | Type       | Default     | Description                          |
| :-------------- | ---------- | ----------- | ------------------------------------ |
| **draco**       | `boolean`  | `false`     | Whether to enable Draco compression. |
| **decoderPath** | `string`   | `'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'` | Path to the Draco decoder.     |
| **traverse**    | `Function` |             | A traverse function applied to the scene upon loading the model. |

## Accessing Nodes and Materials

The composable provides computed properties to easily access nodes and materials in your scene:

```ts
const { nodes, materials } = useGLTF('/model.glb')

// Access a specific node
const mesh = nodes.value.MeshName

// Access a specific material
const material = materials.value.MaterialName
```

This makes it easier to manipulate specific parts of your model or apply materials programmatically.
