# 圆锥 <Badge type="warning" text="^1.6.0" />

![](/cientos/cone.png)

`cientos` 包提供了一个 `<Cone />` 组件，作为 `ConeGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象。

```typescript
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

参考: [ConeGeometry](https://threejs.org/docs/?q=cone#api/en/geometries/ConeGeometry)

## 用法

```html
<Cone :args="[1, 1, 8]" color="orange" />

// Cone with a custom material transformations
<Cone ref="coneRef" :args="[1, 1, 8]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Cone>
```
