# Circle

![](/cientos/circle.png)

The `cientos` package provides a `<Circle />` component that serves as a short-cut for a `CircleGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```html
<Circle :args="[1, 32]" color="lightsalmon" />

// Circle with a custom material transformations
<Circle ref="circleRef" :args="[1, 32]" :position="[0, 0, 0]">
  <TresMeshToonMaterial color="lightsalmon" />
</Circle>
```


