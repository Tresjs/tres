# 平面 <Badge type="warning" text="^1.5.0" />

![](/cientos/plane.png)

`cientos` 包提供了一个 `<Plane />` 组件，作为 `PlaneGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象。

```typescript
args: [width: number, height: number, widthSegments: number, heightSegments: number]
```

参考: [PlaneGeometry](https://threejs.org/docs/?q=plane#api/en/geometries/PlaneGeometry)

::: info
A convenient default rotation is applied to the _x-axis_ of the plane (`-Math.PI / 2`), so that it is facing up (along the Y axis).
:::

## 用法

```html
<Plane :args="[1, 1]" color="teal" />

// Plane with a custom material transformations
<Plane ref="planeRef" :args="[8, 8]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="teal" />
</Plane>
```
