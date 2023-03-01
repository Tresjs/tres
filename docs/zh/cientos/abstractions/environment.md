# 环境 <Badge type="warning" text="^1.7.0" />

![Environment](/cientos/environment.png)

`Environment` 组件会自动设置全局 cubemap，影响默认的 `scene.environment` 和可选的 `scene.background`。

底层使用 [useEnvironment](/cientos/abstractions/use-environment) 组合式函数加载 cubemap。

## 用法

```html
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

直接使用 `.hdr` 文件:

```html
<Environment files="/sunset.hdr" />
```

![Environment](/cientos/envmaps.png)

## 纹理引用

通过 `<Environment />` 组件添加 `ref` 和调用 `getTexture()` 方法能够获取到对应的数据。

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

## Props

| Prop         | Description                                                          | Default                                                                        |
| :----------- | :------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `files`      | Array of 6 urls to images, one for each side of the CubeTexture.     | `undefined`                                                                    |
| `path`       | Path to the environment map files.                                   | `undefined`                                                                    |
| `encoding`   | Encoding of the environment map.                                     | `sRGBEncoding` for an array of files and `LinearEncoding` for a single texture |
| `background` | If `true`, the environment map will be used as the scene background. | `false`                                                                        |
| `blur`       | Blur factor between 0 and 1. (only works with three 0.146 and up)    | 0                                                                              |
| `preset`     | Preset environment map.                                              | `undefined`                                                                    |
