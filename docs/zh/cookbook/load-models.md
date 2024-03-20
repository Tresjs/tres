---
title: 加载模型
description: 将3D模型加载到您的Tres场景中。
author: alvarosabu
thumbnail: /recipes/gltf-model.png
difficulty: 1
---

# 加载模型

> 本指南中使用的所有模型均来自 [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c)。

3D 模型有数百种文件格式，每种格式都有不同的用途、不同的功能和不同的复杂性。

在本指南中，我们将重点介绍加载 gLTF（GL 传输格式）模型，这是 Web 上最常见的 3D 模型格式。

<SandboxDemo url="https://play.tresjs.org/#eNqVVdtu2zgQ/RVC++AsVpacuu12tc7CidsGu+i2Re0+VX2gpbHMhCIJkrLjBvn3DqmLJfeCFPCDNXNmeOZ+H6w0mEulol0FQRLMTKaZssSArdQ/qWClktqSe+JgCyp21JAHstGyJKO5RdmNiTOpYfR3D/tOr5ldSGG15N+BMxBWmoHFFTUsW25pLvf/UxWS5Yfrq4XkUi8VzSAkb+VKCkCVYqLoPNqtBhilonP0sSj44aoS4tAgovgochG6R1ORSWEsKTi5IPepICTjQLV/LiGj317/+eJq+nIUOo3xlExCrK7ASyhXW5qQDeWmFtQQpLY6KEhOI3EIWVlVYT7acJLT8BzIHuNLhuF69Z4J9LhkX9C64fKQillclwsLNbNQKk4t4H9CZr1y7cZrNL5Ig4Kngdc2+vegjYLMsh0saAma1rpEScMskwJNPj0JCf7++pwGjZJLeTum1ukmXjdpdHHrelj9Trys8DFhan5e0qtWh4pPYJ7oS6YdTSkof8OKrW09ZC6FyKQpWcvxJIRpSNyvCwHVTFh8g9kD6s9becfBT0S5dm3qnxvin6RBA53Fxyy7CsRdCYIwqDtyXFIV3RgpcLR8q6WNwqRBUjefk/UnySnSYGutMkkcZ7lA+xw42+lIgI2FKuM+fD6NnkWTOGfGxk6M6DTwLTNwXM/cr/iuLdD98777Rjx8xe6B3ioqHsO9w86fRpPovPHcCqOSOZu+bzfjj/HrcHP0+OwF8v0DTNlPA45+ZeDR+e3B5+cTn2AcIbiLymF2GxyuAA35LziuDX7mGoHjHEr2CKct1AX/NHoec7buu3QecVU8YE9ag5tvw4qTjsxkqRgH/U65kRl2JuVc7v/zsm4FepstZLffkd+Yu5rye2wW0DtM97GUVBdga/Wr5Vu4w/+dspR5xZvi/ED5AYzkleNYw3B15Ei7h/Ns//UDhotzZV7d+bltghoQtbitvfRTuxW6XqsFn33iPN6XY/GTLB0jm0bTXsKHx+f0vBJORYEbxS2D/qnVsOlOnLtZPRU2zyV+UU8hdJ/Xb1avf3hij8funpgMBB4PTCXwkNDOCxpfELqnzLbuzlwEo7bnNN1HBbPbao1qjd4wpTbCnvHbDx+jBqMxcUmZiL13ExfcbuIKYx8Legv5eO1S8I1gXJOAPHJ4d3B/7xOmfuXX/AZxnx3Jh3U8Pbus0hoJXnpjtMRknjWeomssr2uMGt4HRjvKK4hwex/OvLZ3Wb+5rUqzEq/LDkgi1zd4mbCGnkZzGfqH4OErWPcr8A==" />

在 TresJS 中加载模型有多种方法：

::: warning
请注意，在上面的示例中，我们使用顶级 await，请确保用 [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) 组件包装它。有关更多信息，请参阅 Suspense。
:::

## 使用 `useLoader`

`useLoader` 组合式函数允许你传递任何类型的 three.js 加载器和一个用于加载资源的 URL。它返回一个包含已加载资源的 `Promise`。

有关如何使用 `useLoader` 的详细说明，请查看 [useLoader](/api/composables#useloader) 文档。

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

然后，你可以将模型场景传递给 TresJS [`primitive`](/advanced/primitive) 组件以渲染它：

```html{2}
<TresCanvas>
    <primitive :object="scene" />
</TresCanvas>
```

> `<primitive />` 组件不是 Tres 源代码中的独立组件。相反，它是 Tres 核心功能的一部分。当你使用 `<primitive>` 时，它会被转换为 `createElement` 调用，该调用会根据提供的“object”道具创建适当的 three.js 对象。

请注意，在上面的示例中，我们使用 `Suspense` 组件包装 `TresCanvas` 组件。这是因为 `useLoader` 返回一个 `Promise`，我们需要等到它解析后才能渲染场景。

## 使用 `useGLTF`

一种更方便的加载模型的方式是使用 [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) 包中提供的 `useGLTF` 组合式函数。

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf')
```

使用 `useGLTF` 的一个优点是，你可以传递一个 `draco` 道具来启用模型的 [Draco 压缩](https://threejs.org/docs/index.html#examples/zh/loaders/DRACOLoader)。这将减小模型的大小并提高性能。

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

或者，你可以使用 `nodes` 属性轻松选择模型中的对象

```vue
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
  >
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <primitive :object="nodes.MyModel" /> // 请注意，这里的 "MyModel" 只是一个占位符
  </TresCanvas>
</template>
```

## 使用 `GLTFModel`

`GLTFModel` 组件是 `useGLTF` 的包装器，可从 [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) 包中获得。

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

这种特殊的方法更直接，但它让你对模型的控制更少。

## useFBX

`useFBX` 组合式函数可从 [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) 包中获得。

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

然后，将场景添加到你的场景中非常简单：

```html{2}
<TresCanvas shadows alpha>
    <primitive :object="scene" />
</TresCanvas>
```

## FBXModel

`FBXModel` 组件是 `useFBX` 的包装器，可从 [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) 包中获得。它的用法类似于 `GLTFModel`：

```vue{2,9}
<script setup lang="ts">
import { OrbitControls, FBXModel } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
      <Suspense>
        <FBXModel path="/models/AkuAku.fbx" />
      </Suspense>
      <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
```
