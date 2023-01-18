# TorusKnot

![](/cientos/torus-knot.png)

The `cientos` package provides a `<TorusKnot />` component that serves as a short-cut for a `TorusKnotGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
<TorusKnot :args="[0.6, 0.2, 64, 8]" color="lime" />

// TorusKnot with a custom material transformations
<TorusKnot ref="torusKnotRef" :args="[0.6, 0.2, 64, 8]" :position="[-2, 6, 2]">
<TresMeshToonMaterial color="lime" />
</TorusKnot>
```


