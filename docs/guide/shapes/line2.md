# Line2

<DocsDemo>
  <Line2Demo />
</DocsDemo>

The `cientos` package provides a `<Line2 />` component that wraps [Three.js's `Line2`](https://github.com/mrdoob/three.js/blob/e2bcdfff6427c2f106cb819b18d88d1e13aa508a/examples/jsm/lines/Line2.js).

## Usage

```vue{3,8-12}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Line2, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas v-bind="{clearColor:'#888'}">
    <Line2
      :points="[[-0.5,0,0], [0.5,0,0] ,[0,0.8660,0], [-0.5,0,0]]"
      :line-width="10"
      color="#82dbc5"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
```

## Props

| Prop            | Type                     | Description                                                                | Default        |
| --------------- | -------------------------|--------------------------------------------------------------------------- | -------------- |
| points          | [See below](#points)     | Points representing the line                                               |                |
| vertexColors    | `TresColor[]`            | Vertex colors, if using                                                    | null           |
| color           | `TresColor`              | Color for the line – multiplies vertex colors                              | 'white'        |
| lineWidth       | `number`                 | Width of the line – in world units with size attenuation, pixels otherwise | 1              |
| worldUnits      | `boolean`                | Whether the line width is in world units or pixels                         | false          |
| alphaToCoverage | `boolean`                | Enables alpha to coverage. Can only be used with MSAA-enabled contexts (meaning when the renderer was created with antialias parameter set to true).                                                               | false          |
| dashed          | `boolean`                | Whether the line is dashed                                                 | false          |
| dashSize        | `number`                 | Dash size                                                                  | 1              |
| gapSize         | `number`                 | Gap size in dashed line                                                    | 1              |
| dashScale       | `number`                 | Scale of the dashes/gaps                                                   | 1              |
| dashOffset      | `number`                 | Dash offset                                                                | 0              |

### Points

The points prop can be any of these types:

| Type                         | Interpretation                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `Vector3[]`                  | Each Vector3 maps to a point's x, y, z.                                          |
| <nobr>`[number, number, number][]`</nobr> | Each entry maps to [x, y, z].                                          |
| `Vector2[]`                  | Each Vector2 maps to a point's x and y. z = 0.                                   |
| `[number, number][]`         | Each entry maps to [x, y, 0].                                                    |
| `number[]`                   | An array of [x, y, z, x, y, z, x ...] coordinates. Length should be a multiple of 3. Proper length is not checked. |