---
title: <TresCanvas />
description: The TresCanvas component is the main component for rendering 3D scenes.
---

## Component Overview

`<TresCanvas />` creates the necessary Three.js environment and bridges the gap between Vue's reactivity system and Three.js's imperative rendering approach. It is responsible for:

- Creating and configuring the WebGL canvas element
- Setting up the Three.js scene, camera, and renderer
- Establishing the render loop
- Providing the shared context to all child components
- Handling user events through a comprehensive event system
- Managing memory and disposal of Three.js objects

## Usage

```vue [app.vue]
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas shadows>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <!-- Your scene content here -->
  </TresCanvas>
</template>
```

## Canvas Size

The `<TresCanvas />` component offers flexible sizing options to fit different layout requirements. Understanding how canvas sizing works is crucial for creating responsive 3D experiences.

### Default Behavior: Parent Element Size

By default, `<TresCanvas />` automatically adapts to its **parent element's dimensions**. This is the most common and recommended approach as it integrates seamlessly with your existing CSS layout.

```vue [parent-sized.vue]
<template>
  <div class="w-full aspect-video">
    <!-- Canvas automatically fills the container -->
    <TresCanvas>
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <!-- Your 3D scene here -->
    </TresCanvas>
  </div>
</template>
```

### Full Window Size

For immersive full-screen 3D experiences, use the `window-size` prop to make the canvas fill the entire browser viewport:

```vue [fullscreen.vue]
<template>
  <!-- Canvas automatically fills the entire window -->
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <!-- Your 3D scene here -->
  </TresCanvas>
</template>
```

## API

::warning
**Not all props are reactive!** Some props are WebGL context options that are passed to the renderer constructor and **cannot be changed** after the canvas is created. Changing these props would require recreating the entire renderer and canvas context.

