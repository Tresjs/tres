# Scaling performance 🚀

> Quick guide with tips to improve performance of your Tres.js application.

We are running WebGL on the browser, which can be quite expensive and it will depend on how powerful the user's device is. To make 3D accessible to everyone, we need to make sure our applications are optimized to run also on low-end devices. This guide will provide some tips to improve the performance of your Tres.js application.

## On-demand rendering <Badge type="tip" text="^4.0.0" />

By default, Tres.js will render your scene on every frame. This is great for most applications, but if you are building a game or a complex application, you might want to control when the scene is rendered. 

Otherwise it might drain your device battery 🔋 🔜 🪫 and make your computer sound like an airplane 🛫.

Ideally, you only want to **render the scene when necessary**, for example when the user interacts with the scene and the camera moves, or when objects in the scene are animated.

You can do that by setting the `renderMode` prop to `on-demand` or `manual`:


### Mode `on-demand`

<ClientOnly>
  <div style="position: relative; aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
    <onDemandRendering />
  </div>
</ClientOnly>


```vue
<TresCanvas render-mode="on-demand">
  <!-- Your scene goes here -->
</TresCanvas>
```

#### Automatic Invalidation

When using `render-mode="on-demand"`, Tres.js will automatically invalidate the current frame by observing component props and lyfecycle hooks like `onMounted` and `onUnmounted`. It will also invalidate the frame when resizing the window or change any prop from the `<TresCanvas>` component like `clearColor` or `antialias`.

This will trigger a new render: 

```vue
<script setup>
import { ref } from 'vue'

const positionX = ref(0)

setTimeout(() => {
  positionX.value = 1
}, 1000)
</script>

<template>
  <TresCanvas render-mode="on-demand">
    <TresMesh :position-x="positionX">
      <TresBoxGeometry />
      <TresMeshBasicMaterial color="teal" />
    </TresMesh>
  </TresCanvas>
</template>
```

#### Manual Invalidation

Since is not really possible to observe all the possible changes in your application, you can also manually invalidate the frame by calling the `invalidate()` method from the [`useTresContext` composable](../api/composables.md#usetrescontext):


::: code-group

```vue [App.vue]
<script setup>
import { TresCanvas } from '@tresjs/core'
import Scene from './Scene.vue'
</script>

<template>
  <TresCanvas
    render-mode="manual"
  >
    <Scene />
  </TresCanvas>
</template>
```

```vue [Scene.vue]
<script setup>
import { useTres } from '@tresjs/core'

const boxRef = ref()
const { invalidate } = useTres()

watch(boxRef.value, () => {
  boxRef.value.position.x = 1
  invalidate()
})
</script>

<template>
  <TresMesh ref="boxRef">
    <TresBoxGeometry />
    <TresMeshBasicMaterial color="teal" />
  </TresMesh>
</template>
```

:::

### Mode `always` 

In this rendering mode, Tres will continously render the scene on every frame. This is the default mode and the easiest to use, but it's also the most resource expensive one.


### Mode `manual`

If you want to have full control of when the scene is rendered, you can set the `render-mode` prop to `manual`:

```vue
<TresCanvas render-mode="manual">
  <!-- Your scene goes here -->
</TresCanvas>
```

In this mode, Tres will not render the scene automatically. You will need to call the `advance()` method from the [`useTresContext` composable](../api/composables.md#usetrescontext) to render the scene:

```vue
<script setup>
import { useTres } from '@tresjs/core'

const { advance } = useTres()

advance()
</script>
```

