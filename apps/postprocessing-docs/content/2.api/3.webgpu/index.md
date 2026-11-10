---
title: WebGPU
description: EffectComposer and defineEffect for the WebGPU TresCanvas.
---

`@tresjs/post-processing/webgpu` composes TSL effects with three's `RenderPipeline`. Use it with the `TresCanvas` from `@tresjs/core/webgpu`.

::note
`/webgpu` needs `three` r183 or newer and `@tresjs/core` v5.11 or newer (for `useRenderPipeline`). The root entry still supports `three` r169 and newer.
::

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { defineEffect, EffectComposer } from '@tresjs/post-processing/webgpu'
import { chromaticAberration } from 'three/addons/tsl/display/ChromaticAberrationNode.js'
import { vec2 } from 'three/tsl'

const ChromaticAberration = defineEffect({
  name: 'ChromaticAberration',
  props: { strength: 1, scale: 1.1 },
  create: (input, { uniforms }) => chromaticAberration(input, uniforms.strength, vec2(0.5, 0.5), uniforms.scale),
})
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <EffectComposer>
      <ChromaticAberration :strength="1.5" />
    </EffectComposer>
  </TresCanvas>
</template>
```

## EffectComposer

The composer renders the scene into a scene pass, then runs its effects on it in slot order. Each effect gets the output of the effect before it.

| Prop      | Description                                                 | Default |
| --------- | ----------------------------------------------------------- | ------- |
| `enabled` | `false` renders the scene without the effects.              | `true`  |

When an effect is added, removed (`v-if`) or reordered, the composer builds the graph again. A prop change does not.

A new graph compiles a new shader and creates a new scene pass. To switch an effect on and off often, give it a prop that turns it off, such as an `amount` of `0`, instead of `v-if`.

When the composer unmounts, the canvas renders normally again.

## defineEffect

`defineEffect` returns a Vue component. Put it inside an `EffectComposer`.

| Option   | Description                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| `name`   | The component name, also used in warnings.                                                                      |
| `props`  | Prop defaults. Each prop becomes a uniform with the same name.                                                  |
| `create` | `(input, { uniforms, passes, scene, camera, renderer }) => Node`. Returns the output node for the `input` node. |

A prop default can be a number, a boolean, a color string, a `Color` or a `Vector2`/`3`/`4`:

- A boolean prop becomes a `0`/`1` float uniform, because WGSL does not allow `bool` in a uniform buffer.
- A color prop also takes a CSS color or a hex number.
- A vector prop also takes a tuple, such as `[1, 0]`.

A prop change writes the `.value` of its uniform, so it does not call `create` again. Put each value that changes in a prop. `create` runs again only when the composer builds the graph again, or the scene or the camera changes.

Each component instance has its own uniforms. Two `<ChromaticAberration>` components with different props do not share them.

::note
All effects run on the linear scene colors, before tone mapping and the sRGB transform. An effect that expects display colors, such as FXAA or film grain, does not look correct yet.
::

## Example: pixelation

::DocsDemo
  ::WebgpuPixelation
  ::
::

This custom effect wraps the `pixelationPass` node from three. Its uniforms go directly to the node, so the sliders change the effect and do not build the graph again.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { defineEffect, EffectComposer } from '@tresjs/post-processing/webgpu'
import { pixelationPass } from 'three/addons/tsl/display/PixelationPassNode.js'

const Pixelation = defineEffect({
  name: 'Pixelation',
  props: { pixelSize: 6, normalEdgeStrength: 0.3, depthEdgeStrength: 0.4 },
  create: (_input, { scene, camera, uniforms }) =>
    pixelationPass(scene, camera, uniforms.pixelSize, uniforms.normalEdgeStrength, uniforms.depthEdgeStrength),
})
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <EffectComposer>
      <Pixelation :pixel-size="8" />
    </EffectComposer>
  </TresCanvas>
</template>
```

::note
`pixelationPass` renders the scene again and does not read `input`. Put it first in the composer. An effect before it has no effect on the output. Effects after it get the pixelated image.
::
