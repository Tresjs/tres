---
title: Fbo
description: Render to texture using Frame Buffer Objects.
---

# Fbo

::SceneWrapper
  ::ObjectsFbo
  ::
::

An FBO (or Frame Buffer Object) is generally used to render to a texture. This is useful for post-processing effects like blurring, or for rendering to a texture that will be used as a texture in a later draw call.

Cientos provides an `<Fbo />` component make it easy to use FBOs in your application.

## Usage

```vue{2,23-26}
<script setup lang="ts">
import { Fbo, OrbitControls } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const fboRef = shallowRef<InstanceType<typeof Fbo> | null>(null)
const torusRef = shallowRef<TresObject | null>(null)

function onLoop({ elapsed }: { elapsed: number }) {
  if (!torusRef.value) { return }
  torusRef.value.rotation.x = elapsed * 0.745
  torusRef.value.rotation.y = elapsed * 0.361
}
</script>

<template>
  <TresCanvas :clear-color="0x222" @loop="onLoop">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresGridHelper :args="[10, 10]" />
    <Fbo
      ref="fboRef"
      :depth="false"
      :settings="{ samples: 1 }"
    />
    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />

      <TresMeshBasicMaterial
        :color="0xFFFFFF"
        :map="fboRef?.instance?.texture ?? null"
      />
    </TresMesh>

    <TresMesh
      ref="torusRef"
      :position="[3, 0, 0]"
    >
      <TresTorusGeometry :args="[1, 0.5, 16, 100]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

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

::UAlert{type="warning"}
#description
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
