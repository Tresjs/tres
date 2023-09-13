# Using `FBXModel`

<DocsDemo>
  <FBXModelDemo />
</DocsDemo>

The `FBXModel` component is a wrapper around [`useFBX`](./use-fbx.md) composable and accepts the same options as props.

```vue{2,9}
<script setup lang="ts">
import { OrbitControls, FBXModel } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas clear-color="#82DBC5" shadows alpha>
      <TresPerspectiveCamera :position="[11, 11, 11]" />
      <OrbitControls />
      <Suspense>
        <FBXModel path="/models/Jeep.fbx" />
      </Suspense>
      <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
    </TresCanvas>
</template>
```

## Props

| Prop   | Description             | Default     |
| :----- | :---------------------- | ----------- |
| `path` | Path to the model file. | `undefined` |
