# TresCanvas

The `TresCanvas` component is the main component of Tres. It's the one that creates the ThreeJS `WebGLRenderer`.

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

## Presets

Tres comes with a few presets for the `TresCanvas` component. You can use them by setting the `preset` prop.

### Realistic

The `realistic` preset makes it easy to setup the renderer for more realistic 3D scenes.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

It's equivalent to:

```ts
renderer.shadows = true
renderer.physicallyCorrectLights = true
renderer.outputColorSpace = SRGBColorSpace
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
```

## Props

| Prop | Description | Default |
| ---- | ---- | --- |
| **alpha** | Controls the default clear alpha value. When set to true, the value is 0. Otherwise it's 1. | false |
| **antialias** | Whether to perform antialiasing. | `true` |
| **camera** | A manual camera to be used by the renderer. | |
| **clearColor** | The color the renderer will use to clear the canvas. | `#000000` |
| **context** | This can be used to attach the renderer to an existing [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) | |
| **depth** | Whether the drawing buffer has a [depth buffer](https://en.wikipedia.org/wiki/Z-buffering) of at least 16 bits. | `true` |
| **renderMode** | Render mode, can be `always`, `on-demand` or `manual`. See [Performance](../advanced/performance)  | `always` |
| **disableRender** | Disable render on requestAnimationFrame, useful for PostProcessing | `false` |
| **failIfMajorPerformanceCaveat** | Whether the renderer creation will fail upon low performance is detected. See [WebGL spec](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2) for details. | `false` |
| **logarithmicDepthBuffer** | Whether to use a logarithmic depth buffer. It may be necessary to use this if dealing with huge differences in scale in a single scene. Note that this setting uses gl_FragDepth if available which disables the [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) optimization and can cause a decrease in performance. | `false` |
| **outputColorSpace** | Defines the output encoding | `LinearEncoding` |
| **powerPreference** | Provides a hint to the user agent indicating what configuration of GPU is suitable for this WebGL context. Can be `high-performance`, `low-power` or `default`. | `default` |
| **precision** | Shader precision. Can be `highp`, `mediump` or `lowp`. | "highp" if supported by the device |
| **premultipliedAlpha** | Whether the renderer will assume that colors have [premultiplied alpha](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha). | `true` |
| **preserveDrawingBuffer** | Whether to preserve the buffers until manually cleared or overwritten.. | `false` |
| **shadows** | Enable shadows in the renderer | `false` |
| **shadowMapType** | Set the shadow map type | `PCFSoftShadowMap` |
| **stencil** | Whether the drawing buffer has a [stencil buffer](https://en.wikipedia.org/wiki/Stencil_buffer) of at least 8 bits. | `true` |
| **toneMapping** | Defines the tone mapping exposure used by the renderer. | `NoToneMapping` |
| **toneMappingExposure** | Exposure level of tone mapping. | `1` |
| **useLegacyLights** | Whether to use the legacy lighting mode or not | `true` |
| **windowSize** | Whether to use the window size as the canvas size or the parent element. | `false` |

### Defaults

Tres tries to be as little opinionated as possible. That's why it doesn't set almost any default value for the `TresCanvas` component. It uses the defaults from [three.js](https://threejs.org/). The only exception is the `antialias` prop. It's set to `true` by default.

## Exposed public properties

| Property | Description |
| ---- | ---- |
| context | see [useTresContext](composables#usetrescontext) |
