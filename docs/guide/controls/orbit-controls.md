# OrbitControls

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) is a camera controller that allows you to orbit around a target. It's a great way to explore your scene.

However, it is not part of the core of ThreeJS. So to use it you would need to import it from the `three/examples/jsm/controls/OrbitControls` module.

Here is where the fancy part begins. ✨  
The `cientos` package provides a component called `<OrbitControls />` that is a wrapper of the `OrbitControls` from the [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

The nicest part? You don't need to extend the catalog or pass any arguments.  
It just works. 💯

```vue{3}
<template>
  <TresCanvas shadows alpha>
    <OrbitControls />

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
