# Edges

<DocsDemo>
  <EdgesDemo />
</DocsDemo>

The `cientos` package provides an abstraction of [EdgesGeometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry) from Three.js, `<Edges>` is specifically designed for rendering visible edges of objects in a scene graph. This enhances the visual quality by highlighting contours and providing a stylized appearance which contributes to the artistic aspect of 3D visualizations.

## Usage

<<< @/.vitepress/theme/components/EdgesDemo.vue

The `<Edges>` component is easy to set up as it automatically derives geometry from its parent. You can simply wrap it around any [Object3D](https://threejs.org/docs/#api/en/core/Object3D), [Mesh](https://threejs.org/docs/#api/en/objects/Mesh), or [primitive](https://docs.tresjs.org/advanced/primitive.html) to automatically apply edge rendering. You can provide a custom material to `<Edges>`. When a custom material is used, the color prop has no effect. *(see code bellow)*

```vue
<script setup lang="ts">
import { Box, Edges } from '@tresjs/cientos'
</script>

<template>
  <Box>
    <TresMeshNormalMaterial />

    <!-- Usage with the default material (LineBasicMaterial) -->
    <Edges color="#FF0000" />
    <!-- ———— -->

    <!-- Usage with an custom material -->
    <Edges>
      <TresMeshBasicMaterial color="#00FF00" />
    </Edges>
    <!-- ———— -->
  </Box>
</template>
```

## Props

`<Edges>` is based on [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments) & [Line](https://threejs.org/docs/#api/en/objects/Line) and supports all of its props.

| Prop              | Description                                          | Default                   |
| :---------------- | :--------------------------------------------------- | ------------------------- |
| **color**        | `THREE.Color` — Color of the edges. <br> More informations : [TresColor](https://docs.tresjs.org/api/instances-arguments-and-props.html#colors) — [THREE.Color](https://threejs.org/docs/#api/en/math/Color) | `#ff0000`                   |
| **threshold**        | `number` — An edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value  | `1`                   |

## Exposed properties

| Event       | Description                                                      |
| :---------- | :--------------------------------------------------------------- |
| `instance` | Instance reference — Inheritance of [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments).|

```typescript{1}
const edgesRef = shallowRef(null)

console.log(edgesRef.value.instance) // instance properties
```

```vue{2}
<template>
    <Edges ref="edgesRef" />
</template>
```
