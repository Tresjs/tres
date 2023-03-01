# 管道 <Badge type="warning" text="^1.6.0" />

![](/cientos/tube.png)

`cientos` 包提供了一个 `<Tube />` 组件，作为 `TubeGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象

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

参考: [TubeGeometry](https://threejs.org/docs/?q=tube#api/en/geometries/TubeGeometry)

## 用法

```html
// TubeGeometry needs a curve path to be construct
<Tube :args="[tubePath, 20, 0.2, 8, false]" color="lightblue" />

// Tube with a custom material transformations
<Tube ref="tubeRef" :args="[tubePath, 20, 0.2, 8, false]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="lightblue" />
</Tube>
```
