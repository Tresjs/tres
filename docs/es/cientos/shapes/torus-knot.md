# TorusKnot <Badge type="warning" text="^1.6.0" />

![](/cientos/torus-knot.png)

El paquete `cientos` provee un `<TorusKnot />` componente que funciona como un atajo para un `TorusKnotGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

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

Referencia: [TorusKnotGeometry](https://threejs.org/docs/?q=torus#api/en/geometries/TorusKnotGeometry)

## Utilización

```html
<TorusKnot :args="[0.6, 0.2, 64, 8]" color="lime" />

// TorusKnot con transformaciones materiales a medida
<TorusKnot ref="torusKnotRef" :args="[0.6, 0.2, 64, 8]" :position="[-2, 6, 2]">
  <TresMeshToonMaterial color="lime" />
</TorusKnot>
```
