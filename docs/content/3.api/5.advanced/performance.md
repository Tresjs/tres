---
title: Scaling Performance 🚀
description: Quick guide with tips to improve the performance of your TresJS application.
---

Running WebGL in the browser can be resource-intensive depending on the user's device capabilities. To make 3D accessible to everyone, it's important to optimize your applications for performance, especially on low-end devices. This guide shares practical tips to help you get the best performance from your TresJS projects.

## Rendering Modes

::examples-on-demand
::

By default, TresJS renders your scene on every frame. While this works for most cases, if you're building a game or a complex app, you may want to control when rendering happens.

Otherwise it might drain your device battery 🔋 and make your computer sound like an airplane 🛫.

To optimize performance, **scene rendering should be triggered only when necessary events** occur—like user input, camera transformations, or object animations.

You can achieve this by setting the `renderMode` prop to `on-demand` or `manual`:

### Mode `on-demand`

```vue [on-demand.vue]
<script setup lang="ts">
import { ref } from 'vue'

// Reactive position for the mesh
const positionX = ref(0)

// Simulate a change after 1 second
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

#### Automatic Invalidation

When using `render-mode="on-demand"`, TresJS will automatically invalidate the current frame by observing component props and lifecycle hooks like `onMounted` and `onUnmounted`. It will also invalidate the frame when resizing the window or changing any prop from the `<TresCanvas>` component like `clearColor` or `antialias`.

### Mode `manual`

If you want to have full control of when the scene is rendered, you can set the `render-mode` prop to `manual`:

```vue [manual-mode.vue]
<template>
  <TresCanvas render-mode="manual">
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

In this mode, Tres will not render the scene automatically. You will need to call the `advance()` method from the useTres composable to render the scene:

```vue [manual-invalidate.vue]
<script setup lang="ts">
import { useTres } from '@tresjs/core'

const { advance } = useTres()

// Call advance() whenever you want to render a frame
advance()
</script>
```

#### Manual Invalidation

It’s often not possible to observe every change in your application. In such cases, you can manually invalidate the frame using the `invalidate()` method from the useTres composable.:

```vue [manual-invalidate.vue]
<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { shallowRef, watch } from 'vue'

const boxRef = shallowRef(null)
const { invalidate } = useTres()

watch(boxRef, () => {
  if (boxRef.value?.position) {
    boxRef.value.position.x = 1
  }
  // Invalidate the frame to trigger a render
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

### Mode `always`

In this rendering mode, Tres will continuously render the scene on every frame. This is the default mode and the easiest to use, but it's also the most resource expensive one.

```vue [always-mode.vue]
<template>
  <TresCanvas render-mode="always">
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

::note
**Tip:** Use `on-demand` or `manual` rendering modes for static or mostly-static scenes to save resources and improve battery life.
::

## Reactivity and Performance

Vue's reactivity system is powerful, but when working with Three.js objects in a real-time 3D scene, it can introduce unnecessary overhead. Since TresJS scenes often update at high frame rates (e.g., 60 FPS), making Three.js objects deeply reactive can significantly hurt performance.

::warning
Avoid making Three.js objects or their properties deeply reactive. Vue will try to track every change, which is inefficient for objects updated every frame.
::

Instead, use `shallowRef` for Three.js objects. This keeps the reference reactive, but does not make the internal properties reactive, which is much more efficient.

### ❌ Incorrect: Deep Reactivity

```vue [incorrect-reactivity.vue]
<script setup lang="ts">
import { reactive } from 'vue'

// This will make all properties reactive (not recommended for Three.js objects)
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

### ✅ Correct: Use shallowRef and Direct Assignment

```vue [correct-reactivity.vue]
<script setup lang="ts">
import { shallowRef } from 'vue'

const position = { x: 0, y: 0, z: 0 }
const boxRef = shallowRef(null)

onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3
  }
})
</script>

<template>
  <TresMesh ref="boxRef" :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

::note
**Tip:** Only the `.value` of a `shallowRef` is reactive. The internal properties are not, which is ideal for Three.js objects that are updated frequently.
::

## Dispose Resources with `dispose()`

When a resource is no longer needed—such as a texture, geometry, or material—be sure to dispose of it to free up memory. This is especially important if your app frequently creates and destroys resources, like in games or interactive experiences.

TresJS will automatically dispose of resources recursively when the component is unmounted, but you can also perform this manually by calling the `dispose()` directly from the package:

::warning
To avoid errors and unwanted side effects, resources created programmatically with the use of `primitives` need to be manually disposed.
::

```vue [manual-dispose.vue]
<script setup lang="ts">
import { dispose } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { onUnmounted } from 'vue'

const { nodes } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', {
  draco: true,
})
const model = nodes.Cube

onUnmounted(() => {
  // Dispose of the model when the component is destroyed
  dispose(model)
})
</script>

<template>
  <primitive :object="model" />
</template>
```

::note
**Best Practice:** Always clean up resources when they are no longer needed to prevent memory leaks and keep your application performant.
::
