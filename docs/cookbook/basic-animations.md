---
title: Basic Animations
description: How to use a the useRenderLoop composable to animate your objects.
author: alvarosabu
thumbnail: /recipes/animations.png
difficulty: 0
---

# Basic Animations

This guide will help you get started with basic animations in TresJS.

We will build a simple scene with a cube. We will then animate the cube to rotate around the Y and Z axis.

<!--TODO: Update sandbox when v4 is out with useLoop -->

<!-- <SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />
 -->

## useLoop

The `useLoop` composable is the core of TresJS updates, which includes: **animations**. It allows you to register a callback that will be called every time the renderer updates the scene with the browser's refresh rate.

To see a detailed explanation of how it works, please refer to the [useRenderLoop](/api/composables#useloop) documentation.

```ts
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
})
```

## Getting the reference to the cube

To animate the cube, we need to get a reference to it. We can do it by passing a [Template Ref](https://vuejs.org/guide/essentials/template-refs.html) using `ref` prop to the `TresMesh` component. This will return the plain `THREE instance`.

::: code-group

```vue [Scene.vue]
<script setup>
import { shallowRef } from 'vue'

const boxRef = shallowRef()
</script>

<template>
  <TresMesh ref="boxRef">
    <TresBoxGeometry />
    <TresMeshBasicMaterial color="teal" />
  </TresMesh>
</template>
```

```vue [App.vue]
<script setup>
import { TresCanvas } from '@tresjs/core'
import Scene from './Scene.vue'
</script>

<template>
  <TresCanvas>
    <Scene />
  </TresCanvas>
</template>
```
:::

## Animating the cube

Now that we have a reference to the cube, we can animate it. We will use the `onBeforeRender` method to update the cube's rotation.

```ts
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

You can also use the `delta` from the internal [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) or the `elapsed` to animate the cube.

## But why not using reactivity?

You might be wondering why we are not using reactivity to animate the cube. The answer is simple, performance.

```ts
// This is a bad idea ❌
const boxRotation = ref([0, 0, 0])

onBeforeRender(({ delta, elapsed }) => {
  boxRotation.value[1] += delta
  boxRotation.value[2] = elapsed * 0.2
})
```

We can be tempted to use reactivity to animate the cube. But it would be a bad idea.
The reason is that [Vue's reactivity is based on Proxies](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue) and it's not designed to be used in a render loop that updates 60 or more times per second.

The embedded page below shows the [benchmark of a proxy vs a regular object](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). As you can see, the proxy is 5 times slower than the regular object.

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

You can read more about this in the [Caveats](../advanced/caveats.md#reactivity) section.
