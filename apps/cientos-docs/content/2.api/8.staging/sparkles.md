---
title: Sparkles
description: Makes sparkles on geometry vertices, optionally guided by directional light.
---

<!-- ::SceneWrapper
  ::StagingSparkles
  ::
:: -->

`<Sparkles />` makes sparkles on your geometry's vertices – optionally guided by a directional light.

## Usage

### Basic

```vue{3,11}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Sparkles } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <TresMesh>
      <TresSphereGeometry />
      <Sparkles />
    </TresMesh>
    <TresAmbientLight />
  </TresCanvas>
</template>
```

 ### With TresDirectionalLight

By default, sparkles appear on the up-facing vertices. However, you can pass a directional light to the component. Moving the directional light will cause "lit" vertices to emit sparkles.

```vue{6,14,17}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Sparkles } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const directionalLightRef = shallowRef()
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <TresMesh>
      <TresSphereGeometry />
      <Sparkles :directional-light="directionalLightRef" />
    </TresMesh>
    <TresDirectionalLight
      ref="directionalLightRef"
      :position="[3, 3, 3]"
      :intensity="2"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

### Sequences

All props beginning with `:sequence-` are used to define how a particle changes as it progresses [(See also: Mixes)](#mixes). `:sequence-` props are of the type `Gradient<T>`, which can be any one of:

* `T`: a single value
* `[T, T, T, ...]`: an evenly distributed series of values
* `[[number, T], [number, T], ...]`: an unevently distributed series of values, where `number` is a gradient "stop" from `0` to `1`.

For example, all of these are acceptable values for `Gradient<TresColor>`:

* `'red'`
* `['red', 'blue', 'green']`
* `[[0.1, 'red'], [0.25, 'blue'], [0.5, 'green']]`

```vue{11-14}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Sparkles } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <TresMesh>
      <TresSphereGeometry />
      <Sparkles
        :sequence-color="['red', 'blue', 'green']"
        :sequence-alpha="[[0.0, 0.0], [0.10, 1.0], [0.5, 1.0], [0.9, 0.0]]"
        :sequence-size="[0.0, 1.0, 0.5]"
      />
    </TresMesh>
    <TresAmbientLight />
  </TresCanvas>
</template>
```

### Mixes

All props beginning with `:mix-` allow you to specify how a particle "progresses" through a corresponding `:sequence-` prop. E.g., `:mix-alpha` affects `:sequence-alpha`.

* If the `:mix-` prop is `0.0`, 'progress' through the `:sequence-` is determined entirely by the light shining on the surface of the sparkling mesh.[<sup>1</sup>](#precisely)
* If the `:mix-` prop is `1.0`, 'progress' through the `:sequence-` is determined entirely by the particle's lifetime.

 More precisely, the value is determined by the dot product of the `directionalLight`'s inverted normalized position and each of the sparkling mesh's vertex normals.

```vue{3,14-18}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Sparkles } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const directionalLightRef = shallowRef()
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <TresMesh>
      <TresSphereGeometry />
      <Sparkles
        :directional-light="directionalLightRef"
        :mix-color="0.8"
        :mix-alpha="0.5"
        :mix-size="0.2"
      />
    </TresMesh>
    <TresDirectionalLight
      ref="directionalLightRef"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## Props

