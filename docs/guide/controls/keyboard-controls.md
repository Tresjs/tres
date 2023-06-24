# KeyboardControls

KeyboardControls is a special type of controller that allows you to move using your keyboard.

## In combination with PointerLockControls.

Here you need to use the PointerLockControls with make-default props, KeyboardControls will automatically adapt to it, creating a really good effect first player experiences.

```vue{3}
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <PointerLockControls make-default  />
    <KeyboardControls />
    <TresGridHelper :args="[10, 10]" />

  </TresCanvas>
</template>
```

Just by doing this, works great but in addition the TresJs team give some special props (only available with this mode) to create more realistic sensation

- headBobbing: To simulate the walk balance of the head
- Jump: to jump
- gravity: to control the gravity related to the jump

## In combination with slots.

Here you can move meshes by using your keyboard, by default you move through the X and Z axis, but you can change it with the is2D prop, to move your meshes on the X and Y axis

```vue{3}
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <KeyboardControls >
      <Sphere>
        <TresMeshNormalMaterial />
      </Sphere>
    </KeyboardControls>

  </TresCanvas>
</template>
```

::: warning
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
:::

## Props

| Prop            | Description                                                                                   | Default    |
| :-------------- | :-------------------------------------------------------------------------------------------- | ---------- |
| **forward**     | Keys to go forward.                                                                           | ['w', 'W'] |
| **back**        | Keys to go back.                                                                              | ['s', 'S'] |
| **left**        | Keys to go left.                                                                              | ['a', 'A'] |
| **right**       | Keys to go right.                                                                             | ['d', 'D'] |
| **headBobbing** | Indicates if the forward movement is in the Z axis or Y axis. (only with PointerLockControls) | false      |
| **jump**        | Key to jump (only with PointerLockControls).                                                  | [' ']      |
| **gravity**     | Default gravity number for jump.                                                              | 9.8        |
| **moveSpeed**   | Speed movement                                                                                | 0.1        |
| **is2D**        | Indicates if the forward movement is in the Z axis or Y axis. (only for meshes)               | false      |
