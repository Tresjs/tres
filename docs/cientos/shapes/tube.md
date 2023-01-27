# Tube

![](/cientos/tube.png)

The `cientos` package provides a `<Tube />` component that serves as a short-cut for a `TubeGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
// TubeGeometry needs a curve path to be construct
<Tube :args="[tubePath, 20, 0.2, 8, false]" color="lightblue" />

// Tube with a custom material transformations
<Tube ref="tubeRef" :args="[tubePath, 20, 0.2, 8, false]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="lightblue" />
</Tube>
```

