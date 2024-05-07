# Plane <Badge type="warning" text="^1.5.0" />

![](/cientos/plane.png)

The `cientos` package provides a `<Plane />` component that serves as a short-cut for a `PlaneGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```
args: [width: number, height: number, widthSegments: number, heightSegments: number]
```

Reference: [PlaneGeometry](https://threejs.org/docs/?q=plane#api/en/geometries/PlaneGeometry)

::: info
A convenient default rotation is applied to the _x-axis_ of the plane (`-Math.PI / 2`), so that it is facing up (along the Y axis).
:::

## Usage

```vue
<Plane :args="[1, 1]" color="teal" />

// Plane with a custom material transformations
<Plane ref="planeRef" :args="[8, 8]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="teal" />
</Plane>
```
