# KeyboardControls

KeyboardControls is a special type of controller that allows you to move through the scene using your keyboard, is based on the Unreal Engine Controls.

<DocsDemo>
  <KeyboardControlsDemo />
</DocsDemo>

::: info
:memo: KeyboardControls uses `PointerLockControls` under the hood, meaning you can use [all the props from `<PointerLockControls />`](pointer-lock-controls#props) as well as it events.
:::

## Usage

You can use the ASDW or the arrows keys to move and your mouse to explore your scene.

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
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
:::

## Props

| Prop                    | Description                          | Default |
| :---------------------- | :----------------------------------- | ------- |
| **moveSpeed**           | Speed movement.                      | 0.2     |
| **makeDefault** | If `true`, the controls will be set as the default controls for the scene.                | `true`     |
| **camera**      | The camera to control.                                                                    | `undefined` |
| **domElement**  | The dom element to listen to.                                                             | `undefined` |
| **selector**    | Accept an id element as string, if it is set, the new element will be used as the trigger | `undefined` |

## Events

```vue
<KeyboardControls @change="onChange" @is-lock="(state) => isActive(state)" />
```

| Event      | Description                                                      |
| :--------- | :--------------------------------------------------------------- |
| **isLock** | Return `true` if "lock", `false` if "unlock" events are trigger. |
| **change** | Dispatched when the control changes.                             |
