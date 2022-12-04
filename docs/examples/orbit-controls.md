# OrbitControls

<**StackBlitzEmbed** projectId="tresjs-basic" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) is a camera controller that allows you to orbit around a target. It's a great way to explore your scene.

However is not part of the core of ThreeJS. So to use it you would need to import it from the `three/examples/jsm/controls/OrbitControls` module.

So this creates a problem because **TresJS** automatically creates a catalogue of the core of three so you can use them as components.

Afortunatelly, **TresJS** provides a way to extend the catalogue of components. You can do it by using the `extend` method the [useCatalogue](/composables/use-catalog) composable.

For more information about extending you TresJS catalog, refer to [extending](/advanced/extending.md) section.

## Using OrbitControls

To use OrbitControls you need to import it from the `three/examples/jsm/controls/OrbitControls` module.

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
```

Then you need to extend the catalogue of components using the `extend` method of the [useCatalogue](/composables/use-catalog) composable.

```js
import { useCatalogue } from '@tresjs/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const { extend } = useCatalogue()

extend({ OrbitControls })
```

Now you can use the `OrbitControls` component in your scene.

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
      ...
    </TresScene>
  </TresCanvas>
</template>
```

Since [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) needs a reference to the camera and the renderer, you need to pass them as arguments.

You can use the [useThree](/composables/use-three) composable to get the camera and the renderer.

```ts
import { useThree } from '@tresjs/core'

const { state } = useTres()
```

So the final code would be something like this:

```vue
<script setup lang="ts">
import { useCatalogue } from '@tresjs/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const { extend } = useCatalogue()
extend({ OrbitControls })

const { state } = useThree()
</script>
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
      ...
    </TresScene>
  </TresCanvas>
</template>
```
