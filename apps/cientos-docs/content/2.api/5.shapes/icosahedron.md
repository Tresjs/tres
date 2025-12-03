---
title: Icosahedron
description: Short-cut for a IcosahedronGeometry and a MeshBasicMaterial with a Mesh object.
---

::SceneWrapper
  ::ShapesIcosahedron
  ::
::

The `cientos` package provides a `<Icosahedron />` component that serves as a short-cut for a `IcosahedronGeometry`.

```
args: [radius: number, detail: number]
```

Reference: [IcosahedronGeometry](https://threejs.org/docs/?q=ico#api/en/geometries/IcosahedronGeometry)

## Usage

```vue
<Icosahedron :args="[1, 0]" color="orange" />

// Icosahedron with a custom material transformations
<Icosahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Icosahedron>
```