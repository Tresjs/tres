# OrbitControls

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) 是一个相机控制器，它允许您围绕一个目标旋转。这是探索场景的好方法。

然而，它不在 ThreeJS 的核心包中。需要从 `three/examples/jsm/controls/OrbitControls` 导入。

`cientos` 包提供了名为 `<OrbitControls />` 的组件。它实际上是 [`three-stdlib`](https://github.com/pmndrs/three-stdlib) 模块中 `OrbitControls` 包装器。 ✨

The nicest part? You don't need to extend the catalog or pass any arguments.  
It just works. 💯

```vue{3}
<template>
  <TresCanvas shadows alpha>
    <OrbitControls />
    <TresScene> ... </TresScene>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                      | Default     |
| :---------------- | :--------------------------------------------------------------------------------------------------------------- | ----------- |
| **makeDefault**   | If `true`, the controls will be set as the default controls for the scene.                                       | `false`     |
| **camera**        | The camera to control.                                                                                           | `undefined` |
| **domElement**    | The dom element to listen to.                                                                                    | `undefined` |
| **target**        | The target to orbit around.                                                                                      | `undefined` |
| **enableDamping** | If `true`, the controls will use damping (inertia), which can be used to give a sense of weight to the controls. | `false`     |
