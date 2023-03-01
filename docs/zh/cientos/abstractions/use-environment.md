# UseEnvironment <Badge type="warning" text="^1.7.0" />

`useEnvironment` 组合式函数自动设置全局 cubemap，影响默认的 `scene.environment` 和可选的 `scene.background`。

它使用 [CubeTextureLoader](https://threejs.org/docs/#api/en/loaders/CubeTextureLoader) 加载 cubemap。

## 用法

```ts
import { useEnvironment } from "@tresjs/cientos";

const texture = await useEnvironment({
  files: [
    "/textures/environmentMaps/0/px.jpg",
    "/textures/environmentMaps/0/nx.jpg",
    "/textures/environmentMaps/0/py.jpg",
    "/textures/environmentMaps/0/ny.jpg",
    "/textures/environmentMaps/0/pz.jpg",
    "/textures/environmentMaps/0/nz.jpg",
  ],
  path: "",
  encoding: sRGBEncoding,
});
```

场景中添加 `texture`

```html{3}
<TresMesh>
  <TresSphereGeometry />
  <TresMeshStandardMaterial :map="texture" />
</TresMesh>
```

## 选项

| Name           | Type       | Default                                                                        | Description                                                       |
| :------------- | ---------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **files**      | `Array`    | `undefined`                                                                    | Array of 6 urls to images, one for each side of the CubeTexture.  |
| **path**       | `boolean`  | `false`                                                                        | Path to the environment map files.                                |
| **encoding**   | `Encoding` | `sRGBEncoding` for an array of files and `LinearEncoding` for a single texture | Encoding of the environment map.                                  |
| **background** | `boolean`  | `false`                                                                        | If `true` the texture will be used as the scene background.       |
| **blur**       | `number`   | `0`                                                                            | Blur factor between 0 and 1. (only works with three 0.146 and up) |
| **preset**     | `string`   | `undefined`                                                                    | Preset environment map.                                           |