| Name | Description |
| :--- | :---------- |
| **map** | Type: `Texture \| string`<br>Default: `'https://raw.githubusercontent.com/Tresjs/asset...'`<br><br>Texture or image path for individual sparkles |
| **geometry** | Type: `Object3D \| BufferGeometry`<br>Default: `undefined`<br><br>Vertices of the geometry will be used to emit sparkles. Geometry normals are used for sparkles' traveling direction and for responding to the directional light prop.<br><ul><li>If provided, the component will use the passed geometry.</li><li>If no geometry is provided, the component will try to make a copy of the parent object's geometry.</li><li>If no parent geometry exists, the component will create and use an IcosphereGeometry.</li></ul> |
| **directionalLight** | Type: `Object3D`<br>Default: `undefined`<br><br>Particles "light up" when their normal "faces" the light. If no `directionalLight` is provided, the default "up" vector will be used. |
| **lifetimeSec** | Type: `number`<br>Default: `0.4`<br><br>Particle lifetime in seconds |
| **cooldownSec** | Type: `number`<br>Default: `2.0`<br><br>Particle cooldown in seconds – time between lifetime end and respawn |
| **normalThreshold** | Type: `number`<br>Default: `0.7`<br><br>Number from 0-1 indicating how closely the particle needs to be faced towards the light to "light up". (Lower == more flexible) |
| **noiseScale** | Type: `number`<br>Default: `3.0`<br><br>Scale of the noise period (lower == more slowly cycling noise) |
| **scaleNoise** | Type: `number`<br>Default: `1.0`<br><br>Noise coefficient applied to particle scale |
| **offsetNoise** | Type: `number`<br>Default: `0.1`<br><br>Noise coefficient applied to particle offset |
| **lifetimeNoise** | Type: `number`<br>Default: `0.0`<br><br>Noise coefficient applied to particle lifetime |
| **size** | Type: `number`<br>Default: `1.0`<br><br>Particle scale multiplier |
| **alpha** | Type: `number`<br>Default: `1.0`<br><br>Opacity multiplier |
| **offset** | Type: `number`<br>Default: `1.0`<br><br>Offset multiplier |
| **surfaceDistance** | Type: `number`<br>Default: `1.0`<br><br>Surface distance multiplier |
| **sequenceColor** | Type: `Gradient<TresColor>`<br>Default: `[[0.7, '#82dbc5'], [0.8, '#fbb03b']]`<br><br>'*Sequence' props: specify how a particle changes as it "progresses". See also "mix*" props.<br>Color sequence as particles progress |
| **sequenceAlpha** | Type: `Gradient<number>`<br>Default: `[[0.0, 0.0], [0.10, 1.0], [0.5, 1.0], [0.9, 0.0]]`<br><br>Opacity sequence as particles progress |
| **sequenceOffset** | Type: `Gradient<[number, number, number]>`<br>Default: `[0.0, 0.0, 0.0]`<br><br>Distance sequence as particles progress |
| **sequenceNoise** | Type: `Gradient<[number, number, number]>`<br>Default: `[0.1, 0.1, 0.1]`<br><br>Noise sequence as particles progress |
| **sequenceSize** | Type: `Gradient<number>`<br>Default: `[0.0, 1.0]`<br><br>Size sequence as particles progress |
| **sequenceSurfaceDistance** | Type: `Gradient<number>`<br>Default: `[0.05, 0.08, 0.1]`<br><br>Distance from surface (along normal) as particles progress |
| **mixColor** | Type: `number`<br>Default: `0.5`<br><br>'mix*' props: A particle "progresses" with a mix of two factors:<br><ul><li>its normal "facing" the directionalLight</li><li>its lifetime</li></ul>'mix*' props specify the relationship between the two factors.<br>How is a particle's progress for color calculated? (0: normal, 1: particle lifetime) |
| **mixAlpha** | Type: `number`<br>Default: `1.`<br><br>How is a particle's progress for alpha calculated? (0: normal, 1: particle lifetime) |
| **mixOffset** | Type: `number`<br>Default: `1.`<br><br>How is a particle's progress for offset calculated? (0: normal, 1: particle lifetime) |
| **mixSize** | Type: `number`<br>Default: `0.`<br><br>How is a particle's progress for size calculated? (0: normal, 1: particle lifetime) |
| **mixSurfaceDistance** | Type: `number`<br>Default: `1.`<br><br>How is a particle's progress for surface distance calculated? (0: normal, 1: particle lifetime) |
| **mixNoise** | Type: `number`<br>Default: `1.`<br><br>How is a particle's progress for lifetime calculated? (0: normal, 1: particle lifetime) |
| **blending** | Type: `Blending`<br>Default: `AdditiveBlending`<br><br>Material blending |
| **transparent** | Type: `boolean`<br>Default: `true`<br><br>Material transparency |
| **depthWrite** | Type: `boolean`<br>Default: `false`<br><br>Material depth write | 