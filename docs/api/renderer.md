# Renderer

The `Renderer` component is the main component of Tres. It's the one that creates the ThreeJS `WebGLRenderer` and define your Tres Scene.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="sRGBEncoding">
    <TresPerspectiveCamera />
      <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

## Canvas size

The `Renderer` component will use the parent element size as the canvas size. If you want to use the window size as the canvas size, you can set the `window-size` prop to `true`.

```vue
<template>
  <TresCanvas window-size>
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

Or you can use CSS to set your app size.

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

## Presets

Tres comes with a few presets for the `Renderer` component. You can use them by setting the `preset` prop.

### Realistic

The `realistic` preset makes easy to setup the renderer for more realistic 3D scenes.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

It's equivalent to:

```ts
renderer.shadows: true,
renderer.physicallyCorrectLights: true,
renderer.outputEncoding: sRGBEncoding,
renderer.toneMapping: ACESFilmicToneMapping,
renderer.toneMappingExposure: 3,
renderer.shadowMap.enabled: true,
renderer.shadowMap.type: PCFSoftShadowMap
```

## Props

| Prop                        | Description                                                                                                                                                     | Default            |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **shadows**                 | Enable shadows in the Renderer                                                                                                                                  | `false`            |
| **shadowMapType**           | Set the shadow map type                                                                                                                                         | `PCFSoftShadowMap` |
| **physicallyCorrectLights** | Whether to use physically correct lighting mode. See the [lights / physical example](https://threejs.org/examples/#webgl_lights_physical).                      | `false`            |
| **outputEncoding**          | Defines the output encoding                                                                                                                                     | `LinearEncoding`   |
| **toneMapping**             | Defines the tone mapping exposure used by the renderer.                                                                                                         | `NoToneMapping`    |
| **context**                 | This can be used to attach the renderer to an existing [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)               |                    |
| **powerPreference**         | Provides a hint to the user agent indicating what configuration of GPU is suitable for this WebGL context. Can be "high-performance", "low-power" or "default". | `default`          |
| **preserveDrawingBuffer**   | Whether to preserve the buffers until manually cleared or overwritten..                                                                                         | `false`            |
| **clearColor**              | The color the renderer will use to clear the canvas.                                                                                                            | `#000000`          |
| **windowSize**              | Whether to use the window size as the canvas size or the parent element.                                                                                        | `false`            |
| **disableRender**           | Disable render on requestAnimationFrame, usefull for PostProcessing                                                                                             | `false`            |
| **camera**                  | A manual camera to be used by the renderer.                                                                                                                     |                    |

## Defaults

Tres tries to be as less opinionated as possible. That's why it doesn't set almost any default value for the `Renderer` component. You need to set the props you want to use. The only exception is the `antialias` prop. It's set to `true` by default.
