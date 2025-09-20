# Environment

<DocsDemo>
  <EnvironmentDemo />
</DocsDemo>

Is a component abstraction that automatically sets up a global cubemap, which affects the default `scene.environment`, and optionally `scene.background`.

It uses the composable [useEnvironment](/guide/staging/use-environment) under the hood to load the cubemap.

## Usage

```vue
<Suspense>
  <Environment
    :files="[
      '/px.jpg',
      '/nx.jpg',
      '/py.jpg',
      '/ny.jpg',
      '/pz.jpg',
      '/nz.jpg'
    ]"
  />
</Suspense>
```

You can also pass the `.hdr` file directly:

```vue
<Suspense>
   <Environment files="/sunset.hdr" />
</Suspense>
```

![Environment](/cientos/envmaps.png)

## Texture reference

You can access the model reference by passing a `ref` to the `<Environment />` prop and then using the method `getTexture()` to get the object.

```vue{4,6,9,14,17}
<script setup lang="ts">
import { Environment } from '@tresjs/cientos'

const environmentRef = shallowRef()

watch(environmentRef, texture => {
  console.log(texture)
})
</script>

<template>
  <Environment ref="environmentRef" />
  <TresMesh>
    <TresSphereGeometry />
    <TresMeshStandardMaterial :env-map="envMap" />
  </TresMesh>
</template>
```

## Presets

You can use one of the available presets by passing the `preset` prop:

```vue
<Environment preset="city" />
```

## Lightformer

You can incorporate `Lightformer` into the environment just like a slot.

```vue
<script setup>
import { Enviroment, LightFormer } from '@tres/cientos'
</script>

<template>
  <Environment>
    <Lightformer :intensity="0.75" :position="[0, 5, -9]" />
    <Lightformer from="ring" :rotation-y="-Math.PI / 2" :scale="[10, 10, 1]" />
  </Environment>
</template>
```

## Environment Rotation

The environment component supports both background and environment rotation. You can control them independently or sync them together:

```vue
<template>
  <Environment
    preset="sunset"
    :background="true"
    :background-rotation="[0, Math.PI / 2, 0]"
    :environment-rotation="[0, Math.PI / 4, 0]"
  />
</template>
```

### Syncing Rotations

You can sync the environment rotation with the background rotation using the `syncMaterials` prop:

```vue
<template>
  <Environment
    preset="sunset"
    :background="true"
    :sync-materials="true"
    :background-rotation="[0, Math.PI / 2, 0]"
  />
</template>
```

When `syncMaterials` is enabled:
- The environment rotation will automatically match the background rotation
- All materials in the scene will update to reflect the new rotation
- This ensures visual consistency between the background and environment reflections

## Props

| Prop | Description | Default |
| :----------- | :-------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `files` | Array of 6 urls to images, one for each side of the CubeTexture, or an HDR file | `undefined` |
| `path` | Path to the environment map files | `undefined` |
| `encoding` | Encoding of the environment map | `SRGBColorSpace` for array files, `LinearEncoding` for single texture |
| `background` | If `true`, the environment map will be used as the scene background | `false` |
| `blur` | Blur factor between 0 and 1 (only works with three 0.146 and up) | 0 |
| `preset` | Preset environment map | `undefined` |
| `resolution` | The resolution of the WebGLCubeRenderTarget | 256 |
| `near` | The near of the CubeCamera | 1 |
| `far` | The far of the CubeCamera | 1000 |
| `frames` | The frames of the cubeCamera.update | Infinity |
| `backgroundIntensity` | Intensity of the background | 1 |
| `environmentIntensity` | Intensity of the environment | 1 |
| `backgroundRotation` | Rotation of the background (in radians) | [0, 0, 0] |
| `environmentRotation` | Rotation of the environment (in radians) | [0, 0, 0] |
| `syncMaterials` | If true, environment rotation will sync with background rotation | false |

### Props for Lightformer

Lightformer inherits from mesh, and its extension parameters include:
| Prop | Description | Default |
| :----------- | :------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `from` | 'circle', 'ring', 'rect', or any other Mesh type | `rect` |
| `intensity` | The intensity of the light | 1 |
| `color` | The color of the light | `0xffffff` |
| `args` | The arguments of the Geometry | When using other geometries, set the corresponding arguments |
