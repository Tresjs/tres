# Torus

![](/cientos/torus.png)

The `cientos` package provides a `<Torus />` component that serves as a short-cut for a `TorusGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
<Torus :args="[2, 0.4, 42, 100]" color="cyan" />

// Torus with a custom material transformations
<Torus ref="torusRef" :args="[0.75, 0.4, 16, 80]" :position="[-2, 6, 0]">
  <TresMeshToonMaterial color="cyan" />
 </Torus>

```


