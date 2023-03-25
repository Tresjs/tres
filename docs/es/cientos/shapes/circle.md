# Circulo <Badge type="warning" text="^1.6.0" />

![](/cientos/circle.png)

El paquete `cientos` provee un `<Circle />` componente que funciona como un atajo para un `CircleGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [radius: number, segments: number, thetaStart: number, thetaLength: number]
```

Referencia: [CircleGeometry](https://threejs.org/docs/?q=circle#api/en/geometries/CircleGeometry)

## Utilización

```html
<Circle :args="[1, 32]" color="lightsalmon" />

// Circulo con transformaciones materiales a medida
<Circle ref="circleRef" :args="[1, 32]" :position="[0, 0, 0]">
  <TresMeshToonMaterial color="lightsalmon" />
</Circle>
```
