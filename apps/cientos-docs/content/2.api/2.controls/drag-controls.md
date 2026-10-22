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
If you are using [OrbitControls](/api/controls/orbit-controls) alongside DragControls, they will interfere with each other. Set `make-default` on **OrbitControls** so DragControls can pause them while dragging.
::

::prose-note
On touch devices, the underlying three-stdlib controls call `preventDefault()` on every `touchstart`, `touchmove` and `touchend` on the DOM element, even when no object is hit. Touches that start on the canvas will not scroll or zoom the page. Set `enabled` to `false` when dragging is not needed, or pass a smaller `domElement`.
::

## Props

| Prop               | Description                                                                                                                                                       | Default                 |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **objects**        | Array of [Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D) instances to make draggable.                                                        | Required                |
| **camera**         | The camera used for raycasting.                                                                                                                                   | The active camera       |
| **enabled**        | If `false`, objects cannot be dragged.                                                                                                                            | `true`                  |
| **transformGroup** | If `true`, a hit on any descendant drags the first entry of `objects` as a whole, instead of the hit mesh. Use it with a single `Group` or a loaded model.         | `false`                 |
| **lock**           | Locks movement along one axis. Can be `'x'`, `'y'`, `'z'`, or `'none'`.                                                                                           | `'none'`                |
| **dragLimits**     | Per-axis limits on the local position, as `[[xMin, xMax] \| undefined, [yMin, yMax] \| undefined, [zMin, zMax] \| undefined]`. Pass `undefined` for an axis with no limit. | `undefined`             |
| **domElement**     | The DOM element that listens for pointer events.                                                                                                                  | The renderer's canvas   |

## Events

Each event sends the three-stdlib `DragControls` instance. Import the `DragControlsInstance` and `DragControlsEmits` types from `@tresjs/cientos` to type your handlers.

| Event         | Description                                                | Payload                |
| :------------ | :--------------------------------------------------------- | :--------------------- |
| **dragstart** | Fired when the user starts dragging an object.             | `DragControlsInstance` |
| **drag**      | Fired on each pointer move while an object is dragged.     | `DragControlsInstance` |
| **dragend**   | Fired when the user releases a dragged object.             | `DragControlsInstance` |
| **hoveron**   | Fired when the pointer moves over a draggable object.      | `DragControlsInstance` |
| **hoveroff**  | Fired when the pointer leaves a draggable object.          | `DragControlsInstance` |

## Dragging a group or model

The controls raycast into every descendant of `objects` and move the mesh that was hit. A loaded model is made of many meshes, so without `transform-group` you would pull one mesh off the model. Pass the model's root and set `transform-group` to move the whole model:

```vue
<script setup>
import { DragControls, useGLTF } from '@tresjs/cientos'

const { state } = useGLTF('/models/AkuAku.gltf', { draco: true })
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 7.5, 7.5]" :look-at="[0, 0, 0]" />
    <primitive v-if="state" :object="state.scene" />
    <DragControls v-if="state" :objects="[state.scene]" transform-group />
  </TresCanvas>
</template>
```

`lock` and `drag-limits` then apply to the model's root.

## Grid snapping

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
