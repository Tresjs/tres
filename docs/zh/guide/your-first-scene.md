# 您的第一个场景{#Your first scene}

本小节会指导您创建第一个场景。🍩

## 设置 Canvas {#Setting up the experience Canvas}

在创建场景之前，我们需要一个地方来显示它。使用 [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) 的时候，我们需要创建一个 `canvas` 元素来挂载 `WebglRenderer` 并初始化 `scene`。

使用 **TresJS**，您只需要在 Vue 组件中添加默认组件 `<TresCanvas />` 即可。

```vue
<template>
  <TresCanvas> // Your scene is going to live here </TresCanvas>
</template>
```

::: warning
请记住，所有与场景相关的组件都需要写在 `<TresCanvas />` 组件中，否则它们无法渲染。
:::

`TresCanvas` 组件会在内部进行以下设置：

- 创建一个 [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer)，并且在每一帧中自动更新。
- 设置了基于浏览器刷新率的渲染循环(render loop) 并且在每一帧中被调用

## 创建场景 {#Creating a scene}

创建 3D 效果的三要素：

- 相机 [**Camera**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- 物体 [**Object**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)
- 用于放置相机和物体的场景 [**Scene**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene)

在 **TresJS** 中，您可以使用 `<TresScene />` 组件创建场景

```vue
<template>
  <TresCanvas>
    <TresScene>
      <!-- Your scene goes here -->
    </TresScene>
  </TresCanvas>
</template>
```

使用 `<TresPerspectiveCamera />` 组件添加透视相机 [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera)

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresScene>
      <!-- Your scene goes here -->
    </TresScene>
  </TresCanvas>
</template>
```

## 添加球体 {#Adding a Sphere}

当前场景空空如也，是时候往里面添加物体了。若我们使用的是 **ThreeJS** 这个原始库，我们需要创建一个网格 [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh) 对象，并且将材质 [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) 和几何体 [**Geometry**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) 附加到它上面，就像这样：

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32);
const material = new THREE.MeshBasicMaterial({ color: "orange" });
const donut = new THREE.Mesh(geometry, material);
scene.add(donut);
```

网格是 three.js 中的基本场景对象，用于保存表示三维空间中形状所需的几何体和材质。

现在让我们看看如何使用 **TresJS** 轻松实现上面的效果。首先添加 `<TresMesh />` 组件，接着在它的默认插槽中加入 `<TresTorusGeometry />` 和 `<TresMeshBasicMaterial />`。

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresScene>
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```

::: info
温馨提示，您不需要导入任何东西，因为 **TresJS** 会自动生成 **您想使用的 ThreeJS 对象对应的 Vue 组件，这些组件采用以 Tres 开头的驼峰式命名**。例如：您想使用 ThreeJS 中的 `AmbientLight`，您可以使用`<TresAmbientLight />` 组件。
:::

<FirstScene />

从现在起，您可以往场景中任意添加物体，随意修改它们的属性值，观察它们的变化。
