# Renderer

The `Renderer` component is the main component of Tres. It's the one that creates the ThreeJS `WebGLRenderer` and define your Tres Scene.

```vue{2,7}
<template>
  <TresCanvas shadows :output-encoding="sRGBEncoding">
    <TresPerspectiveCamera />
    <TresScene>
      <!-- Your scene goes here -->
    </TresScene>
  </TresCanvas>
</template>
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

## Defaults

Tres tries to be as less opinionated as possible. That's why it doesn't set almost any default value for the `Renderer` component. You need to set the props you want to use. The only exception is the `antialias` prop. It's set to `true` by default.
