# Using `FBXModel`

<DocsDemo>
  <FBXModelDemo />
</DocsDemo>

The `FBXModel` component is a wrapper around [`useFBX`](./use-fbx.md) composable and accepts the same options as props.

## Usage

<<< @/.vitepress/theme/components/FBXModelDemo.vue{3,10-15}

## Model reference

You can access the model reference by passing a `ref` to the `FBXModel` component and then using it to get the object.

```vue
<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import { FBXModel, OrbitControls } from '@tresjs/cientos'

const modelRef = shallowRef<TresObject>()

watch(modelRef, (model) => {
  // Do something with the model
  model.position.set(0, 0, 0)
})
</script>

<template>
  <FBXModel
    ref="modelRef"
    path="https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx"
  />
</template>
```

## Props

| Prop           | Description                                                | Default     |
| :------------- | :--------------------------------------------------------- | ----------- |
| `path`         | Path to the model file.                                    | `undefined` |
| `castShadow`   | Apply `cast-shadow` to all meshes inside your model.      | `false`     |
| `receiveShadow`| Apply `receive-shadow` to all meshes inside your model.   | `false`     |
