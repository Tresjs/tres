# 球体 <Badge type="warning" text="^1.6.0" />

![](/cientos/sphere.png)

`cientos` 包提供了一个 `<Sphere />` 组件，作为 `SphereGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象

```typescript
args: [
  radius: number,
  widthSegments: number,
  heightSegments: number,
  phiStart: number,
  phiLength: number,
  thetaStart: number,
  thetaLength: number
]
```

参考: [SphereGeometry](https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry)

## 用法

```html
<Sphere :args="[1, 1, 1]" color="pink" />

// Sphere with a custom material transformations
<Sphere ref="planeRef" :args="[1, 1, 1]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="pink" />
</Sphere>
```
