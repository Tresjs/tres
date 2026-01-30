---
title: Octahedron
description: Short-cut for a OctahedronGeometry and a MeshBasicMaterial with a Mesh object.
---

::SceneControlsWrapper
  ::ShapesOctahedron
  ::
::

The `cientos` package provides a `<Octahedron />` component that serves as a short-cut for a `OctahedronGeometry`.

```
args: [radius: number, detail: number]
```

Reference: [OctahedronGeometry](https://threejs.org/docs/?q=octa#api/en/geometries/OctahedronGeometry)

## Usage

```vue
<Octahedron :args="[1, 0]" color="orange" />

// Octahedron with a custom material transformations
<Octahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Octahedron>
```
