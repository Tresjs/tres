# The hilarious guide of common issues and how to solve them

![Troubleshooting](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

Welcome to **TresJS v2 troubleshooting guide**. Where 3D stands for _"Dazzlingly Delightful Difficulties"_! We know 3D can be as complex as a tangled ball of yarn 🧶 or as unpredictable as a cat on a keyboard 🐈 ⌨️ , but fear not!

This guide is intended to help you solve the most common issues that you might encounter when using TresJS v2.

## I can't see my 3D scene 😭!

You followed the [Getting started guide](/guide/getting-started.md) but you still can't see your scene rendered.

These are the most common reasons why you might not be able to see your scene:

### Check the height of your canvas 📏

Another common issue is that the `TresCanvas` component is creating by default a `canvas` element that takes the `width` and `height` of the parent element. If the parent element has no height, the canvas will have no height either.

![No height found](/canvas-height.png)

You will also see this error in the console:

![Canvas height warning](/canvas-height-warning.png)

A easy way to fix this is to set the height of the parent element to `100%`:

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}
```

Or you can set the `window-size` prop of the `TresCanvas` component:

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Failed resolve component: TresComponent... 🤔

![](/failed-to-resolve-component.png)

Since **TresJS v2** is using a Vue Custom Renderer inside of the main Vue App instance, the core Vue renderer that acts as parent is not going to recognize the components inside of `TresCanvas` component. Even if it doesn't affect the rendering, it will show a warning in the console.

![](/failed-to-resolve-component.png)

At this moment, there is no native Vue support to define the renderer used on the `<template />` but there is a quick workaround to remove the warnings

Got to your `vite.config.ts` and add the following configuration to the `@vitejs/plugin-vue`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
})
```

This will remove the warning from the console.

# Help Us Make TresJS Purr-fect! 😼

We know that even the best cat nappers occasionally make mistakes, and we need you help to make TresJS even better! If you find a bug, please open a ticket at [the
repo](https://github.com/Tresjs/playground) and **please provide a reproduction link**.

::: warning
Tickets without a reproduction link will be closed.
:::

Our team of coding cat lovers
will jump into action to squash those pesky bugs and improve TresJS for everyone. Together, let's make TresJS the cat's
meow of 3D rendering in Vue!
