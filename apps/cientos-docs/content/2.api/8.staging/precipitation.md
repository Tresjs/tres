---
title: Precipitation
description: Flexible infinite particle flow for rain, snow, waterfall, and beam effects.
---

# Precipitation

::SceneWrapper
  ::StagingPrecipitation
  ::
::

`<Precipitation />` is a fully flexible component that renders an infinite particle flow, It comes with several props that allow you customize it to create different effects like precipitation, snow, waterfall, beams, etc.

## Usage

You can use `<Precipitation />` component without passing any props, this will achieve a snowy effect, like the before example.

```vue{3,9}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <Precipitation />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

### Rain

By setting the randomness to 0, increase the speed  and reduce the count. You can easily achieve a more rainy effect.

```vue{3,9-13}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <Precipitation
      :count="2000"
      :speed="0.3"
      :randomness="0"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

### Storm

A storm effect? Easy just increase the randomness.

```vue{3,9-13}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <Precipitation
      :count="3000"
      :speed="0.5"
      :randomness="1.5"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

### Beam

What about an infinite beam? Just set the area, to the axis that you need constrain.

```vue{3,9-15}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <Precipitation
      :area="[0.5, 0.5, 20]"
      :count="1000"
      :speed="0.2"
      :size="0.3"
      color="#00ff00"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

You can create much more! ☔

::UAlert{icon="i-lucide-message-square-warning" title="Warning" description="Be careful with the performance this components render infinite particles in movement"}
::

## Props

| Prop                | Description                                             | Default      |
| :------------------ | :------------------------------------------------------ | ------------ |
| **size**            | The size of the drops.                                  | 0.1          |
| **area**            | The size of the precipitation area.                              | [10, 10, 20] |
| **color**           | The color of the drops.                                  | 0xffffff     |
| **map**             | Color texture of the drops.                             | null         |
| **alphaMap**        | Alpha texture of the Drops.                             | null         |
| **alphaTest**       | Enables the WebGL to know when not to render the pixel. | 0.01         |
| **opacity**         | Set the opacity of the drops.                           | 0.8          |
| **count**           | Number of drops.                                        | 5000         |
| **speed**           | Drops speed.                                            | 0.1          |
| **randomness**      | Add randomness to the drops.                            | 0.5          |
| **depthWrite**      | Whether should write to the depth buffer or not. drops. | true         |
| **transparent**     | Transparency on the drops texture                       | false        |
| **sizeAttenuation** | Keep the same size regardless distance. drops.          | true         |