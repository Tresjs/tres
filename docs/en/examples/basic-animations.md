# Basic Animations

This guide will help you get started with basic animations in TresJS.

We will build a simple scene with a cube. We will then animate the cube to rotate around the Y and Z axis.

<StackBlitzEmbed projectId="tresjs-basic-animations" />

## useRenderLoop

The `useRenderLoop` composable is the core of TresJS animations. It allows you to register a callback that will be called every time the renderer updates the scene with the browser's refresh rate.

To see a detailed explanation of how it works, please refer to the [useRenderLoop](/api/composables#userenderloop) documentation.

```ts
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
})
```

## Getting the reference to the cube

To animate the cube, we need to get a reference to it. We can do it by passing a [Template Ref](https://vuejs.org/guide/essentials/template-refs.html) using `ref` prop to the `TresMesh` component. This will return the THREE instance.

To improve the performance, we will use a [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) to store the reference instead of a regular Ref. See why [here](../advanced/caveats.md#reactivity)

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)
</script>

<template>
  <TresCanvas>
    <TresMesh ref="boxRef" :scale="1">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## Animating the cube

Now that we have a reference to the cube, we can animate it. We will use the `onLoop` callback to update the cube's rotation.

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

You can also use the `delta` from the internal [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) or the `elapsed` to animate the cube.

## But why not using reactivity?

You might be wondering why we are not using reactivity to animate the cube. The answer is simple, performance.

```vue
// This is a bad idea ❌
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRotation = reactive([0, 0, 0])

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta
  boxRotation[2] = elapsed * 0.2
})
</script>
```

We can be tempted to use reactivity to animate the cube. But it would be a bad idea.
The reason is that [Vue's reactivity is based on Proxies](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue) and it's not designed to be used in a render loop that updates 60 or more times per second.

The embedded page below shows the [benchmark of a proxy vs a regular object](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). As you can see, the proxy is 5 times slower than the regular object.

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

You can read more about this in the [Caveats](../advanced/caveats.md#reactivity) section.
