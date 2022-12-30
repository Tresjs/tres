# Using `GLTFModel`

The `GLTFModel` component is a wrapper around [`useGLTF`](./use-gltf.md) composable and accepts the same options as props.

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

## Props

| Prop          | Description                                                                                                           | Default     |
| :------------ | :-------------------------------------------------------------------------------------------------------------------- | ----------- |
| `path`        | Path to the model file.                                                                                               | `undefined` |
| `draco`       | Enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. | `false`     |
| `decoderPath` | Path to a local Draco decoder.                                                                                        | `undefined` |
