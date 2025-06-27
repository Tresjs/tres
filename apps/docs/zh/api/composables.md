# 组合式函数

Vue 3的[Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) 允许您创建可在组件之间共享的可重用逻辑。它还允许您创建可在组件中使用的自定义钩子。

**TresJS** 充分利用这个API创建了一组组合式函数，可用于创建动画、与场景交互等。它还允许您创建更复杂的场景，不仅使用Vue组件（纹理、加载器等）实现。

**TresJS** 核心在内部使用这些组合式函数，因此可以使用与核心相同API。例如，需要在内部渲染循环中更新的组件使用 `useRenderLoop` 来注册一个回调函数，每当渲染器更新场景时都会调用该函数。

## useRenderLoop

`useRenderLoop` 是 **TresJS** 动画的核心。它可以注册一个回调函数，该函数将在原生刷新率下被调用。这是 **TresJS** 中最重要的组合式函数。

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock }) => {
  // 它将在每一帧运行 ~60FPS (取决于您的显示器)
})
```

::: warning

请注意使用此组合式函数的性能影响。它将在每一帧运行，因此如果在回调中有大量逻辑，可能会影响应用程序的性能。特别是如果您正在更新响应式状态或引用。
:::

`onLoop` 回调接收一个基于[THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock)的对象，该对象具有以下属性：

- `delta`: 当前帧与上一帧之间的时间差。这是自上一帧以来的时间（以秒为单位）。
- `elapsed`: 自渲染循环开始以来的时间。

这个组合式函数基于 [vueuse](https://vueuse.org/core/useRafFn/) 中的 `useRafFn` 。感谢 [@wheatjs](https://github.com/orgs/Tresjs/people/wheatjs) 的出色贡献

### 渲染前后

您还可以注册一个在渲染器更新场景之前和之后调用的回调函数。例如，添加了性能分析工具以测量FPS，将非常有用。

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop()

onBeforeLoop(({ delta, elapsed }) => {
  // 在渲染器更新场景之前运行
  fps.begin()
})

onAfterLoop(({ delta, elapsed }) => {
  // 在渲染器更新场景之后运行
  fps.end()
})
```

### 暂停和恢复

您可以使用 `pause` 和 `resume` 方法来暂停和恢复循环渲染。

```ts
const { pause, resume } = useRenderLoop()

// 暂停循环渲染
pause()

// 恢复循环渲染
resume()
```

您还可以使用 `isActive` 属性获取循环渲染的活动状态。

```ts
const { resume, isActive } = useRenderLoop()

console.log(isActive) // false

resume()

console.log(isActive) // true
```

## useLoader

`useLoader` 组合式函数可以使用 [THREE.js loaders](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models) 加载器加载资源。它返回一个带有加载后资源的Promise。

```ts
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(THREE.GLTFLoader, 'path/to/asset.gltf')
```

由于 `useLoader` 组合式函数返回一个Promise，您可以使用 `async/await` 或 `then/catch`。如果您在组件上使用它，请确保将其包装在 `Suspense` 组件中。有关更多信息，请参阅[Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense)。

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

`useTexture` 组合式函数可以使用 [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader) 纹理加载器加载纹理。它返回一个带有已加载纹理的Promise。

```ts
const texture = await useTexture(['path/to/texture.png'])
```

**useTexture** 还可以传入一个包含以下属性的对象：

- `map`: 用于物体表面的基本纹理
- `displacementMap`: 用于在物体表面添加凹凸或凹痕的纹理
- `normalMap`: 用于在物体上添加表面细节和阴影变化的纹理
- `roughnessMap`: 用于在物体表面添加粗糙度或哑光效果的纹理
- `metalnessMap`: 用于在物体表面添加金属效果的纹理
- `aoMap`: 用于在物体上添加环境遮蔽（在光被其他物体挡住的区域中添加阴影）的纹理
- `alphaMap`: 用于向物体添加 alpha（黑色部分渲染为透明）的纹理。在材质上使用这个映射，需要设置 `:transparent="true"`
- `matcap`: 材质颜色和阴影的纹理编码

在这种情况下，它将返回一个包含已加载纹理的对象。

```ts
const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap, alphaMap, matcap } = await useTexture({
  map: 'path/to/albedo.png',
  displacementMap: 'path/to/height.png',
  normalMap: 'path/to/normal.png',
  roughnessMap: 'path/to/roughness.png',
  metalnessMap: 'path/to/metalness.png',
  aoMap: 'path/to/ambien-occlusion.png',
  alphaMap: 'path/to/alpha.png',
  matcap: 'path/to/matcap.png',
})
```

然后，可以将纹理绑定到材质上。

```vue
<template>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial
        :map="map"
        :displacement-map="displacementMap"
        :normal-map="normalMap"
        :roughness-map="roughnessMap"
        :metalness-map="metalnessMap"
        :ao-map="aoMap"
        :alpha-map="alphaMap"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

与上述类似，`useTexture` 组合式函数返回一个Promise，您可以使用 `async/await` 或 `then/catch`。如果您在组件上使用它，请确保将其包装在 `Suspense` 组件中。

## useSeek

`useSeek` 组合式函数提供了一些实用工具，可轻松遍历和浏览复杂的ThreeJS场景和对象子图。它导出了4个函数，允许您根据特定属性查找子对象。

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek()
```

`useSeek` 函数接受三个参数：

- `parent`: 一个 ThreeJS 场景或 Object3D
- `property`: 用于搜索条件的属性
- `value`: 匹配的属性值

`seek` 和 `seekByName` 函数遍历对象并返回具有指定属性和值的子对象。如果找不到具有给定属性和值的子对象，则返回 null 并抛出警告。

```ts
const carRef = ref(null)

watch(carRef, ({ model }) => {
  if (model) {
    const car = model.children[0]

    const body = seek(car, 'name', 'Octane_Octane_Body_0')
    body.color.set(new Color('blue'))
  }
})
```

类似地，`seekAll` 和 `seekAllByName` 函数返回一个包含具有指定属性和值的子对象的数组。如果没有找到匹配项，则返回一个空数组，并抛出警告。

```ts
const character = ref(null)

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, 'Bone')
  }
})
```

## useTresContext

这个组合式函数提供对包含多个有用属性的状态模型的访问。

```ts
const { camera, renderer, camera, cameras } = useTresContext()
```

::: warning
`useTresContext` 只能在 `TresCanvas` 内部使用，因为 `TresCanvas` 充当上下文数据的提供者。如果在TresCanvas的父组件中需要上下文，请使用[TresCanvas暴露的上下文](tres-canvas#exposed-public-properties)。
:::

```vue
<TresCanvas>
  <MyModel />
</TresCanvas>
```

```vue
// MyModel.vue

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'

const context = useTresContext()
</script>
```

### 上下文的属性
| 属性 | 描述 |
| --- | --- |
| **camera** | 当前激活的相机 |
| **cameras** | 场景中存在的相机|
| **controls** | 场景控件 |
| **deregisterCamera** | 用于取消注册相机的方法。仅在手动创建相机时需要。`template` 中的相机会自动取消注册。 |
| **extend** | 扩展组件目录。请查看 [extending](/advanced/extending) |
| **raycaster** | 用于鼠标事件的全局光线投射器 |
| **registerCamera** | 用于注册相机的方法。只有在手动创建相机时才需要。在 `template` 中，相机会自动注册。 |
| **renderer** | 场景中的 [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) |
| **scene** | [场景](https://threejs.org/docs/?q=sce#api/en/scenes/Scene) |
| **setCameraActive** | 设置当前激活的相机 |
| **sizes** | 画布的宽度、高度和宽高比 |
