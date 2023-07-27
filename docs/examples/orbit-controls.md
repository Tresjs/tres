# OrbitControls

<StackBlitzEmbed projectId="tresjs-orbit-controls" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) is a camera controller that allows you to orbit around a target. It's a great way to explore your scene.

However, it is not part of the core of ThreeJS. So to use it you would need to import it from the `three/addons/controls/OrbitControls` module.

This creates a problem because **TresJS** automatically creates a catalog of the core of Three so you can use them as components.

Fortunately, **TresJS** provides a way to extend the catalog of components. You can do it by using the `extend` method from the core library.

For more information about extending your TresJS catalog, refer to the [extending](/advanced/extending.md) section.

## Using OrbitControls

To use `OrbitControls` you need to import it from the `three/addons/controls/OrbitControls` module.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

Then you need to extend the catalogue of components using the `extend` method.

```js
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })
```

Now you can use the `TresOrbitControls` component in your scene.

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
  </TresCanvas>
</template>
```

Since [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) needs a reference to the camera and the renderer, you need to pass them as arguments.

You can use the [useTres](/api/composables#usetres) composable to get the camera and the renderer.

```ts
import { useTres } from '@tresjs/core'

const { state } = useTres()
```

So the final code would be something like this:

```vue
<script setup lang="ts">
import { extend, useTres } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })

const { state } = useTres()
</script>
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45," 1, 0.1, 1000] />
    <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
  </TresCanvas>
</template>
```

## OrbitControls from `cientos`

Here is where the fancy part begins. ✨  
The `cientos` package provides a component called `<OrbitControls />` that is a wrapper of the `OrbitControls` from the [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

The nicest part? You don't need to extend the catalog or pass any arguments.  
It just works. 💯

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45," 1, 0.1, 1000] />
    <OrbitControls />
  </TresCanvas>
</template>
```
