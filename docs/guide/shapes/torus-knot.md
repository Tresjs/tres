# TorusKnot <Badge type="warning" text="^1.6.0" />

![](/cientos/torus-knot.png)

The `cientos` package provides a `<TorusKnot />` component that serves as a short-cut for a `TorusKnotGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```typescript
args: [
  radius: number,
  tube: number,
  tubularSegments: number,
  radialSegments: number,
  p: number,
  q: number
]
```

Reference: [TorusKnotGeometry](https://threejs.org/docs/?q=torus#api/en/geometries/TorusKnotGeometry)

## Usage

```vue
<TorusKnot :args="[0.6, 0.2, 64, 8]" color="lime" />

// TorusKnot with a custom material transformations
<TorusKnot ref="torusKnotRef" :args="[0.6, 0.2, 64, 8]" :position="[-2, 6, 2]">
  <TresMeshToonMaterial color="lime" />
</TorusKnot>
```
