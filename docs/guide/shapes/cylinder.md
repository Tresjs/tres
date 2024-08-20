# Cylinder <Badge type="warning" text="^4.0.0" />

![](/cientos/cylinder.png)

The `cientos` package provides a `<Cylinder />` component that serves as a short-cut for a `CylinderGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```
args: [
  radiusTop: number,
  radiusBottom: number,
  height: number,
  radialSegments: number,
  heightSegments: number,
  openEnded: boolean,
  thetaStart: number,
  thetaLength: number
]
```

Reference: [CylinderGeometry](https://threejs.org/docs/?q=cylinder#api/en/geometries/CylinderGeometry)

## Usage

```vue
<Cylinder :args="[1, 1, 1, 32, 1, false, 0, Math.PI * 2]" color="orange" />

// Cylinder with a custom material transformations
<Cylinder ref="cylinderRef" :args="[1, 1, 1, 32, 1, false, 0, Math.PI * 2]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Cylinder>
```
