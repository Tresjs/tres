---
title: Camera Controls
description: Is similar to OrbitControls yet supports smooth transitions and more features.
---

::SceneWrapper
  ::ControlsCameraControls
  ::
::

[CameraControls](https://github.com/yomotsu/camera-controls) is a camera controller similar to [OrbitControls](/api/controls/orbit-controls) yet supports smooth transitions and more features.

However, it is thirty party library for ThreeJS. So to use it you would need to install and import using [npm](https://www.npmjs.com/package/camera-controls).

## Usage

```vue{7}
<script setup>
import { CameraControls } from "@tresjs/cientos"
</script>
<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <CameraControls />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper />
  </TresCanvas>
</template>
```

::prose-warning
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
::

## Props

Certainly! Here's the properties of the object in raw markdown table format:

| Prop                      | Description                                                                                                                                                                               | Default                                                   |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **makeDefault**           | Whether to make this the default controls.                                                                                                                                                | `false`                                                   |
| **camera**                | The camera to control.                                                                                                                                                                    | `undefined`                                               |
| **domElement**            | The DOM element to listen to.                                                                                                                                                             | `undefined`                                               |
| **minPolarAngle**         | Minimum vertical angle in radians.                                                                                                                                                        | `0`                                                       |
| **maxPolarAngle**         | Maximum vertical angle in radians.                                                                                                                                                        | `Math.PI`                                                 |
| **minAzimuthAngle**       | Minimum horizontal angle in radians.                                                                                                                                                      | `-Infinity`                                               |
| **maxAzimuthAngle**       | Maximum horizontal angle in radians.                                                                                                                                                      | `Infinity`                                                |
| **distance**              | Current distance.                                                                                                                                                                         | `camera.position.z`                                       |
| **minDistance**           | Minimum distance for dolly. PerspectiveCamera only.                                                                                                                                       | `Number.EPSILON`                                          |
| **maxDistance**           | Maximum distance for dolly. PerspectiveCamera only.                                                                                                                                       | `Infinity`                                                |
| **infinityDolly**         | `true` to enable Infinity Dolly for wheel and pinch.                                                                                                                                      | `false`                                                   |
| **minZoom**               | Minimum camera zoom.                                                                                                                                                                      | `0.01`                                                    |
| **maxZoom**               | Maximum camera zoom.                                                                                                                                                                      | `Infinity`                                                |
| **smoothTime**            | Approximate time in seconds to reach the target. A smaller value will reach the target faster.                                                                                            | `0.25`                                                    |
| **draggingSmoothTime**    | The smoothTime while dragging.                                                                                                                                                            | `0.125`                                                   |
| **maxSpeed**              | Max transition speed in units per second.                                                                                                                                                 | `Infinity`                                                |
| **azimuthRotateSpeed**    | Speed of azimuth (horizontal) rotation.                                                                                                                                                   | `1.0`                                                     |
| **polarRotateSpeed**      | Speed of polar (vertical) rotation.                                                                                                                                                       | `1.0`                                                     |
| **dollySpeed**            | Speed of mouse-wheel dollying.                                                                                                                                                            | `1.0`                                                     |
| **dollyDragInverted**     | `true` to invert direction when dollying or zooming via drag.                                                                                                                             | `false`                                                   |
| **truckSpeed**            | Speed of drag for truck and pedestal.                                                                                                                                                     | `2.0`                                                     |
| **dollyToCursor**         | `true` to enable Dolly-in to the mouse cursor coords.                                                                                                                                     | `false`                                                   |
| **dragToOffset**          | Whether to drag to offset.                                                                                                                                                                | `false`                                                   |
| **verticalDragToForward** | The same as `.screenSpacePanning` in three.js's OrbitControls.                                                                                                                            | `false`                                                   |
| **boundaryFriction**      | Friction ratio of the boundary.                                                                                                                                                           | `0.0`                                                     |
| **restThreshold**         | Controls how soon the `rest` event fires as the camera slows.                                                                                                                             | `0.01`                                                    |
| **colliderMeshes**        | An array of Meshes to collide with the camera. Be aware colliderMeshes may decrease performance. The collision test uses 4 raycasters from the camera since the near plane has 4 corners. | `[]`                                                      |
| **mouseButtons**          | Configuration of actions on mouse input.                                                                                                                                                  | See [`User input config`](#user-input-config) for details |
| **touches**               | Configuration of actions on touch.                                                                                                                                                        | See [`User input config`](#user-input-config) for details |

## User input config

You can easily override the default user input config by defining `mouseButtons` and/or `touches` props that correspond to [`camera-controls` settings](https://github.com/yomotsu/camera-controls?#user-input-config). For ease of use, we're re-exporting the `CameraControls` class as `BaseCameraControls` which gives you access to the `ACTION` enum.

```vue
<script lang="ts" setup>
import { BaseCameraControls, CameraControls } from '@tresjs/cientos'
</script>

<template>
  ...
  <CameraControls
    :mouse-buttons="{ left: BaseCameraControls.ACTION.DOLLY }"
    :touches="{ one: BaseCameraControls.ACTION.TOUCH_TRUCK }"
  />
  ...
</template>
```

### Mouse buttons

| Button to assign        | Options                                                        | Default                                                         |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| `mouseButtons.left`     | `ROTATE` \| `TRUCK` \| `OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE` | `ROTATE`                                                        |
| `mouseButtons.right`    | `ROTATE` \| `TRUCK` \| `OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE` | `TRUCK`                                                         |
| `mouseButtons.wheel` ¹  | `ROTATE` \| `TRUCK` \| `OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE` | `DOLLY` for Perspective camera, `ZOOM` for Orthographic camera. |
| `mouseButtons.middle` ² | `ROTATE` \| `TRUCK` \| `OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE` | `DOLLY`                                                         |

1. Mouse wheel event for scroll "up/down", on mac "up/down/left/right".
2. Mouse wheel "button" click event.

### Touches

| Fingers to assign | Options                                                                                                                                                                                                                                 | Default                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `touches.one`     | `TOUCH_ROTATE` \| `TOUCH_TRUCK` \| `TOUCH_OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE`                                                                                                                                                        | `TOUCH_ROTATE`                                                                         |
| `touches.two`     | `TOUCH_DOLLY_TRUCK` \| `TOUCH_DOLLY_OFFSET` \| `TOUCH_DOLLY_ROTATE` \| `TOUCH_ZOOM_TRUCK` \| `TOUCH_ZOOM_OFFSET` \| `TOUCH_ZOOM_ROTATE` \| `TOUCH_DOLLY` \| `TOUCH_ZOOM` \| `TOUCH_ROTATE` \| `TOUCH_TRUCK` \| `TOUCH_OFFSET` \| `NONE` | `TOUCH_DOLLY_TRUCK` for Perspective camera, `TOUCH_ZOOM_TRUCK` for Othographic camera. |
| `touches.three`   | `TOUCH_DOLLY_TRUCK` \| `TOUCH_DOLLY_OFFSET` \| `TOUCH_DOLLY_ROTATE` \| `TOUCH_ZOOM_TRUCK` \| `TOUCH_ZOOM_OFFSET` \| `TOUCH_ZOOM_ROTATE` \| `TOUCH_ROTATE` \| `TOUCH_TRUCK` \| `TOUCH_OFFSET` \| `NONE`                                  | `TOUCH_TRUCK`                                                                          |

## Events

```vue
<CameraControls @change="onChange" @start="onStart" @end="onEnd" />
```

| Event      | Description                                   |
| :--------- | :-------------------------------------------- |
| **start**  | Dispatched when the control starts to change. |
| **change** | Dispatched when the control changes.          |
| **end**    | Dispatched when the control ends to change.   |
