# UseEnvironment

<DocsDemo>
  <EnvironmentDemo />
</DocsDemo>

`useEnvironment` composable that automatically sets up a global cubemap, which affects the default `scene.environment`, and optionally `scene.background`.

It uses the [CubeTextureLoader](https://threejs.org/docs/#api/en/loaders/CubeTextureLoader) to load the cubemap

## Usage

::: warning
`UseEnvironment` needs to be wrapped by a Suspense component
:::

```ts
import { useEnvironment } from '@tresjs/cientos'

const texture = await useEnvironment({
  files: [
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
  ],
  path: '',
  encoding: SRGBColorSpace,
})
```

Then you can use the `texture` in your scene:

```vue{3}
<TresMesh>
  <TresSphereGeometry />
  <TresMeshStandardMaterial :map="texture" />
</TresMesh>
```

You can also pass the `.hdr` file directly

```ts
import { useEnvironment } from '@tresjs/cientos'

const texture = await useEnvironment({
  files: '/sunset.hdr',
  path: '',
  encoding: SRGBColorSpace,
})
```

## Options

| Name           | Type       | Default                                                                          | Description                                                                 |
| :------------- | ---------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **files**      | `Array`    | `undefined`                                                                      | Array of 6 urls to images, one for each side of the CubeTexture. or and HDR |
| **path**       | `boolean`  | `false`                                                                          | Path to the environment map files.                                          |
| **encoding**   | `Encoding` | `SRGBColorSpace` for an array of files and `LinearEncoding` for a single texture | Encoding of the environment map.                                            |
| **background** | `boolean`  | `false`                                                                          | If `true` the texture will be used as the scene background.                 |
| **blur**       | `number`   | `0`                                                                              | Blur factor between 0 and 1. (only works with three 0.146 and up)           |
| **preset**     | `string`   | `undefined`                                                                      | Preset environment map.                                                     |
| **backgroundIntensity** | `number` | `1` | Intensity of the background. |
| **environmentIntensity** | `number` | `1` | Intensity of the environment. |
| **backgroundRotation** | `VectorFlexibleParams` | `[0, 0, 0]` | Rotation of the background. |
| **environmentRotation** | `VectorFlexibleParams` | `[0, 0, 0]` | Rotation of the environment. |
