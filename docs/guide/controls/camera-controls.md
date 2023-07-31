# CameraControls

[CameraControls](https://github.com/yomotsu/camera-controls) is a camera controller similar to [OrbitControls](https://cientos.tresjs.org/guide/controls/orbit-controls.html) yet supports smooth transitions and more features.

However, it is thirty party library for ThreeJS. So to use it you would need to install and import using [npm](https://www.npmjs.com/package/camera-controls).

Here is where the fancy part begins. ✨
The `cientos` package provides a component called `<CameraControls />` that is a wrapper of the `CameraControls` from the [`camera-controls`](https://github.com/yomotsu/camera-controls) module.

The nicest part? You don't need to extend the catalog or pass any arguments.
It just works. 💯

```vue{3}
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <CameraControls />
  </TresCanvas>
</template>
```

::: warning
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
:::

## Props

Certainly! Here's the properties of the object in raw markdown table format:

| Prop                      | Description                                                                                                                                                                               | Default          |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **makeDefault**           | Whether to make this the default controls.                                                                                                                                                | `false`          |
| **camera**                | The camera to control.                                                                                                                                                                    | `undefined`      |
| **domElement**            | The DOM element to listen to.                                                                                                                                                             | `undefined`      |
| **minPolarAngle**         | Minimum vertical angle in radians.                                                                                                                                                        | `0`              |
| **maxPolarAngle**         | Maximum vertical angle in radians.                                                                                                                                                        | `Math.PI`        |
| **minAzimuthAngle**       | Minimum horizontal angle in radians.                                                                                                                                                      | `-Infinity`      |
| **maxAzimuthAngle**       | Maximum horizontal angle in radians.                                                                                                                                                      | `Infinity`       |
| **minDistance**           | Minimum distance for dolly. PerspectiveCamera only.                                                                                                                                       | `Number.EPSILON` |
| **maxDistance**           | Maximum distance for dolly. PerspectiveCamera only.                                                                                                                                       | `Infinity`       |
| **infinityDolly**         | `true` to enable Infinity Dolly for wheel and pinch.                                                                                                                                      | `false`          |
| **minZoom**               | Minimum camera zoom.                                                                                                                                                                      | `0.01`           |
| **maxZoom**               | Maximum camera zoom.                                                                                                                                                                      | `Infinity`       |
| **smoothTime**            | Approximate time in seconds to reach the target. A smaller value will reach the target faster.                                                                                            | `0.25`           |
| **draggingSmoothTime**    | The smoothTime while dragging.                                                                                                                                                            | `0.125`          |
| **maxSpeed**              | Max transition speed in units per second.                                                                                                                                                 | `Infinity`       |
| **azimuthRotateSpeed**    | Speed of azimuth (horizontal) rotation.                                                                                                                                                   | `1.0`            |
| **polarRotateSpeed**      | Speed of polar (vertical) rotation.                                                                                                                                                       | `1.0`            |
| **dollySpeed**            | Speed of mouse-wheel dollying.                                                                                                                                                            | `1.0`            |
| **dollyDragInverted**     | `true` to invert direction when dollying or zooming via drag.                                                                                                                             | `false`          |
| **truckSpeed**            | Speed of drag for truck and pedestal.                                                                                                                                                     | `2.0`            |
| **dollyToCursor**         | `true` to enable Dolly-in to the mouse cursor coords.                                                                                                                                     | `false`          |
| **dragToOffset**          | Whether to drag to offset.                                                                                                                                                                | `false`          |
| **verticalDragToForward** | The same as `.screenSpacePanning` in three.js's OrbitControls.                                                                                                                            | `false`          |
| **boundaryFriction**      | Friction ratio of the boundary.                                                                                                                                                           | `0.0`            |
| **restThreshold**         | Controls how soon the `rest` event fires as the camera slows.                                                                                                                             | `0.01`           |
| **colliderMeshes**        | An array of Meshes to collide with the camera. Be aware colliderMeshes may decrease performance. The collision test uses 4 raycasters from the camera since the near plane has 4 corners. | `[]`             |

## Events

```html
<CameraControls @change="onChange" @start="onStart" @end="onEnd" />
```

| Event      | Description                                   |
| :--------- | :-------------------------------------------- |
| **start**  | Dispatched when the control starts to change. |
| **change** | Dispatched when the control changes.          |
| **end**    | Dispatched when the control ends to change.   |
