# Toro <Badge type="warning" text="^1.6.0" />

![](/cientos/torus.png)

El paquete `cientos` provee un `<Torus />` componente que funciona como un atajo para un `TorusGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [
  radius: number,
  tube: number,
  radialSegments: number,
  tubularSegments: number,
  arc: number
]
```

Referencia: [TorusGeometry](https://threejs.org/docs/?q=torus#api/en/geometries/TorusGeometry)

## Utilización

```html
<Torus :args="[2, 0.4, 42, 100]" color="cyan" />

// Toro Cono con transformaciones materiales a medida
<Torus ref="torusRef" :args="[0.75, 0.4, 16, 80]" :position="[-2, 6, 0]">
  <TresMeshToonMaterial color="cyan" />
</Torus>
```
