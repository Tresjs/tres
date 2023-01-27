# Icosahedron

![](/cientos/icosahedron.png)

The `cientos` package provides a `<Icosahedron />` component that serves as a short-cut for a `IcosahedronGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
<Icosahedron :args="[1, 0]" color="red" />

// Icosahedron with a custom material transformations
<Icosahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="red" />
</Icosahedron>
```
