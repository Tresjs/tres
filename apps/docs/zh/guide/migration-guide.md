# 迁移指南

本指南旨在帮助您从 v1 迁移到最新版本的 TresJS 🤩✨ 。

::: code-group

```bash [pnpm]
pnpm update @tresjs/core
```

```bash [npm]
npm update @tresjs/core
```

```bash [yarn]
yarn upgrade @tresjs/core
```

:::

## 有什么变化?

### Vue 自定义渲染器

**TresJS** 现在是一个位于一个包装组件中的 [Vue 自定义渲染器](https://vuejs.org/api/custom-renderer.html#createrenderer)，该组件 `TresCanvas` 负责为您创建 `WebGLRenderer` 和 `Scene` 创建一个 **新的 Vue App实例** 来渲染场景。

### Typescript 支持以及智能提示 🦾

![TresJS Intellisense](/v2-intellisense.gif)

这可能是 TresJS **最需要的功能**。现在，Tres 组件可与 Volar 配合使用，并提供类型智能提示。

**TresJS** 现在在构建时为基于 ThreeJS 对象清单的所有组件生成类型声明。这意味着您可以使用 ThreeJS 中的所有组件并为它们获取类型智能提示。

### Tres 插件现在是可选项👍

`TresPlugin` 现在是可选的。您可以在没有它的情况下使用 TresJS，方法是直接从 `tresjs/core` 导入组件：

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

::: info
出于性能和捆绑包大小的考虑，建议采用这种方法，树摇的效果会更好，而且您只需导入您使用的组件。
:::

### 不再需要 TresScene

 `<TresScene />`  组件现已弃用，因为场景现在由 `<TresCanvas />`创建.

一开始，我认为为场景创建一个单独的组件，在语义方面保持与普通 ThreeJS 相似是个好主意，但事实证明这并没有什么用处。

现在您可以创建这样一个场景：

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

要迁移代码，只需移除 `<TresScene />` 组件并将子组件移至 `<TresCanvas />` 组件内即可。

### `useCatalog` 现已废弃

`useCatalog`函数现已废弃。现在可以直接从 `@tresjs/core` 中导入目录。

您可以在此处阅读有关它的更多信息：[Extending](/zh/advanced/extending.md)

将如下代码：

```ts {2,5,7}
// 错误的 ❌
import { useCatalog } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

const { extend } = useCatalog()

extend({ TextGeometry })
```

转换成：

```ts {2,6}
// 正确的 ✅
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// 将元素添加到目录中
extend({ TextGeometry })
```

### 模型的`getModel`实例方法现已废弃

`getModel`方法现已废弃. 你可以直接访问`model`的属性.

将如下代码：

```vue {7,9-12}
// 错误的 ❌
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, ({ getModel }) => {
  const model = getModel()
  model.position.set(0, 0, 0)
})
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

转换成：

```vue {7,9-12}
// 正确的 ✅
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, (model) => {
  // Do something with the model
  model.position.set(0, 0, 0)
})
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

### 相机需要放置于任何控制器之前 🎥

`TresOrbitControls`组件在组件树内需要处于相机之后。这是因为控制器需要知道相机才能工作。

将如下代码：

```vue {3,5}
// 错误的 ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

转换成：

```vue {3,5}
// 正确的 ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```

## UseTres 现在变成了 useTresContext <Badge type="warning" text="^3.0.0" />

对于 v3，我们重新设计了整个状态逻辑，使其更灵活、更易于用于插件作者和生态系统包。我们现在不再像 v2 那样使用存储，而是使用基于 `provide/inject`。

`useTres` 函数现在是 `useTresContext` 函数的别名，以避免破坏演示和实验，但从现在起请考虑使用 `useTresContext`。

您现在可以直接获取 `scene` 和 `renderer`的引用以及其他属性，而不是一个大的 reactive 对象。

将如下代码：

```ts {2}
// 错误的 ❌
import { useTres } from '@tresjs/core'

const { state, setState } = useTres()

console.log(state.scene)
```

转换成：

```ts {2}
// 正确的 ✅
import { useTresContext } from '@tresjs/core'

const { scene, renderer } = useTresContext()

console.log(scene.value)
```

有关新上下文对象提供系统的更多详细信息，请阅读 [API 文档](/zh/api/composables.md) 部分。
