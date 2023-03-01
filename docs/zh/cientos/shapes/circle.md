# 圆形 <Badge type="warning" text="^1.6.0" />

![](/cientos/circle.png)

`cientos` 包提供了一个 `<Circle />` 组件，作为 `CircleGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象。

```typescript
args: [radius: number, segments: number, thetaStart: number, thetaLength: number]
```

参考: [CircleGeometry](https://threejs.org/docs/?q=circle#api/en/geometries/CircleGeometry)

## 用法

```html
<Circle :args="[1, 32]" color="lightsalmon" />

// Circle with a custom material transformations
<Circle ref="circleRef" :args="[1, 32]" :position="[0, 0, 0]">
  <TresMeshToonMaterial color="lightsalmon" />
</Circle>
```
