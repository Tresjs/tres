# Octahedron <Badge type="warning" text="^1.6.0" />

![](/cientos/octahedron.png)

The `cientos` package provides a `<Octahedron />` component that serves as a short-cut for a `OctahedronGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```
args: [radius: number, detail: number]
```

Reference: [OctahedronGeometry](https://threejs.org/docs/?q=octa#api/en/geometries/OctahedronGeometry)

## Usage

```vue
<Octahedron :args="[1, 0]" color="red" />

// Octahedron with a custom material transformations
<Octahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="red" />
</Octahedron>
```
