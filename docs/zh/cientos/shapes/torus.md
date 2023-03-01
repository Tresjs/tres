# 圆环 <Badge type="warning" text="^1.6.0" />

![](/cientos/torus.png)

`cientos` 包提供了一个 `<Torus />` 组件，作为 `TorusGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象

```typescript
args: [
  radius: number,
  tube: number,
  radialSegments: number,
  tubularSegments: number,
  arc: number
]
```

参考: [TorusGeometry](https://threejs.org/docs/?q=torus#api/en/geometries/TorusGeometry)

## 用法

```html
<Torus :args="[2, 0.4, 42, 100]" color="cyan" />

// Torus with a custom material transformations
<Torus ref="torusRef" :args="[0.75, 0.4, 16, 80]" :position="[-2, 6, 0]">
  <TresMeshToonMaterial color="cyan" />
</Torus>
```
