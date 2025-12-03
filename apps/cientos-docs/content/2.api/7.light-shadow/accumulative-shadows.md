---
title: Accumulative Shadows
description: DirectionalLight-based shadow component with progressive accumulation.
---

::SceneWrapper
  ::LightShadowAccumulativeShadows
  ::
::

`<AccumulativeShadows />` is a `THREE.DirectionalLight`-based shadow component. It displays shadows on a single shadow catcher plane, included in the component. It is based on [Drei component of the same name](http://drei.docs.pmnd.rs/staging/accumulative-shadows).

## Usage

```vue{2,15-19}
<script setup lang="ts">
import { AccumulativeShadows } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b" :shadows="true">
      <TresPerspectiveCamera
      :look-at="[0, 0, 0]"
    />
    <TresMesh :position-y="0.3" :scale="0.4" :cast-shadow="true">
      <TresTorusKnotGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <AccumulativeShadows
      :blend="100"
      color="#fbb03b"
      once
      :position-y="-0.4"
    />
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| - | - | - |
| `once` | Whether shadow creation only happens once (resets after props change) | `false` |
| `accumulate` | Whether shadows accumulate progressively over several frames | `true` |
| `frames` | Number of frames to render. More yields cleaner results but takes more time. If `accumulate && once`, 1 frame will be consumed every update for `frames` updates. Otherwise, `frames` frames are consumed for every update. | `40` |
| `blend` | If `accumulate`, controls the refresh ratio | `100` |
| `limit` | If less than `Infinity`, limits the amount of frames rendered. Use this to increase performance once a movable scene has settled | `Infinity` |
| `scale` | Scale of the plane | `10` |
| `opacity` | Opacity of the plane | `1` |
| `alphaTest` | Discards alpha pixels | `0.65` |
| `color` | Shadow color | `'black'` |
| `colorBlend` | If less than `Infinity`, limits the amount of frames rendered. Use this to increase performance once a movable scene has settled | `Infinity` |
| `resolution` | Buffer resolution | `1024` |
| `toneMapped` | Texture tonemapping | `true` |

## Slot

You can bring your own lights to `<AccumulatedShadows />`, but it's designed to be used with `<RandomizedLights />`.

By default, there's a [`<RandomizedLights />`](/api/light-shadow/randomized-lights) instance provided in `<AccumulatedShadows />`'s `<slot />`. You can replace it with your own [`<RandomizedLights />`](/api/light-shadow/randomized-lights) or an alternative by passing it as a child component.