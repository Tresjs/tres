# Cono <Badge type="warning" text="^1.6.0" />

![](/cientos/cone.png)

El paquete `cientos` provee un `<Cone />` componente que funciona como un atajo para un `ConeGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [
  radius: number,
  height: number,
  radialSegments: number,
  heightSegments: number,
  openEnded: boolean,
  thetaStart: number,
  thetaLength: number
]
```

Referencia: [ConeGeometry](https://threejs.org/docs/?q=cone#api/en/geometries/ConeGeometry)

## Utilización

```html
<Cone :args="[1, 1, 8]" color="orange" />

// Cono con transformaciones materiales a medida
<Cone ref="coneRef" :args="[1, 1, 8]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Cone>
```
