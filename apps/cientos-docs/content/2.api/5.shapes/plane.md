---
title: Plane
description: Short-cut for a PlaneGeometry and a MeshBasicMaterial with a Mesh object.
---

# Plane

::SceneWrapper
  ::ShapesPlane
  ::
::

The `cientos` package provides a `<Plane />` component that serves as a short-cut for a `PlaneGeometry`.

```
args: [width: number, height: number, widthSegments: number, heightSegments: number]
```

Reference: [PlaneGeometry](https://threejs.org/docs/?q=plane#api/en/geometries/PlaneGeometry)

::UAlert{icon="i-lucide-info" title="Info" color="neutral" description="A convenient default rotation is applied to the x-axis of the plane (-Math.PI / 2), so that it is facing up (along the Y axis)."}
::

## Usage

```vue
<Plane :args="[1, 1]" color="orange" />

// Plane with a custom material transformations
<Plane ref="planeRef" :args="[8, 8]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Plane>
```