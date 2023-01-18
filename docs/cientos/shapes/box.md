# Box

![](/cientos/box.png)

The `cientos` package provides a `<Box />` component that serves as a short-cut for a `BoxGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
<Box :args="[1, 1, 1]" color="orange" />

// Plane with a custom material transformations
<Box ref="planeRef" :args="[1, 1, 1]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Box>
```

