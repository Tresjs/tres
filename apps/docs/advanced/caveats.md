# Caveats 😱

Our aim is to provide a simple way of using ThreeJS in VueJS with the best developer experience possible. However, there are some caveats that you should be aware of.

## ~~HMR and ThreeJS~~

:::info

This has been fixed in **TresJS** v1.7.0 🎉. You can now use HMR without reloading the page 🥹.

:::

Hot module replacement (HMR) is a feature that allows you to update your code without reloading the page. This is a great feature that makes development much faster. **TresJS** uses [Vite](https://vitejs.dev/). However, is really tricky to make it work correctly with ThreeJS.

Why? Because Tres builds the scene in a declarative way. This means that it creates the instance and add it to the scene when the component is mounted. The complexity comes to know when to remove the instance from the scene and when to add it again.

Although a minimal disposal workflow is implemented, it is not perfect. This means that sometimes you will have to reload the page to see the changes correctly, especially when you are referencing an instances using [Template Refs](https://v3.vuejs.org/guide/component-template-refs.html)

```vue
<script setup lang="ts">
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)

onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
</script>

<template>
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

If you change the `color` attribute of the `TresMeshStandardMaterial` component, you will see that the change is applied but the rotation is not working anymore. This is because the instance is disposed and created again.

:::tip
So as **rule of thumb** you should reload the page whenever you don't see your changes reflected.
:::

That being said we are working on a better solution for this 😁. If you have any idea on how to solve this, please let us know.

You can follow the discussion in [HMR Disposal Discussion](https://github.com/Tresjs/tres/issues/23)

## Reactivity

We all love reactivity 💚. It is one of the most powerful features of VueJS. However, we need to be mindful of it when using ThreeJS.

Vue reactivity is based on [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). This allows Vue 3 to automatically track changes to data objects and update the corresponding DOM elements whenever the data changes.

Since we are rendering a scene and updating it in every frame, for example with a rate of 60FPS this means that we are updating the scene 60 times per second. If the object to be updated is reactive, Vue will try to update set object 60 times. This is not a good idea 😅 and will be detrimental for performance.

Here is a benchmark of the difference between using a Proxy object and a plain object.

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - Executions per second Plan Object vs Proxy. </figcaption>
</figure>

Source: [Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

If you are forced to use reactivity, use [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

Unlike `ref()`, the inner value of a shallow ref is stored and exposed as-is, and will not be made deeply reactive. Only the .value access is reactive. Source [VueJS Docs](https://vuejs.org/api/reactivity-advanced.html#shallowref)

### Example

❌ Incorrect

```vue
<script setup lang="ts">
const position = reactive({ x: 0, y: 0, z: 0 })

onLoop(({ _delta, elapsed }) => {
  position.x = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

✅ Correct

```vue
<script setup lang="ts">
const position = { x: 0, y: 0, z: 0 }
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)

onLoop(({ _delta, elapsed }) => {
  boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh ref="boxRef" :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```