For detailed technical information about prop reactivity, see [GitHub Issue #982](https://github.com/Tresjs/tres/issues/982).
::

### Props

:::field-group
  ::::field{name="alpha" type="boolean"}
  **🔒 WebGL Context Option** - Controls the default clear alpha value. When set to `true`, the value is 0. Otherwise it's 1. Enables transparency in the canvas.
  ::::

  ::::field{name="antialias" type="boolean"}
  **🔒 WebGL Context Option** - Default: `true` - Whether to perform antialiasing. Improves visual quality by smoothing jagged edges.
  ::::

  ::::field{name="camera" type="TresCamera"}
  Custom camera instance to use as main camera. If not provided, a default PerspectiveCamera will be created.
  ::::

  ::::field{name="clearAlpha" type="number"}
  **⚡ Reactive** - Default: `1` - The alpha (transparency) value used when clearing the canvas. Range from 0 (transparent) to 1 (opaque).
  ::::

  ::::field{name="clearColor" type="string"}
  **⚡ Reactive** - Default: `"#000000"` - The color the renderer will use to clear the canvas. Can be any valid CSS color string.
  ::::

  ::::field{name="depth" type="boolean"}
  **🔒 WebGL Context Option** - Whether the drawing buffer has a depth buffer of at least 16 bits. Required for depth testing and 3D rendering.
  ::::

  ::::field{name="dpr" type="number | [number, number]"}
  **⚡ Reactive** - Device Pixel Ratio for the renderer. Can be a single number or a tuple defining a range [min, max]. Controls rendering resolution relative to device pixels.
  ::::

  ::::field{name="enableProvideBridge" type="boolean"}
  Default: `true` - Whether to enable the provide/inject bridge between Vue and TresJS. When true, Vue's provide/inject will work across the TresJS boundary.
  ::::

  ::::field{name="failIfMajorPerformanceCaveat" type="boolean"}
  **🔒 WebGL Context Option** - Whether the renderer creation will fail upon low performance detection. See WebGL spec for details.
  ::::

  ::::field{name="logarithmicDepthBuffer" type="boolean"}
  **🔒 WebGL Context Option** - Whether to use a logarithmic depth buffer. May be necessary for huge differences in scale. Can cause performance decrease.
  ::::

  ::::field{name="preserveDrawingBuffer" type="boolean"}
  **🔒 WebGL Context Option** - Whether to preserve the buffers until manually cleared or overwritten. Required for screenshots or canvas-to-image conversion.
  ::::

  ::::field{name="renderer" type="(ctx: TresRendererSetupContext) => TresRenderer"}
  Custom [WebGL](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) or experimental **WebGPU** renderer instance. Allows using a pre-configured renderer instead of creating a new one. Useful for advanced renderer customization.

   ::note
   To see how to use the WebGPU renderer, check the example here: **[WebGPU](/api/advanced/web-gpu)**.
   ::
  ::::

  ::::field{name="renderMode" type="'always' | 'on-demand' | 'manual'"}
  Default: `"always"` - Controls when the scene renders:
  - `always` - Renders every frame continuously
  - `on-demand` - Renders only when changes are detected
  - `manual` - Requires explicit render calls
  ::::

  ::::field{name="shadows" type="boolean"}
  **⚡ Reactive** - Enable shadow mapping in the renderer. Required for casting and receiving shadows in your 3D scene.
  ::::

  ::::field{name="shadowMapType" type="ShadowMapType"}
  **⚡ Reactive** - Default: `PCFSoftShadowMap` - The type of shadow map to use:
  - `BasicShadowMap` - Basic shadow mapping (fastest, lowest quality)
  - `PCFShadowMap` - Percentage-Closer Filtering shadows (good quality/performance balance)
  - `PCFSoftShadowMap` - Soft PCF shadows (best quality, slower)
  - `VSMShadowMap` - Variance Shadow Maps (advanced technique)
  ::::

  ::::field{name="stencil" type="boolean"}
  **🔒 WebGL Context Option** - Whether the drawing buffer has a stencil buffer of at least 8 bits. Used for advanced rendering techniques.
  ::::

  ::::field{name="toneMapping" type="ToneMapping"}
  **⚡ Reactive** - Default: `ACESFilmicToneMapping` - Defines the tone mapping algorithm used by the renderer:
  - `NoToneMapping` - No tone mapping applied
  - `LinearToneMapping` - Linear tone mapping
  - `ReinhardToneMapping` - Reinhard tone mapping
  - `CineonToneMapping` - Cineon tone mapping
  - `ACESFilmicToneMapping` - ACES Filmic tone mapping (recommended)
  - `CustomToneMapping` - Custom tone mapping
  ::::

  ::::field{name="toneMappingExposure" type="number"}
  **⚡ Reactive** - Default: `1` - Exposure level of tone mapping. Controls the brightness/exposure of the rendered image.
  ::::

  ::::field{name="outputColorSpace" type="ColorSpace"}
  **⚡ Reactive** - Color space for the output render. Controls how colors are displayed on screen.
  ::::

  ::::field{name="useLegacyLights" type="boolean"}
  **🔒 WebGL Context Option** - Whether to use the legacy lighting mode. When false, uses physically correct lighting calculations.
  ::::

  ::::field{name="windowSize" type="boolean"}
  **⚡ Reactive** - Whether the canvas should be sized to the window. When true, canvas will be fixed positioned and full viewport size.
  ::::

  ::::field{name="options" type="TresCustomRendererOptions"}
  **⚡ Reactive** - Configuration options for the TresJS custom renderer:
  - `primitivePrefix` - Custom prefix for the primitive component name (default: `""`). For example, setting this to `"my"` allows you to use `<myprimitive>` instead of `<primitive>`.

  ::code-group
  ```vue [Custom Prefix]
  <script setup lang="ts">
  const options = {
    primitivePrefix: 'my', // Use <myprimitive> instead of <primitive>
  }
  </script>

  <template>
    <TresCanvas :options="options">
      <myprimitive :object="myThreeObject" />
    </TresCanvas>
  </template>
  ```

  ```vue [Default (No Prefix)]
  <template>
    <TresCanvas>
      <!-- Default primitive component -->
      <primitive :object="myThreeObject" />
    </TresCanvas>
  </template>
  ```
  ::
  ::::
:::

### Events

:::field-group
  ::::field{name="ready" type="(context: TresContext) => void"}
  Emitted when the TresJS context is fully initialized and ready to use. Provides access to the complete context object.
  ::::

  ::::field{name="render" type="(context: TresContext) => void"}
  Emitted on every frame render. Useful for custom render logic or performance monitoring.
  ::::

  ::::field{name="beforeLoop" type="(context: TresContextWithClock) => void"}
  Emitted before each render loop iteration. Includes clock information for time-based animations.
  ::::

  ::::field{name="loop" type="(context: TresContextWithClock) => void"}
  Emitted during each render loop iteration. Perfect for custom animation logic.
  ::::

  ::::field{name="pointermissed" type="(event: PointerEvent) => void"}
  Emitted when a pointer event doesn't hit any 3D objects in the scene. Useful for deselecting objects or closing menus.
  ::::

  ::::field{name="pointerover" type="(event: PointerEvent) => void"}
  Emitted when the pointer moves over a 3D object. Supports event bubbling from child objects.
  ::::

  ::::field{name="pointerout" type="(event: PointerEvent) => void"}
  Emitted when the pointer moves out of a 3D object. Supports event bubbling from child objects.
  ::::

  ::::field{name="pointerenter" type="(event: PointerEvent) => void"}
  Emitted when the pointer enters a 3D object. Does not bubble from child objects.
  ::::

  ::::field{name="pointerleave" type="(event: PointerEvent) => void"}
  Emitted when the pointer leaves a 3D object. Does not bubble from child objects.
  ::::

  ::::field{name="pointerdown" type="(event: PointerEvent) => void"}
  Emitted when a pointer button is pressed down over a 3D object.
  ::::

  ::::field{name="pointerup" type="(event: PointerEvent) => void"}
  Emitted when a pointer button is released over a 3D object.
  ::::

  ::::field{name="click" type="(event: PointerEvent) => void"}
  Emitted when a 3D object is clicked. Equivalent to pointerdown followed by pointerup.
  ::::
:::

### Exposed Properties

:::field-group
  ::::field{name="context" type="TresContext | undefined"}
  The complete TresJS context object containing scene, renderer, camera, and other core instances. Available after the component is mounted.
  ::::

  ::::field{name="dispose" type="() => void"}
  Method to manually dispose of the WebGL context and clean up resources. Useful for cleanup when dynamically removing canvas instances.
  ::::
:::
