---
title: Rounded Plane
description: Short-cut for a RoundedPlaneGeometry and a MeshBasicMaterial with a Mesh object.
---

::SceneControlsWrapper
  ::ShapesRoundedPlane
  ::
::

The `cientos` package provides a `<RoundedPlane />` component that serves as a short-cut for a `RoundedPlaneGeometry`: a plane with rounded corners. The geometry is vendored from [pmndrs/maath](https://github.com/pmndrs/maath/blob/main/packages/maath/src/geometry.ts) (MIT), so it ships with no extra dependency.

```
args: [
  width: number, // default 1
  height: number, // default 1
  radius: number, // default 0.2
  segments: number, // default 16
]
```

## Usage

```vue
<RoundedPlane :args="[1.5, 1, 0.2, 16]" color="orange" />

// RoundedPlane with a custom material
<RoundedPlane ref="planeRef" :position="[0, 4, 0]">
  <TresMeshStandardMaterial color="orange" />
</RoundedPlane>
```
