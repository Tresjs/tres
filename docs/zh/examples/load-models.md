# 加载模型 {#Load Models}

> 本节中使用的所有模型均来自 [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c)。

3D 模型有丰富的文件格式，每种格式都有不同的目的、各种功能和不同的复杂性。

本节我们将重点介绍如何加载网络上最常见的 3D 模型格式 —— glTF（图形语言传输格式）。

<StackBlitzEmbed projectId="tresjs-gltf-load-model" />

下面是几种加载模型的方法：

## 使用 `useLoader`

`useLoader` 组合式函数接收任意类型的 Three.js 的加载器和资源的路径。它返回一个带有已加载资源的 Promise。

关于 `useLoader` 的使用细节，请查看 [useLoader](/api/composables#use-loader) 文档。

```ts
import { useLoader } from "@tresjs/core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const { scene } = await useLoader(GLTFLoader, "/models/AkuAku.gltf");
```

将模型数据传给 `TresMesh` 组件:

```html{4}
<Suspense>
  <TresCanvas>
    <TresScene>
      <TresMesh v-bind="scene" />
    </TresScene>
  </TresCanvas>
</Suspense>
```

注意在上面的示例中，我们使用了 `Suspense` 组件来包裹 `TresCanvas` 组件。这是因为 `useLoader` 返回一个 Promise，我们需要等待它完成资源加载后再渲染场景。

## 使用 `useGLTF`

一种更简便的加载模型的方式是使用 [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) 包提供的 `useGLTF` 组合式函数。

```ts
import { useGLTF } from "@tresjs/cientos";

const { scene } = await useGLTF("/models/AkuAku.gltf");
```

使用 `useGLTF` 的好处是你可以传递 `draco` 属性以启用对模型的 [Draco 压缩](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader)。这将减小模型的大小并提高性能。

```ts
import { useGLTF } from "@tresjs/cientos";

const { scene } = await useGLTF("/models/AkuAku.gltf", { draco: true });
```

## 使用 `GLTFModel`

`GLTFModel` 组件是 [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) 包中 `useGLTF` 的包装器。

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

这种特定的方法更加简单直接，不过您只有很少的模型控制权。

## useFBX

[@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) 包提供了 `useFBX`。

```ts
import { useFBX } from "@tresjs/cientos";

const model = await useFBX("/models/AkuAku.fbx");
```

直接添加到场景中：

```html{4}
<Suspense>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresMesh v-bind="scene" />
    </TresScene>
  </TresCanvas>
</Suspense>
```

## FBXModel

`FBXModel` 组件是 [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) 包中 `useFBX` 的包装器。 用法与 `GLTFModel` 类似:

```vue{2,10}
<script setup lang="ts">
import { OrbitControls, FBXModel } from '@tresjs/cientos'
</script>
<template>
  <Suspense>
    <TresCanvas clear-color="#82DBC5" shadows alpha>
      <TresPerspectiveCamera :position="[11, 11, 11]" />
      <OrbitControls />
      <TresScene>
        <FBXModel path="/models/AkuAku.fbx" />
        <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
```
