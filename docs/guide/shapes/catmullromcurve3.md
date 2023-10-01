# CatmullRomCurve3

<DocsDemo>
  <CatmullRomCurve3Demo />
</DocsDemo>

The `cientos` package provides a `<CatmullRomCurve3 />` component that allows you to make smooth(ish) 3D lines.

`<CatmullRomCurve3 />` wraps [Three.js's `CatmullRomCurve3`](https://threejs.org/docs/index.html?q=catmu#api/en/extras/curves/CatmullRomCurve3) functionality, but applies it to Cientos' `<Line2 />` under the hood, meaning you can use [all the props from `<Line2 />`.](line2#props)


## Usage

```vue{3,8-13}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { CatmullRomCurve3, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas v-bind="{clearColor:'#4f4f4f'}">
    <CatmullRomCurve3
      :points="[[-1.5,0,0],[-0.5,1,0],[0.5,0,0],[1.5,1,0]]"
      :segments="40"
      :line-width="10"
      color="#fbb03b"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>

```

## Props

`<CatmullRomCurve3 />` accepts [all of `<Line2 />`'s props and uses the same defaults](line2#props). In addition, it accepts the props below.

| Prop         | Type      | Description                                                                   | Default        |
| ------------ | --------- | ----------------------------------------------------------------------------- | -------------- |
| segments     | `number`  | Number of points to insert between each pair of points in props.points        | 20             |
| closed       | `boolean` | The curve will loop back onto itself when this is true.                       | false          |
| curveType    | `'centripetal' \| 'chordal' \| 'catmullrom'` | Curve type                                 | 'centripetal'  |
| tension      | `number`  | Catmullrom's tension, when curveType is 'catmullrom'                          | 0.5            |
