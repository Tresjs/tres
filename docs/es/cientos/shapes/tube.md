# Tubo <Badge type="warning" text="^1.6.0" />

![](/cientos/tube.png)

El paquete `cientos` provee un `<Tube />` componente que funciona como un atajo para un `TubeGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

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

Referencia: [TubeGeometry](https://threejs.org/docs/?q=tube#api/en/geometries/TubeGeometry)

## Utilización

```html
// TubeGeometry needs a curve path to be construct
<Tube :args="[tubePath, 20, 0.2, 8, false]" color="lightblue" />

// Tubo con transformaciones materiales a medida
<Tube ref="tubeRef" :args="[tubePath, 20, 0.2, 8, false]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="lightblue" />
</Tube>
```
