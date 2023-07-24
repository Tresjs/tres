# PointerLockControls

[PointerLockControls](https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls) is a camera controller that allows you to capture the mouse movement and simulate a first person camera. It is a perfect choice for first person 3D games.

However, as it is not part of the core of ThreeJS, to use it you would need to import it from the `three/examples/jsm/controls/PointerLockControls` module.

Here is where the fancy part begins. ✨
The `cientos` package provides a component called `<PointerLockControls />`, which is a wrapper of the `PointerLockControls` from the [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

The nicest part? You don't need to extend the catalog or pass any arguments.
It just works. 💯

::: warning
This control uses the [Pointer Lock API] (https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API), the same rules are applied, for example, you need to interact with the browser to "lock" or start the event.
In addition, you need to wait 1 second between canceling and re-starting the event
:::

```vue{3}
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <PointerLockControls />
    <TresGridHelper :args="[10, 10]" />

  </TresCanvas>
</template>
```

Or using your own HTML element to trigger the event

```vue{3}
<template>
<button id="lock">Lock</button>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <PointerLockControls selector="lock" />
    <TresGridHelper :args="[10, 10]" />

  </TresCanvas>
</template>
```

::: warning
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
:::

## Detect if is active

Additional we can detect if the controls has been active or not in a reactive way by just provide a v-model into the component

```vue{3}
<script setup lang="ts">
const isActive = (state: boolean) => console.log(state)

</script>
<template>
<button id="lock">Lock</button>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[0, 0, 3]" @is-lock="state => isActive(state)"  />
    <PointerLockControls selector="lock" />
    <TresGridHelper :args="[10, 10]" />

  </TresCanvas>
</template>
```

## Props

| Prop            | Description                                                                               | Default     |
| :-------------- | :---------------------------------------------------------------------------------------- | ----------- |
| **makeDefault** | If `true`, the controls will be set as the default controls for the scene.                | `false`     |
| **camera**      | The camera to control.                                                                    | `undefined` |
| **domElement**  | The dom element to listen to.                                                             | `undefined` |
| **selector**    | Accept an id element as string, if it is set, the new element will be used as the trigger | `undefined` |
