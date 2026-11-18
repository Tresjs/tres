---
title: WebGPU
description: EffectComposer, defineEffect and the built-in effects for the WebGPU TresCanvas.
---

`@tresjs/post-processing/webgpu` composes TSL effects with three's `RenderPipeline`. Use it with the `TresCanvas` from `@tresjs/core/webgpu`.

::note
`/webgpu` needs `three` r183 or newer and `@tresjs/core` v5.11 or newer (for `useRenderPipeline`). The root entry still supports `three` r169 and newer.
::

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Bloom, EffectComposer, SMAA } from '@tresjs/post-processing/webgpu'
</script>

<template>
  <TresCanvas :antialias="false">
    <!-- Your scene -->

    <EffectComposer>
      <Bloom :strength="1" :threshold="0.8" />
      <SMAA />
    </EffectComposer>
  </TresCanvas>
</template>
```

## Effects

| Effect                                                   | Stage | Wraps                     |
| -------------------------------------------------------- | ----- | ------------------------- |
| [Bloom](/api/webgpu/bloom)                               | HDR   | `BloomNode`               |
| [ChromaticAberration](/api/webgpu/chromatic-aberration)  | HDR   | `ChromaticAberrationNode` |
| [DepthOfField](/api/webgpu/depth-of-field)               | HDR   | `DepthOfFieldNode`        |
| [Film](/api/webgpu/film)                                 | LDR   | `FilmNode`                |
| [FXAA](/api/webgpu/fxaa)                                 | LDR   | `FXAANode`                |
| [SMAA](/api/webgpu/smaa)                                 | HDR   | `SMAANode`                |

The prop names and defaults follow the three TSL node, not the WebGL components. A WebGL prop is missing when the TSL node has no parameter for it. Each effect page lists the differences and the reason for each.

For an effect that is not in the list, write your own with [`defineEffect`](#defineeffect).

## EffectComposer

The composer renders the scene into a scene pass, then runs its effects on it. Each effect gets the output of the effect before it.

The chain runs in this order:

1. The **HDR** effects, in slot order, on the linear scene colors. Bloom, depth of field and SMAA go here.
2. Tone mapping and the output color space (three's `renderOutput()`).
3. The **LDR** effects, in slot order, on display colors. FXAA and film grain go here.

The tone mapping and the color space come from the renderer, so set them with the `tone-mapping` and `output-color-space` props of `TresCanvas`. Without LDR effects, three applies them at the end of the chain as usual.

The stage wins over the slot order: `<FXAA />` before `<Bloom />` still runs bloom first. An effect without a `stage` is an HDR effect. In development, the composer warns once when an LDR effect comes before an HDR effect in the slot.

| Prop      | Description                                                 | Default |
| --------- | ----------------------------------------------------------- | ------- |
| `enabled` | `false` renders the scene without the effects.              | `true`  |

When an effect is added, removed (`v-if`) or reordered, the composer builds the graph again. A prop change does not.

A new graph compiles a new shader and creates a new scene pass. To switch an effect on and off often, give it a prop that turns it off, such as an `amount` of `0`, instead of `v-if`.

When the composer unmounts, the canvas renders normally again.

## Blending

The WebGPU family has no `blendFunction` or `opacity` props. Each effect returns a new color node, and the next effect reads it. To blend an effect with its input, mix the two in your own effect:

```ts
import { defineEffect } from '@tresjs/post-processing/webgpu'
import { fxaa } from 'three/addons/tsl/display/FXAANode.js'
import { mix } from 'three/tsl'

const FXAAWithOpacity = defineEffect({
  name: 'FXAAWithOpacity',
  stage: 'ldr',
  props: { opacity: 1 },
  create: (input, { uniforms }) => mix(input, fxaa(input), uniforms.opacity),
})
```

## defineEffect

`defineEffect` returns a Vue component. Put it inside an `EffectComposer`.

| Option   | Description                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| `name`   | The component name, also used in warnings.                                                                      |
| `props`  | Prop defaults. Each prop becomes a uniform with the same name.                                                  |
| `stage`  | `'hdr'` (default) runs before tone mapping. `'ldr'` runs after tone mapping and the output color space.          |
| `create` | `(input, { uniforms, passes, scene, camera, renderer }) => Node`. Returns the output node for the `input` node. |

A prop default can be a number, a boolean, a color string, a `Color` or a `Vector2`/`3`/`4`:

- A boolean prop becomes a `0`/`1` float uniform, because WGSL does not allow `bool` in a uniform buffer.
- A color prop also takes a CSS color or a hex number.
- A vector prop also takes a tuple, such as `[1, 0]`.

A prop change writes the `.value` of its uniform, so it does not call `create` again. Put each value that changes in a prop. `create` runs again only when the composer builds the graph again, or the scene or the camera changes.

Each component instance has its own uniforms. Two `<ChromaticAberration>` components with different props do not share them.

An effect that expects display colors, in the range [0, 1], needs `stage: 'ldr'`. This posterize effect rounds each channel to `levels` values (2 or more), so it must run after tone mapping:

```ts
import { defineEffect } from '@tresjs/post-processing/webgpu'
import { vec4 } from 'three/tsl'

const Posterize = defineEffect({
  name: 'Posterize',
  stage: 'ldr',
  props: { levels: 4 },
  create: (input, { uniforms }) => vec4(input.rgb.mul(uniforms.levels.sub(1)).round().div(uniforms.levels.sub(1)), input.a),
})
```

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
