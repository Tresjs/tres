# useFBX

<DocsDemo>
  <UseFBXDemo />
</DocsDemo>

A composable that allows you to easily load FBX models into your **TresJS** scene.

## Usage

::: code-group
```vue{2,6} [TheModel.vue]
<script setup lang="ts">
import { useFBX } from '@tresjs/cientos'

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx'
const { state, nodes, materials } = useFBX(path)
</script>

<template>
  <primitive v-if="state" :object="state" :scale="0.025" />
</template>
```
```vue [app.vue]
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import TheModel from './TheModel.vue'
</script>

<template>
  <TresCanvas clear-color="#1F90FF">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
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

## Return Values

| Name         | Type      | Description                                    |
| :----------- | --------- | ---------------------------------------------- |
| **state**    | `Group`   | The loaded FBX model state                     |
| **nodes**    | `object`  | Computed object containing all nodes in the scene |
| **materials**| `object`  | Computed object containing all materials in the scene |
| **isLoading**| `boolean` | Whether the model is currently loading         |
| **execute**  | `() => Promise<void>` | Function to reload the model |

## Options

| Name            | Type       | Description                                |
| :-------------- | ---------- | ------------------------------------------ |
| **traverse**    | `Function` | A traverse function applied to the scene upon loading the model. |

## Accessing Nodes and Materials

The composable provides computed properties to easily access nodes and materials in your scene:

```ts
const { nodes, materials } = useFBX('/model.fbx')

// Access a specific node
const mesh = nodes.value.MeshName

// Access a specific material
const material = materials.value.MaterialName
```

This makes it easier to manipulate specific parts of your model or apply materials programmatically.
