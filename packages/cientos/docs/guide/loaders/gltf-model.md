# Using `GLTFModel`

<DocsDemo>
  <GLTFModelDemo />
</DocsDemo>

The `GLTFModel` component is a wrapper around [`useGLTF`](./use-gltf.md) composable and accepts the same options as props.

## Usage

<<< @/.vitepress/theme/components/GLTFModelDemo.vue{3,10}

## Model reference

You can access the model reference by passing a `ref` to the `model` prop and then using to get the object.

```vue
<script setup lang="ts">
import type { TresObject } from 'tresjs'
import { GLTFModel, OrbitControls } from '@tresjs/cientos'

const modelRef = shallowRef<TresObject>()

watch(modelRef, (model) => {
  // Do something with the model
  model.position.set(0, 0, 0)
})
</script>

<template>
  <GLTFModel
    ref="modelRef"
    path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb"
  />
</template>
```

## Props

| Prop          | Description                                                                                                           | Default     |
| :------------ | :-------------------------------------------------------------------------------------------------------------------- | ----------- |
| `path`        | Path to the model file.                                                                                               | `undefined` |
| `draco`       | Enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. | `false`     |
| `decoderPath` | Path to a local Draco decoder.                                                                                        | `undefined` |
| `castShadow`  | Apply `cast-shadow` to all meshes inside your model.                                                                  | `false`     |
| `receiveShadow` | Apply `receive-shadow` to all meshes inside your model.                                                             | `false`     |
