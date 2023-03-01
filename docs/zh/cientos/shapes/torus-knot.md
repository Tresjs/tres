# 圆环缓冲扭结几何体 <Badge type="warning" text="^1.6.0" />

![](/cientos/torus-knot.png)

`cientos` 包提供了一个 `<TorusKnot />` 组件，作为 `TorusKnotGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象

```typescript
args: [
  radius: number,
  tube: number,
  tubularSegments: number,
  radialSegments: number,
  p: number,
  q: number
]
```

参考: [TorusKnotGeometry](https://threejs.org/docs/?q=torus#api/en/geometries/TorusKnotGeometry)

## 用法

```html
<TorusKnot :args="[0.6, 0.2, 64, 8]" color="lime" />

// TorusKnot with a custom material transformations
<TorusKnot ref="torusKnotRef" :args="[0.6, 0.2, 64, 8]" :position="[-2, 6, 2]">
  <TresMeshToonMaterial color="lime" />
</TorusKnot>
```
