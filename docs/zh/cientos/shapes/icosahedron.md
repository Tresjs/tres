# 二十面几何体 <Badge type="warning" text="^1.6.0" />

![](/cientos/icosahedron.png)

`cientos` 包提供了一个 `<Icosahedron />` 组件，作为 `IcosahedronGeometry` 和 `MeshBasicMaterial` 的快捷方式，同时会创建 `Mesh` 对象。

```typescript
args: [radius: number, detail: number]
```

参考: [IcosahedronGeometry](https://threejs.org/docs/?q=ico#api/en/geometries/IcosahedronGeometry)

## 用法

```html
<Icosahedron :args="[1, 0]" color="red" />

// Icosahedron with a custom material transformations
<Icosahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="red" />
</Icosahedron>
```
