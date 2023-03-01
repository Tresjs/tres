# 十二面几何体 <Badge type="warning" text="^1.6.0" />

![](/cientos/dodecahedron.png)

`cientos` 包提供了一个 `<Dodecahedron />` 组件，作为 `DodecahedronGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象。

```typescript
args: [radius: number, detail: number]
```

参考: [DodecahedronGeometry](https://threejs.org/docs/?q=dode#api/en/geometries/DodecahedronGeometry)

## 用法

```html
<Dodecahedron :args="[1, 0]" color="deeppink" />

// Dodecahedron with a custom material transformations
<Dodecahedron ref="dodecahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="deeppink" />
</Dodecahedron>
```
