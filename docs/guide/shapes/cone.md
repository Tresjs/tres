# Cone <Badge type="warning" text="^1.6.0" />

![](/cientos/cone.png)

The `cientos` package provides a `<Cone />` component that serves as a short-cut for a `ConeGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```
args: [
  radius: number,
  height: number,
  radialSegments: number,
  heightSegments: number,
  openEnded: boolean,
  thetaStart: number,
  thetaLength: number
]
```

Reference: [ConeGeometry](https://threejs.org/docs/?q=cone#api/en/geometries/ConeGeometry)

## Usage

```vue
<Cone :args="[1, 1, 8]" color="orange" />

// Cone with a custom material transformations
<Cone ref="coneRef" :args="[1, 1, 8]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Cone>
```
