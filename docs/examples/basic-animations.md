# Basic Animations

This guide will help you get started with basic animations in TresJS.

We will build a simple scene with a cube. We will then animate the cube to rotate around the Y and Z axis.

<StackBlitzEmbed projectId="tresjs-basic-animations" />

## useRenderLoop

The `useRenderLoop` composable is the core of TresJS animations. It allows you to register a callback that will be called every time the renderer updates the scene with the browser's refresh rate.

To see a detailed explanation of how it works, please refer to the **useRenderLoop** documentation.

```ts
const { onLoop, resume } = useRenderLoop()

resume()
onLoop(({ _delta, elapsed }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
})
```

## Getting the reference to the cube

To animate the cube, we need to get a reference to it. We can do it by passing a [Template Ref](https://vuejs.org/guide/essentials/template-refs.html) using `ref` prop to the `TresMesh` component. This will return the THREE instance.

To improve the performance, we will use a [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) to store the reference instead of a regular Ref. See why [here](../advanced/caveats.md#reactivity)

```vue
<script setup lang="ts">
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)
</script>

<template>
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial v-bind="pbrTexture" />
  </TresMesh>
</template>
```

## Animating the cube

Now that we have a reference to the cube, we can animate it. We will use the `onLoop` callback to update the cube's rotation.

```ts
onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

You can also use the `delta` from the internal [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) or the `elapsed` to animate the cube.
