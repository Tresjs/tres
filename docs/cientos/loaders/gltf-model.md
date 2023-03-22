# Using `GLTFModel`

The `GLTFModel` component is a wrapper around [`useGLTF`](./use-gltf.md) composable and accepts the same options as props.

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

## Model reference

You can access the model reference by pasing a `ref` to the `model` prop and then using the method `getModel()` to get the object.

```vue{3,6}
<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

const modelRef = shallowRef<THREE.Object3D>()

watch(modelRef, ({getModel}) => {
  const model = getModel()

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
})
</script>
```

## Props

| Prop          | Description                                                                                                           | Default     |
| :------------ | :-------------------------------------------------------------------------------------------------------------------- | ----------- |
| `path`        | Path to the model file.                                                                                               | `undefined` |
| `draco`       | Enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. | `false`     |
| `decoderPath` | Path to a local Draco decoder.                                                                                        | `undefined` |
