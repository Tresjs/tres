# Dodecahedron <Badge type="warning" text="^1.6.0" />

![](/cientos/dodecahedron.png)

The `cientos` package provides a `<Dodecahedron />` component that serves as a short-cut for a `DodecahedronGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```typescript
args: [radius: number, detail: number]
```

Reference: [DodecahedronGeometry](https://threejs.org/docs/?q=dode#api/en/geometries/DodecahedronGeometry)

## Usage

```vue
<Dodecahedron :args="[1, 0]" color="deeppink" />

// Dodecahedron with a custom material transformations
<Dodecahedron ref="dodecahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="deeppink" />
</Dodecahedron>
```
