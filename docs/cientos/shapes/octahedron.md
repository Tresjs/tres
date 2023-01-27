# Octahedron

![](/cientos/octahedron.png)

The `cientos` package provides a `<Octahedron />` component that serves as a short-cut for a `OctahedronGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
<Octahedron :args="[1, 0]" color="red" />

// Octahedron with a custom material transformations
<Octahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="red" />
</Octahedron>
```
