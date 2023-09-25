# Precipitation

`<Precipitation />` is a fully flexible component that renders an infinite particle flow, It comes with several props that allow you customize it to create different effects like precipitation, snow, waterfall, beams, etc.

<DocsDemo>
  <PrecipitationDemo />
</DocsDemo>

## Usage

You can use `<Precipitation />` component without passing any props, this will achieve a snowy effect, like the before example.

```vue{8}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

By setting the randomness to 0, increase the speed  and reduce the count. You can easily achieve a more rainy effect.

<DocsDemo>
  <PrecipitationRainDemo />
</DocsDemo>


```vue{9,10,11}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      :speed="1"
      :randomness="0"
      :count="2500"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```
A storm effect? Easy just increase the randomness.

<DocsDemo>
  <PrecipitationStormDemo />
</DocsDemo>

```vue{9,10,11}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      :speed="1"
      :randomness="3"
      :count="2500"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

What about an infinite beam?.

<DocsDemo>
  <PrecipitationBeamDemo />
</DocsDemo>

Just set the area, to the axis that you need constrain.

```vue{9,10,11,12}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      :randomness="0"
      :speed="0.5"
      :count="2000"
      :area="[1, 10, 1]"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```
You can create much more! ☔

::: warning
Be careful with the performance this components render infinite particles in movement
:::

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
