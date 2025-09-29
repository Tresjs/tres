# KeyboardControls

<DocsDemo>
  <KeyboardControlsDemo />
</DocsDemo>

`<KeyboardControls />` is a simple keyboard controller for the camera. The camera's movements are bound to:

* WASD on QWERTY keyboards or equivalent keys on non-QWERTY keyboards
* Arrow keys

::: info
`<KeyboardControls />` uses `<PointerLockControls />` under the hood. You can use [`<PointerLockControls />` props and events](pointer-lock-controls#props).
:::

## Usage

```vue{3,10}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { KeyboardControls, Box } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <Box :position-y="0.5" />
    <KeyboardControls />
    <TresGridHelper />
  </TresCanvas>
</template>
```

::: warning
You must add a `<TresPerspectiveCamera />` to your scene before adding `<KeyboardControls />`.
:::

## Props

| Prop            | Description                          | Default |
| :-------------- | :----------------------------------- | ------- |
| **moveSpeed**   | Speed movement.                      | 0.2     |
| **makeDefault** | If `true`, the controls will be set as the default controls for the scene.          | `true`     |
| **camera**      | The camera to control.                                                              | `undefined` |
| **domElement**  | The DOM element to listen to.                                                       | `undefined` |
| **selector**    | Accept an id element as string. If set, the new element will be used as the trigger | `undefined` |

## Events

```vue
<KeyboardControls @change="onChange" @is-lock="(state) => isActive(state)" />
```

| Event      | Description                                                      |
| :--------- | :--------------------------------------------------------------- |
| **isLock** | Return `true` if "lock", `false` if "unlock" events are triggered. |
| **change** | Dispatched when the control changes.                             |
