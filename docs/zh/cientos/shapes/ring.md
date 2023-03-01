# 圆环 <Badge type="warning" text="^1.6.0" />

![](/cientos/ring.png)

`cientos` 包提供了一个 `<Ring />` 组件，作为 `RingGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象

```typescript
args: [
  innerRadius: number,
  outerRadius: number,
  thetaSegments: number,
  phiSegments: number,
  thetaStart: number,
  thetaLength: number
]
```

参考: [RingGeometry](https://threejs.org/docs/?q=ring#api/en/geometries/RingGeometry)

## 用法

```html
<Ring :args="[0.5, 1, 32]" color="purple" />

// Ring with a custom material transformations
<Ring ref="ringRef" :args="[0.5, 1, 32]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="purple" />
</Ring>
```
