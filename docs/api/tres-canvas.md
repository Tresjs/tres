# TresCanvas

The `TresCanvas` component is the main component of Tres. It's responsible of creating the context for the scene, do the bridge between Vue and ThreeJS and provide the renderer.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

## Canvas size

The `TresCanvas` component will use the parent element size as the canvas size. If you want to use the window size as the canvas size, you can set the `window-size` prop to `true`.

```vue
<template>
  <TresCanvas window-size>
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

Or you can use CSS to set your canvas size.

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#canvas {
  height: 100%;
  width: 100%;
}
```

## Props

### Readonly Renderer Arguments
These props are passed to the WebGLRenderer constructor and cannot be changed after creation.

| Prop | Description | Default |
| ---- | ---- | --- |
| **alpha** | Controls the default clear alpha value. When set to true, the value is 0. Otherwise it's 1. | `false` |
| **antialias** | Whether to perform antialiasing. | `true` |
| **depth** | Whether the drawing buffer has a [depth buffer](https://en.wikipedia.org/wiki/Z-buffering) of at least 16 bits. | `true` |
| **failIfMajorPerformanceCaveat** | Whether the renderer creation will fail upon low performance is detected. See [WebGL spec](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2) for details. | `false` |
| **logarithmicDepthBuffer** | Whether to use a logarithmic depth buffer. It may be necessary to use this if dealing with huge differences in scale in a single scene. Note that this setting uses gl_FragDepth if available which disables the [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) optimization and can cause a decrease in performance. | `false` |
| **powerPreference** | Provides a hint to the user agent indicating what configuration of GPU is suitable for this WebGL context. Can be `high-performance`, `low-power` or `default`. | `default` |
| **precision** | Shader precision. Can be `highp`, `mediump` or `lowp`. | "highp" if supported by the device |
| **premultipliedAlpha** | Whether the renderer will assume that colors have [premultiplied alpha](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha). | `true` |
| **preserveDrawingBuffer** | Whether to preserve the buffers until manually cleared or overwritten. | `false` |
| **stencil** | Whether the drawing buffer has a [stencil buffer](https://en.wikipedia.org/wiki/Stencil_buffer) of at least 8 bits. | `true` |

### Renderer Properties and Setters
These props can be modified after renderer creation using the renderer's setter methods.

| Prop | Description | Default |
| ---- | ---- | --- |
| **clearColor** | The color the renderer will use to clear the canvas. | `#000000` |
| **outputColorSpace** | Defines the output encoding | `LinearEncoding` |
| **shadows** | Enable shadows in the renderer | `false` |
| **shadowMapType** | Set the shadow map type | `PCFSoftShadowMap` |
| **toneMapping** | Defines the tone mapping exposure used by the renderer. | `ACESFilmicToneMapping` |
| **toneMappingExposure** | Exposure level of tone mapping. | `1` |
| **useLegacyLights** | Whether to use the legacy lighting mode or not | `true` |

### Tres-specific Props
These props are specific to TresJS and control its behavior.

| Prop | Description | Default |
| ---- | ---- | --- |
| **camera** | A manual camera to be used by the renderer. | |
| **context** | This can be used to attach the renderer to an existing [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) | |
| **renderMode** | Render mode, can be `always`, `on-demand` or `manual`. See [Performance](../advanced/performance)  | `always` |
| **windowSize** | Whether to use the window size as the canvas size or the parent element. | `false` |
| **enableProvideBridge** | Enables the provide/inject bridge between Vue context and TresCanvas. | `true` |
| **dpr** | Device Pixel Ratio for the renderer. Can be a single number or a tuple defining a range [min, max]. | |
| **renderer** | Custom renderer instance. Allows using a pre-configured renderer instead of creating a new one. | |

::: warning
All the props described above are specific to the WebGLRenderer. When using a custom renderer (like WebGPU) via the `:renderer` prop, these props will not be applied. You'll need to configure your custom renderer directly in the renderer creation function.
:::

### Opinionated defaults

Tres tries to be as little opinionated as possible. That's why it doesn't set almost any default value for the `TresCanvas` component. It uses the defaults from [three.js](https://threejs.org/). The only exceptions are:

- `antialias`: Set to `true` by default for better visual quality
- `powerPreference`: Set to `high-performance` by default for better performance
- `toneMapping`: Set to `ACESFilmicToneMapping` by default for better HDR rendering
- `shadowMapType`: Set to `PCFSoftShadowMap` by default for better shadow quality
- `renderMode`: Set to `always` by default for continuous rendering
- `enableProvideBridge`: Set to `true` by default to enable Vue's provide/inject across TresJS boundary

## Exposed public properties

You can access the context of the `TresCanvas` using a template ref.

```vue
<script setup>
import { ref, watch } from 'vue'

const ctxRef = ref(null)

watch(() => ctxRef.value?.context, (ctx) => {
  console.log(ctx)
  // Do something with the context
})
</script>

<template>
  <TresCanvas ref="ctxRef">
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

| Property | Description |
| ---- | ---- |
| context | see [useTresContext](composables#usetrescontext) |
| dispose | dispose the renderer |

## WebGPU

WebGPU support was introduced in ThreeJS version `0.160.0`. While is still heavily experimental and not fully compatible with all ThreeJS features, we have enable a prop `renderer` that streamlines a function that returns a promise with a WebGPU renderer instance.

::: warning
When using a custom renderer (especially WebGPU), please note that:
- Some TresJS features may not be fully compatible
- You'll need to handle things like window resizing manually
- The renderer's behavior might differ from the default WebGL renderer
:::

```vue
<script setup>
import { WebGPURenderer } from 'three/webgpu'

const createWebGPURenderer = async (ctx) => {
  const renderer = new WebGPURenderer({
    canvas: ctx.canvas.value,
    alpha: true,
    antialias: true,
  })
  await renderer.init()
  return renderer
}
</script>

<template>
  <TresCanvas :renderer="createWebGPURenderer">
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

The `createWebGPURenderer` will return the context so you have access to the canvas, camera, scene, sizes etc.

```ts
const createWebGPURenderer = async (ctx) => {
  const renderer = new WebGPURenderer({
    canvas: ctx.canvas.value,

  })
  await renderer.init()

  // Watch size changes
  watch([ctx.sizes.width, ctx.sizes.height], () => {
    renderer.setSize(ctx.sizes.width.value, ctx.sizes.height.value)
  }, {
    immediate: true,
  })
  return renderer
}
```
