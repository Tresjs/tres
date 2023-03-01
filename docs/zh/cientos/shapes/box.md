# 立方体 <Badge type="warning" text="^1.6.0" />

![](/cientos/box.png)

`cientos` 包提供了一个 `<Box />` 组件，作为 `BoxGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象。

```typescript
args: [
  width: number,
  height: number,
  depth: number,
  widthSegments: number,
  heightSegments: number,
  depthSegments: number
]
```

参考: [BoxGeometry](https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry)

## 用法

```html
<Box :args="[1, 1, 1]" color="orange" />

// Box with a custom material transformations
<Box ref="boxRef" :args="[1, 1, 1]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Box>
```
