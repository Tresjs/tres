# Anillo <Badge type="warning" text="^1.6.0" />

![](/cientos/ring.png)

El paquete `cientos` provee un `<Ring />` componente que funciona como un atajo para un `RingGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [
  innerRadius: number,
  outerRadius: number,
  thetaSegments: number,
  phiSegments: number,
  thetaStart: number,
  thetaLength: number
]
```

Referenciae: [RingGeometry](https://threejs.org/docs/?q=ring#api/en/geometries/RingGeometry)

## Utilización

```html
<Ring :args="[0.5, 1, 32]" color="purple" />

// Anillo con transformaciones materiales a medida
<Ring ref="ringRef" :args="[0.5, 1, 32]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="purple" />
</Ring>
```
