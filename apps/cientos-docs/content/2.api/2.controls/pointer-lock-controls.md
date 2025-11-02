---
title: PointerLock Controls
description: PointerLock Controls docs
---

# PointerLockControls

::SceneWrapper
  ::ControlsPointerLockControls
  ::
::

[PointerLockControls](https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls) is a camera controller that allows you to capture the mouse movement and simulate a first person camera. It is a perfect choice for first person 3D games.

::UAlert{icon="i-lucide-message-square-warning" title="Warning"}
#description
This control uses the <span style="background-color:#222;padding:0.25rem;border-radius:4px;"><a href="/guide/controls/orbit-controls" style="color:#f7f7f7;text-decoration:none">[`Pointer Lock API`](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)</a></span>, the same rules are applied, for example, you need to interact with the browser to "lock" or start the event.
In addition, you need to wait 1 second between canceling and re-starting the event
::

## Usage

```vue{3,10}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PointerLockControls, Box } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <Box :position-y="0.5" />
    <PointerLockControls />
    <TresGridHelper />
  </TresCanvas>
</template>
```

::UAlert{icon="i-lucide-message-square-warning" title="Warning" description="Is really important that the Perspective camera is set first in the canvas. Otherwise might break."}
::

## Props

| Prop            | Description                                                                               | Default     |
| :-------------- | :---------------------------------------------------------------------------------------- | ----------- |
| **makeDefault** | If `true`, the controls will be set as the default controls for the scene.                | `false`     |
| **camera**      | The camera to control.                                                                    | `undefined` |
| **domElement**  | The dom element to listen to.                                                             | `undefined` |
| **selector**    | Accept an id element as string, if it is set, the new element will be used as the trigger | `undefined` |

## Events

```vue
<PointerLockControls @change="onChange" @is-lock="(state) => isActive(state)" />
```

| Event      | Description                                                      |
| :--------- | :--------------------------------------------------------------- |
| **isLock** | Return `true` if "lock", `false` if "unlock" events are trigger. |
| **change** | Dispatched when the control changes.                             |
