# 组合式 API {#Composables}

Vue3 的[组合式 API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) 允许您创建可以在多个组件之间共享的可重用的逻辑，还允许您创建自定义钩子，在组件中使用。

**TresJS** 利用组合式 API 创造了一系列组合式的函数，可以用于创建动画、场景交互等等。同时，它还可以用于创建更复杂的场景，可能仅使用 Vue 组件（纹理、加载器等）无法实现。

这些组合式的函数已经被用于 **TresJS** 的核心包中，因此，您可以放心的使用。例如，需要在内部渲染循环中更新的组件使用 `useRenderLoop` 组合式函数注册一个回调函数，这样每次渲染器更新场景时都会调用该回调函数。

## useRenderLoop {#useRenderLoop}

`useRenderLoop` 是 **TresJS** 动画的核心。它允许您注册一个回调函数，在本地刷新率下被调用。这是 **TresJS** 中最重要的组合式函数。

```ts
const { onLoop, resume } = useRenderLoop();

onLoop(({ delta, elapsed, clock, dt }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
});
```

::: warning
请留意使用这个组合式函数的性能影响。它会在每一帧运行，如果回调函数中有很多逻辑，可能会影响您应用的性能。特别是如果您正在更新响应式的状态或引用
:::

`onLoop` 回调函数接收的参数是一个基于 [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) 的对象， 包含以下属性：

- `delta`: delta 属性代表当前帧与上一帧之间的时间差，单位为秒
- `elapsed`: 保存渲染循环运行的总时长

`useRenderLoop` 的实现依赖于 [vueuse](https://vueuse.org/core/useRafFn/) 中的 `useRafFn`。感谢 [@wheatjs](https://github.com/orgs/Tresjs/people/wheatjs) 的贡献。

### 渲染前和渲染后 {#Before and after render}

在渲染器更新场景之前或之后都可以注册对应的回调函数。这对于测试 FPS 性能时很有用。

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop();

onBeforeLoop(({ delta, elapsed }) => {
  // I will run before the renderer updates the scene
  fps.begin();
});

onAfterLoop(({ delta, elapsed }) => {
  // I will run after the renderer updates the scene
  fps.end();
});
```

### 暂停和恢复 {#Pause and resume}

使用暴露出来的 `pause` 和 `resume` 方法可以暂停和恢复渲染循环。

```ts
const { pause, resume } = useRenderLoop();

// Pause the render loop
pause();

// Resume the render loop
resume();
```

使用 `isActive` 属性获取渲染循环的活动状态。

```ts
const { resume, isActive } = useRenderLoop();

console.log(isActive); // false

resume();

console.log(isActive); // true
```

## useLoader {#useLoader}

`useLoader` 组合式函数允许使用 [THREE.js loaders](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models) 加载资源。它返回一个带有已加载资源的 Promise。

```ts
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const { scene } = await useLoader(THREE.GLTFLoader, "path/to/asset.gltf");
```

由于 `useLoader` 组合式函数返回一个 Promise，因此您可以使用 `async/await` 或 `then/catch`。 如果您在组件上使用了这种方式，请确保将该组件包装在 `Suspense` 中。有关更多信息，请参见 [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense)。

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

`useTexture` 组合式函数允许使用 [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader) 加载纹理。它返回一个带有已加载纹理的 Promise。

```ts
const texture = await useTexture(["path/to/texture.png"]);
```

**useTexture** 接收一个对象参数，其包含的属性如下：

- `map`: 用于物体表面的基础纹理
- `displacementMap`: 用于给物体表面添加凸起或凹陷的纹理
- `normalMap`: 用于为对象添加表面细节和阴影变化的纹理
- `roughnessMap`: 用于给对象表面增加粗糙度或哑光效果的纹理
- `metalnessMap`: 用于给物体表面添加金属效果的纹理
- `aoMap`: 用于向物体添加环境光遮蔽（在其他物体阻挡光线的区域添加阴影）的纹理

下面展示了如何加载纹理。

```ts
const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap } =
  await useTexture({
    map: "path/to/albedo.png",
    displacementMap: "path/to/height.png",
    normalMap: "path/to/normal.png",
    roughnessMap: "path/to/roughness.png",
    metalnessMap: "path/to/metalness.png",
    aoMap: "path/to/ambien-occlusion.png",
  });
```

将纹理添加到材质上面。

```vue
<template>
  <TresMesh>
    <TresMeshSphereGeometry />
    <TresMeshStandardMaterial
      :map="map"
      :displacementMap="displacementMap"
      :normalMap="normalMap"
      :roughnessMap="roughnessMap"
      :metalnessMap="metalnessMap"
      :aoMap="aoMap"
    />
  </TresMesh>
</template>
```

与 `useLoader` 一样，使用 `useTexture` 时，可以使用 `async/await` 和 `then/catch`。采用此方式记得将组件包装在 `Suspense` 组件中。

# useCatalogue {#useCatalogue}

`useCatalogue` 组合式函数允许您扩展内部组件，它返回一个函数，您可以使用它来注册新的组件。

这对于想要使用不属于 ThreeJS 核心的对象（如 [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) ）或第三方功能（如物理引擎）特别有用。

```ts
import { useCatalogue } from "@tresjs/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const { extend } = useCatalogue();

extend({ OrbitControls });
```

然后您就可以像下面这样使用新组件了。需要注意一点，新组件的前缀是 `Tres`，这样做是为了避免与 HTML 元素重名。

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresOrbitControls
        v-if="state.renderer"
        :args="[state.camera, state.renderer?.domElement]"
      />
    </TresScene>
  </TresCanvas>
</template>
```

# useTres <Badge type="warning" text="^1.7.0" /> {#useTres}

`useTres` 组合式函数的目标是提供访问 **Tres** 的状态的入口。该状态包含默认的渲染器、相机、场景和其他有用的属性。

```ts
const { state } = useTres();

console.log(state.camera); // THREE.PerspectiveCamera
console.log(state.renderer); // THREE.WebGLRenderer
```
