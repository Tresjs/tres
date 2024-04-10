# Migration Guide

This guide is intended to help you migrate from v1 to the newest versions of TresJS 🤩✨.

::: code-group

```bash [pnpm]
pnpm update @tresjs/core
```

```bash [npm]
npm update @tresjs/core
```

```bash [yarn]
yarn upgrade @tresjs/core
```

:::

## What's new?

### Vue Custom Renderer

**TresJS** is now a [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) 🎉 that lives inside of a wrapper component called `TresCanvas` that is responsible for creating the `WebGLRenderer` and the `Scene` for you and creating a **new Vue App instance** to render the scene.

### Typescript support and Intellisense 🦾

![TresJS Intellisense](/v2-intellisense.gif)

This was probably the most **requested feature for TresJS**. Now Tres components work with Volar and provide type intellisense.

**TresJS** now generates type declaration on build time for all the components based of the catalog from ThreeJS. This means that you can use all the components from ThreeJS and get type intellisense for them.

### Tres Plugin is optional 👍

The `TresPlugin` is now optional. You can use TresJS without it by importing the components directly from `tresjs/core`:

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

::: info
This is recommended for performance and bundle size reasons, tree-shaking will work better and you will only import the components that you use.
:::

### TresScene no longer needed

The `<TresScene />` component is now deprecated since the scene is now created by the `<TresCanvas />`.

In the beginning, I thought that it would be a good idea to have a separate component for the scene in terms of verbosity and keep it as similar to plain ThreeJS, but it turned out that it was not really useful.

You can now create a scene like this:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

To migrate your code, you can just remove the `<TresScene />` component and move the children to the `<TresCanvas />` component.

### `useCatalog` is now deprecated

The `useCatalog` function is now deprecated. You can now import the catalog directly from `@tresjs/core`

You can read more about it here: [Extending](/advanced/extending.md)

Change this:

```ts {2,5,7}
// Wrong ❌
import { useCatalog } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

const { extend } = useCatalog()

extend({ TextGeometry })
```

To this:

```ts {2,6}
// Correct ✅
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Add the element to the catalogue
extend({ TextGeometry })
```

### Model's ref value `getModel` is now deprecated

The `getModel` function is now deprecated. You can now use the `model` property directly.

Change this:

```vue {7,9-12}
// Wrong ❌
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, ({ getModel }) => {
  const model = getModel()
  model.position.set(0, 0, 0)
})
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

To this:

```vue {7,9-12}
// Correct ✅
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, (model) => {
  // Do something with the model
  model.position.set(0, 0, 0)
})
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

### Cameras need to be before any control 🎥

The `TresOrbitControls` component needs to be after the camera in the tree. This is because the controls need to know the camera to work.

Change this:

```vue {3,5}
// Wrong ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

To this:

```vue {3,5}
// Correct ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```

## UseTres is now useTresContext <Badge type="warning" text="^3.0.0" />

For v3 we reworked the whole state logic to make it more flexible and easier to use for plugin authors and ecosystem packages. Instead of using a store like in v2, we now use a context provider based on `provide/inject`.

The `useTres` function is now an alias of the `useTresContext` function to avoid breaking demos and experiments out there, but consider using `useTresContext` from now on.

Instead of a big reactive object, you will now get the `scene` and `renderer` refs, between other properties, directly.

Change this:

```ts {2}
// Wrong ❌
import { useTres } from '@tresjs/core'

const { state, setState } = useTres()

console.log(state.scene)
```

To this:

```ts {2}
// Correct ✅
import { useTresContext } from '@tresjs/core'

const { scene, renderer } = useTresContext()

console.log(scene.value)
```

For more detailed information about the new context provider system, you can read the [API DOCS](/api/composables.md) section.
