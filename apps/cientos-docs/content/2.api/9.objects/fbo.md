---
title: Fbo
description: Render to texture using Frame Buffer Objects.
---

::SceneWrapper
  ::ObjectsFbo
  ::
::

An FBO (or Frame Buffer Object) is generally used to render to a texture. This is useful for post-processing effects like blurring, or for rendering to a texture that will be used as a texture in a later draw call.

Cientos provides an `<Fbo />` component make it easy to use FBOs in your application.

## Props

| Prop           | Description                                                                                                                                                            | Default              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`width`**    | `number` - The width of the FBO.                                                                                                                                       | Width of the canvas  |
| **`height`**   | `number` - the height of the FBO                                                                                                                                       | Height of the canvas |
| **`depth`**    | `boolean` - Whether or not the FBO should render the depth to a [`depthTexture`](https://threejs.org/docs/?q=webglre#api/en/renderers/WebGLRenderTarget.depthTexture). | `false`              |
| **`settings`** | `WebGLRenderTargetOptions` - Every other configuration property for the [`WebGLRenderTarget` class](https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget)      | `{}`                 |
| **`autoRender`** | `boolean` - Whether to automatically render the FBO on the default scene. | `true`               |

## useFBO

An FBO (or Frame Buffer Object) is generally used to render to a texture. This is useful for post-processing effects like blurring, or for rendering to a texture that will be used as a texture in a later draw call.

Cientos provides a `useFBO` composable to make it easy to use FBOs in your application.

::prose-warning
The `useFBO` composable must be used inside of a child component since it needs the context of TresCanvas.
::

### Usage

```vue{2,4-11,20}
<script setup lang="ts">
import { useFBO } from '@tresjs/cientos'

const fboTarget = useFBO({
  depth: true,
  width: 512,
  height: 512,
  settings: {
    samples: 1,
  },
})
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />

    <TresMeshBasicMaterial
      :color="0xFFFFFF"
      :map="fboTarget?.texture ?? null"
    />
  </TresMesh>
</template>

```

### Options

| Prop           | Description                                                                                                                                                            | Default              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`width`**    | `number` - The width of the FBO.                                                                                                                                       | Width of the canvas  |
| **`height`**   | `number` - the height of the FBO                                                                                                                                       | Height of the canvas |
| **`depth`**    | `boolean` - Whether or not the FBO should render the depth to a [`depthTexture`](https://threejs.org/docs/?q=webglre#api/en/renderers/WebGLRenderTarget.depthTexture). | `false`              |
| **`settings`** | `WebGLRenderTargetOptions` - Every other configuration property for the [`WebGLRenderTarget` class](https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget)      | `{}`                 |
