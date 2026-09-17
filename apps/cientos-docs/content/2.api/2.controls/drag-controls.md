---
title: Drag Controls
description: Drag and drop 3D objects in your scene with pointer events
---

The [Drag Controls](https://threejs.org/docs/#examples/en/controls/DragControls) allow you to drag and move 3D objects in your scene using pointer events. You can optionally lock movement to a single axis, set drag limits per axis, and listen to drag lifecycle events.

::SceneControlsWrapper
  ::ControlsDragControls
  ::
::

## Usage

The `objects` prop accepts an array of `Object3D` instances. You can pass template refs directly — Vue will unwrap them automatically.

```vue{3}
<script setup>
import { shallowRef } from 'vue'
import { DragControls } from '@tresjs/cientos'

const boxRef = shallowRef()
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 7.5, 7.5]" :look-at="[0, 0, 0]" />
    <DragControls :objects="[boxRef]" />
    <TresMesh ref="boxRef">
      <TresBoxGeometry />
      <TresMeshStandardMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

::prose-warning
If you are using <span style="background-color:#222;padding:0.25rem;border-radius:4px;"><a href="/api/controls/orbit-controls" style="color:#f7f7f7;text-decoration:none">OrbitControls</a></span> alongside DragControls, they will interfere with each other. Set `make-default` on **OrbitControls** to prevent conflicts while dragging.
::

## Props

| Prop           | Description                                                                                                                                  | Default     |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **objects**    | Array of [Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D) instances to make draggable.                                   | `[]`        |
| **camera**     | The camera used for raycasting. Defaults to the scene's active camera.                                                                       | `undefined` |
| **enabled**    | If `false`, dragging is disabled and the object snaps back to its position on each drag event.                                               | `true`      |
| **lock**       | Locks movement along one axis. Can be `'x'`, `'y'`, `'z'`, or `'none'`.                                                                     | `'none'`    |
| **dragLimits** | Per-axis position limits as `[[xMin, xMax], [yMin, yMax] \| undefined, [zMin, zMax] \| undefined]`. Pass `undefined` for axes with no limit. | `undefined` |
| **domElement** | The DOM element that listens for pointer events.                                                                                             | `undefined` |

## Events

| Event         | Description                                           | Payload             |
| :------------ | :---------------------------------------------------- | :------------------ |
| **dragstart** | Fired when the user starts dragging an object.        | `ThreeDragControls` |
| **drag**      | Fired every frame while an object is being dragged.   | `ThreeDragControls` |
| **dragend**   | Fired when the user releases a dragged object.        | `ThreeDragControls` |
| **hoveron**   | Fired when the pointer moves over a draggable object. | `ThreeDragControls` |
| **hoveroff**  | Fired when the pointer leaves a draggable object.     | `ThreeDragControls` |

## Tip
### Grid snapping

There is no built-in snap prop, but you can implement snapping in the `@drag` event handler by rounding the object's position to the desired interval:

```vue
<script setup>
import { shallowRef } from 'vue'
import { DragControls } from '@tresjs/cientos'

const boxRef = shallowRef()

function onDrag() {
  if (!boxRef.value) { return }
  const snap = 0.5
  boxRef.value.position.x = Math.round(boxRef.value.position.x / snap) * snap
  boxRef.value.position.z = Math.round(boxRef.value.position.z / snap) * snap
}
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 7.5, 7.5]" :look-at="[0, 0, 0]" />
    <DragControls :objects="[boxRef]" lock="y" @drag="onDrag" />
    <TresMesh ref="boxRef">
      <TresBoxGeometry />
      <TresMeshStandardMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```
