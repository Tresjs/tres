# 八面几何体 <Badge type="warning" text="^1.6.0" />

![](/cientos/octahedron.png)

`cientos` 包提供了一个 `<Octahedron />` 组件，作为 `OctahedronGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象。

```typescript
args: [radius: number, detail: number]
```

参考: [OctahedronGeometry](https://threejs.org/docs/?q=octa#api/en/geometries/OctahedronGeometry)

## 用法

```html
<Octahedron :args="[1, 0]" color="red" />

// Octahedron with a custom material transformations
<Octahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="red" />
</Octahedron>
```
