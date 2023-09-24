# MapControls

<DocsDemo>
  <MapControlsDemo />
</DocsDemo>

[MapControls](https://threejs.org/docs/index.html?q=controls#examples/en/controls/MapControls) similar to OrbitControls, this control is intended for transforming a camera over a map from bird's eye perspective, but uses a specific preset for mouse/touch interaction and disables screen space panning by default.

However, as it is not part of the core of ThreeJS, to use it you would need to import it from the `three/examples/jsm/controls/MapControls` module.

Here is where the fancy part begins. ✨
The `cientos` package provides a component called `<MapControls />`, which is a wrapper of the `MapControls` from the [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

The nicest part? You don't need to extend the catalog or pass any arguments.
It just works. 💯

## Usage

```vue{4}
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <MapControls />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

::: warning
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
:::

## Props

| Prop              | Description                                                                                                      | Default     |
| :---------------- | :--------------------------------------------------------------------------------------------------------------- | ----------- |
| **makeDefault**   | If `true`, the controls will be set as the default controls for the scene.                                       | `false`     |
| **camera**        | The camera to control.                                                                                           | `undefined` |
| **domElement**    | The dom element to listen to.                                                                                    | `undefined` |
