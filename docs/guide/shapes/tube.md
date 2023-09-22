# Tube <Badge type="warning" text="^1.6.0" />

![](/cientos/tube.png)

The `cientos` package provides a `<Tube />` component that serves as a short-cut for a `TubeGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

Reference: [TubeGeometry](https://threejs.org/docs/?q=tube#api/en/geometries/TubeGeometry)

## Usage

```typescript
<script>
export default {
  setup() {
    const tubePath = ref(new CubicBezierCurve3(
          new Vector3(-1, 0, 0),
          new Vector3(-0.5, -1, 0),
          new Vector3(0.5, 1, 0),
          new Vector3(1, 0, 0),
          ));

    return {
      tubePath
    }
  },
}
</script>
```

```vue
// TubeGeometry needs a curve path to be construct
<Tube :args="[tubePath, 20, 0.2, 8, false]" color="lightblue" />

// Tube with a custom material transformations
<Tube ref="tubeRef" :args="[tubePath, 20, 0.2, 8, false]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="lightblue" />
</Tube>
```

## Args

```typescript
type CurveType = QuadraticBezierCurve3 | CubicBezierCurve3 | CatmullRomCurve3 | LineCurve3

args: [
  path: CurveType,
  tubularSegments: number,
  radius: number,
  radialSegments: number,
  closed: boolean
]
```
