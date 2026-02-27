---
title: Circle
description: Short-cut for a CircleGeometry and a MeshBasicMaterial with a Mesh object.
---

::SceneControlsWrapper
  ::ShapesCircle
  ::
::

The `cientos` package provides a `<Circle />` component that serves as a short-cut for a `CircleGeometry`.

```
args: [radius: number, segments: number, thetaStart: number, thetaLength: number]
```

Reference: [CircleGeometry](https://threejs.org/docs/?q=circle#api/en/geometries/CircleGeometry)

## Usage

```vue
<Circle :args="[1, 32]" color="orange" />

// Circle with a custom material transformations
<Circle ref="circleRef" :args="[1, 32]" :position="[0, 0, 0]">
  <TresMeshToonMaterial color="orange" />
</Circle>
```
