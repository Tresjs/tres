# Tetrahedron <Badge type="warning" text="^1.6.0" />

![](/cientos/tetrahedron.png)

The `cientos` package provides a `<Tetrahedron />` component that serves as a short-cut for a `TetrahedronGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```typescript
args: [radius: number, detail: number]
```

Reference: [TetrahedronGeometry](https://threejs.org/docs/?q=tetr#api/en/geometries/TetrahedronGeometry)

## Usage

```vue
<Tetrahedron :args="[1, 0]" color="yellow" />

// Tetrahedron with a custom material transformations
<Tetrahedron ref="tetrahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="yellow" />
</Tetrahedron>
```
