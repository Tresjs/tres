# 四面几何体 <Badge type="warning" text="^1.6.0" />

![](/cientos/tetrahedron.png)

`cientos` 包提供了一个 `<Tetrahedron />` 组件，作为 `TetrahedronGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象

```typescript
args: [radius: number, detail: number]
```

参考: [TetrahedronGeometry](https://threejs.org/docs/?q=tetr#api/en/geometries/TetrahedronGeometry)

## 用法

```html
<Tetrahedron :args="[1, 0]" color="yellow" />

// Tetrahedron with a custom material transformations
<Tetrahedron ref="tetrahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="yellow" />
</Tetrahedron>
```
