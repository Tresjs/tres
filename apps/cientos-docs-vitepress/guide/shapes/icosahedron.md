# Icosahedron <Badge type="warning" text="^1.6.0" />

![](/cientos/icosahedron.png)

The `cientos` package provides a `<Icosahedron />` component that serves as a short-cut for a `IcosahedronGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```
args: [radius: number, detail: number]
```

Reference: [IcosahedronGeometry](https://threejs.org/docs/?q=ico#api/en/geometries/IcosahedronGeometry)

## Usage

```vue
<Icosahedron :args="[1, 0]" color="red" />

// Icosahedron with a custom material transformations
<Icosahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="red" />
</Icosahedron>
```
