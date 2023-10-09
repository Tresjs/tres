# Environment

<DocsDemo>
  <EnvironmentDemo />
</DocsDemo>

Is a component abstraction that automatically sets up a global cubemap, which affects the default `scene.environment`, and optionally `scene.background`,

It uses the composable [useEnvironment](/guide/staging/use-environment) under the hood to load the cubemap.

## Usage

```vue
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
```

You can also pass the `.hdr` file directly:

```vue
<Environment files="/sunset.hdr" />
```

![Environment](/cientos/envmaps.png)

## Texture reference

You can access the model reference by pasing a `ref` to the `<Environment />` prop and then using the method `getTexture()` to get the object.

```vue{4,6,9,14,17}
<script setup lang="ts">
import { Environment } from '@tresjs/cientos'

let envMap = null

const environmentTexture = shallowRef()

watch(environmentTexture, ({ getTexture }) => {
  envMap = getTexture()
})
</script>

<template>
  <Environment ref="environmentTexture" />
  <TresMesh>
    <TresSphereGeometry />
    <TresMeshStandardMaterial :env-map="envMap" />
  </TresMesh>
</template>
```

## Presets

You can use one of the available presets by passing the `preset` prop:

```html
<Environment preset="city" />
```

<DocsDemo>
  <EnvironmentPresetsDemo/>
</DocsDemo>

## Props

| Prop         | Description                                                          | Default                                                                          |
| :----------- | :------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `files`      | Array of 6 urls to images, one for each side of the CubeTexture.     | `undefined`                                                                      |
| `path`       | Path to the environment map files.                                   | `undefined`                                                                      |
| `encoding`   | Encoding of the environment map.                                     | `SRGBColorSpace` for an array of files and `LinearEncoding` for a single texture |
| `background` | If `true`, the environment map will be used as the scene background. | `false`                                                                          |
| `blur`       | Blur factor between 0 and 1. (only works with three 0.146 and up)    | 0                                                                                |
| `preset`     | Preset environment map.                                              | `undefined`                                                                      |
