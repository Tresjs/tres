# Esfera <Badge type="warning" text="^1.6.0" />

![](/cientos/sphere.png)

El paquete `cientos` provee un `<Sphere />` componente que funciona como un atajo para un `CSphereGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [
  radius: number,
  widthSegments: number,
  heightSegments: number,
  phiStart: number,
  phiLength: number,
  thetaStart: number,
  thetaLength: number
]
```

Referencia: [SphereGeometry](https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry)

## Utilización

```html
<Sphere :args="[1, 1, 1]" color="pink" />

// ESfera con transformaciones materiales a medida
<Sphere ref="planeRef" :args="[1, 1, 1]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="pink" />
</Sphere>
```
