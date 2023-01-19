# Cone

![](/cientos/cone.png)

The `cientos` package provides a `<Cone />` component that serves as a short-cut for a `ConeGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
<Cone :args="[1, 1, 8]" color="orange" />

// Cone with a custom material transformations
<Cone ref="coneRef" :args="[1, 1, 8]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Cone>
```
