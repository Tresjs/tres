---
title: Torus
description: Short-cut for a TorusGeometry and a MeshBasicMaterial with a Mesh object.
---

::SceneWrapper
  ::ShapesTorus
  ::
::

The `cientos` package provides a `<Torus />` component that serves as a short-cut for a `TorusGeometry`.

```
args: [
  radius: number,
  tube: number,
  radialSegments: number,
  tubularSegments: number,
  arc: number
]
```

Reference: [TorusGeometry](https://threejs.org/docs/?q=torus#api/en/geometries/TorusGeometry)

## Usage

```vue
<Torus :args="[2, 0.4, 42, 100]" color="orange" />

// Torus with a custom material transformations
<Torus ref="torusRef" :args="[0.75, 0.4, 16, 80]" :position="[-2, 6, 0]">
  <TresMeshToonMaterial color="orange" />
</Torus>
```
