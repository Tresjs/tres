# Plano <Badge type="warning" text="^1.5.0" />

![](/cientos/plane.png)

El paquete `cientos` provee un `<Plane />` componente que funciona como un atajo para un `PlaneGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [width: number, height: number, widthSegments: number, heightSegments: number]
```

Referencia: [PlaneGeometry](https://threejs.org/docs/?q=plane#api/en/geometries/PlaneGeometry)

::: info
Un rotación convieniente por defecto se aplica al _eje x_ del plano (`-Math.PI / 2`), para que se mira arriba (a lado del eje y).
:::

## Utilización

```html
<Plane :args="[1, 1]" color="teal" />

// Plano con transformaciones materiales a medida
<Plane ref="planeRef" :args="[8, 8]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="teal" />
</Plane>
```
