# OrbitControls

<DocsDemo>
  <OrbitControlsDemo />
</DocsDemo>


[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) is a camera controller that allows you to orbit around a target. It's a great way to explore your scene.

However, it is not part of the core of ThreeJS. So to use it you would need to import it from the `three/examples/jsm/controls/OrbitControls` module.

Here is where the fancy part begins. ✨  
The `cientos` package provides a component called `<OrbitControls />` that is a wrapper of the `OrbitControls` from the [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

The nicest part? You don't need to extend the catalog or pass any arguments.  
It just works. 💯

```vue{3}
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <OrbitControls />

  </TresCanvas>
</template>
```

::: warning
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
:::

## Props

| Prop                | Description                                                                                                                                                                      | Default                                                                          |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **makeDefault**     | If `true`, the controls will be set as the default controls for the scene.                                                                                                       | `false`                                                                          |
| **camera**          | The camera to control.                                                                                                                                                           | `undefined`                                                                      |
| **domElement**      | The dom element to listen to.                                                                                                                                                    | `undefined`                                                                      |
| **target**          | The target to orbit around.                                                                                                                                                      | `undefined`                                                                      |
| **enableDamping**   | If `true`, the controls will use damping (inertia), which can be used to give a sense of weight to the controls.                                                                 | `false`                                                                          |
| **dampingFactor**   | The damping inertia used if `.enableDamping` is set to true.                                                                                                                     | `0.05`                                                                           |
| **autoRotate**      | Set to true to automatically rotate around the target.                                                                                                                           | `false`                                                                          |
| **autoRotateSpeed** | How fast to rotate around the target if `.autoRotate` is true.                                                                                                                   | `2`                                                                              |
| **enablePan**       | Whether to enable panning.                                                                                                                                                       | `true`                                                                           |
| **keyPanSpeed**     | How fast to pan the camera when the keyboard is used. Default is 7.0 pixels per keypress.                                                                                        | `7.0`                                                                            |
| **keys**            | This object contains references to the keycodes for controlling camera panning. Default is the 4 arrow keys.                                                                     | `{ LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' }` |
| **maxAzimuthAngle** | How far you can orbit horizontally, upper limit. If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI ). Default is Infinity.   | `Infinity`                                                                       |
| **minAzimuthAngle** | How far you can orbit horizontally, lower limit. If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI ). Default is - Infinity. | `-Infinity`                                                                      |
| **maxPolarAngle**   | How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI.                                                                            | `Math.PI`                                                                        |
| **minPolarAngle**   | How far you can orbit vertically, lower limit. Range is 0 to Math.PI radians, and default is 0.                                                                                  | `0`                                                                              |
| **minDistance**     | The minimum distance of the camera to the target. Default is 0.                                                                                                                  | `0`                                                                              |
| **maxDistance**     | The maximum distance of the camera to the target. Default is Infinity.                                                                                                           | `Infinity`                                                                       |
| **minZoom**         | The minimum field of view angle, in radians. Default is 0.                                                                                                                       | `0`                                                                              |
| **maxZoom**         | The maximum field of view angle, in radians. ( OrthographicCamera only ). Default is Infinity.                                                                                   | `Infinity`                                                                       |
| **touches**         | This object contains references to the touch actions used by the controls.                                                                                                       | `{ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }`                                    |
| -                   | -                                                                                                                                                                                |
| **enableZoom**      | Whether to enable zooming.                                                                                                                                                       | `true`                                                                           |
| **zoomSpeed**       | How fast to zoom in and out. Default is 1.                                                                                                                                       | `1`                                                                              |
| **enableRotate**    | Whether to enable rotating.                                                                                                                                                      | `true`                                                                           |
| **rotateSpeed**     | How fast to rotate around the target. Default is 1.                                                                                                                              | `1`                                                                              |

## Events

```html
<OrbitControls @change="onChange" @start="onStart" @end="onEnd" />
```

| Event      | Description                                   |
| :--------- | :-------------------------------------------- |
| **start**  | Dispatched when the control starts to change. |
| **change** | Dispatched when the control changes.          |
| **end**    | Dispatched when the control ends to change.   |
