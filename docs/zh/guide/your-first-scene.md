# 你的第一个场景

本指南将帮助您创建第一个 Tres 场景。 🍩

<ClientOnly>
<div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
  <DonutExample />
</div>
</ClientOnly>

## 设置体验画布

在我们创建场景前，我们需要一个什么来展示它。使用原始的 [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) 我们会需要创建一个 `canvas` HTML 元素来挂载 `WebglRenderer` 并初始化一个场景。

通过 **TresJS** 你仅仅需要导入默认组件 `<TresCanvas />` 并把它添加到你的 Vue 组件的模板部分即可。

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- 这里是您的场景 -->
  </TresCanvas>
</template>
```

::: warning
重要的一点是所有依赖于场景的组件必须存在于 `<TresCanvas />`组件内。否则，他们不会被渲染。
:::

这个 `TresCanvas` 组件会在场景幕后做一些设置的工作:

- 它创建一个 [**WebGLRenderer**](https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer) 用于自动更新每一帧。
- 它根据浏览器刷新率设置要在每一帧上调用的渲染循环。

## 画布尺寸

默认的情况下，`TresCanvas` 组件会跟随**父元素的宽高**，如果出现空白页，请确保父元素的大小合适。

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- 这里是您的场景 -->
  </TresCanvas>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
```

如果您的场景不是用户界面的一部分，您也可以通过像这样的使用 `window-size` prop 来强制画布使用整个窗口的宽度和高度:

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- 这里是您的场景 -->
  </TresCanvas>
</template>
```

## 创建一个场景

我们只需要 4 个核心元素来创建 3D 体验:

- 一个将摄像机和对象固定在一起的[**场景**](https://threejs.org/docs/index.html?q=scene#api/zh/scenes/Scene)。
- 一个用于将场景渲染到 DOM 中的[**渲染器**](https://threejs.org/docs/index.html?q=renderer#api/zh/renderers/WebGLRenderer)。
- 一个[**相机**](https://threejs.org/docs/index.html?q=camera#api/zh/cameras/Camera)
- 一个[**对象**](https://threejs.org/docs/index.html?q=object#api/zh/core/Object3D)

使用 **TresJS** 时，您只需将 `<TresCanvas />` 组件添加到 Vue 组件的模板中，它就会自动为您创建`Renderer`（`canvas` 作为 DOM 元素）和`Scene`。

```vue
<template>
  <TresCanvas window-size>
    <!-- 这里是您的场景 -->
  </TresCanvas>
</template>
```

然后，您可以使用 `<TresPerspectiveCamera />` 组件来添加一个 [**透视相机**](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera)

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

::: warning
一个常见的问题是相机默认位置是场景的原点（0,0,0），如果 prop `position` 为空， TresJS 会自动将相机的位置设置为 `[3,3,3]`。如果场景中未定义摄像机，则会自动添加透视摄像机。
:::

## 添加一个🍩

那个场景看起来有点空，让我们添加一个基本对象。如果我们使用普通的 **ThreeJS**，我们需要创建一个 [**网格**](https://threejs.org/docs/index.html#api/zh/objects/Mesh) 对象，并在其上附加一个 [**材质**](https://threejs.org/docs/index.html#api/zh/materials/Material) 和一个 [**几何体**](https://threejs.org/docs/index.html#api/zh/core/BufferGeometry)，如下所示:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32)
const material = new THREE.MeshBasicMaterial({ color: 'orange' })
const donut = new THREE.Mesh(geometry, material)
scene.add(donut)
```

**网格**是 three.js 中的基本场景对象，用于保存在 3D 空间中表示形状所需的几何体和材质。

现在让我们看看如何使用 TresJS 轻松实现相同的事情。为此，我们将使用 `<TresMesh />` 组件，在默认插槽之间，我们将传递一个 `<TresTorusGeometry />` 和一个`<TresMeshBasicMaterial />`。

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
  </TresCanvas>
</template>
```

::: info
请注意，我们不需要导入任何东西，这是因为 **TresJS** 会为**您使用的 UpperCamelCase 的带有 Tres 前缀的 Three 对象自动生成一个 Vue 组件**。例如，如果要使用 `<TresAmbientLight />` 组件。
:::

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    window-size
  >
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

从这里开始，您可以开始向场景中添加更多对象，并调整组件的属性来查看它们如何影响场景。

<SandboxDemo url="https://play.tresjs.org/#eNqVVMtu2kAU/ZWRu8iiYIcQoojSikCjqlXTRi27OIuJfYGBeWlmzKOIf+8d2zhD2kZU8oI5955z3+yiiQF7o3W8KiDqRwObGaYdseAKTTiVs/dp5GwafUglE1oZR3bEU8ZUrqglezI1SpCzoUNsYZNMGTh7l8pBUgkhDR8OhObUAb4IGQT0jAM17UxxZTDOm+uLj6NxL43ImslcrduW/ao4NesejNWQObaCMRVgaGUjpK+VZY4piSoP3Rbx32MaNeapWqHlEqUbiCu1bFPnCect4r+GkIQx78DO63eNTJQp7CdQApzZkj41M+tVOigR91qkc4XBL1Cs0QmURtSy7A5bYRjl5FC4MthoCBiD5EXoUuBGPDGQ7iubzR3pM+lAYtVbFOg03IpZtReBQRL0PmpF1Qzbgup4YZXEie88K60NOOg+KRGPhUP1hjSaO6dtP0myXCI/B85WJpbgEqlFEroPu3EvPk9yZl3iYfROo9Yfwr4cVQY9VbtioPxVKF/Dx1HcGuhSU3lK7o3v8DI+jzu18gGMBfOcUHtu4CRd7zdExd415vsWrAjbgDdXWDi5v4H7sIO7hop4J7CJxXF3az87pwby/xCuCK9Jo2M7B8FOED24+uIv46uEs6dQ0ivuU7nHnXQ2U3LKZi82MlNCMw7mu/aHfbyZlHO1/lJizhTQ5JfNIVv+BV/YTZXyPS4LmBW2+3mUeMDgKvPtz2+wwd+NUai84PVw/mH8AVbxwudYuY0KmWPagV+Z7efywJicTeztprzcuqijRN1WQ4k+HP46ml2rgMeycaV/OY7xK116rqwbd5uG738DogXwDg==" />
