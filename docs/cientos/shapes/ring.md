# Ring

![](/cientos/ring.png)

The `cientos` package provides a `<Ring />` component that serves as a short-cut for a `RingGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
<Ring :args="[0.5, 1, 32]" color="purple" />

// Ring with a custom material transformations
<Ring ref="ringRef" :args="[0.5, 1, 32]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="purple" />
</Ring>
```


