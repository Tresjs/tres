# Migration Guide

This guide is intended to help you migrate from v1 to brand new shiny v2 🤩✨ of TresJS.

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

**TresJS** is now a [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) 🎉 that lives inside of a wrapper component `TresCanvas` that is responsible for creating the `WebGLRenderer` and the `Scene` for you and creating a **new Vue App instance** to render the scene.

### Typescript support and Intellisense 🦾

![TresJS v2 Intellisense](/v2-intellisense.gif)

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
This is recommended for performance and bundle size reasons, Three-shaking will work better and you will only import the components that you use.
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
