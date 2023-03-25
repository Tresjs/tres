# Caja <Badge type="warning" text="^1.6.0" />

![](/cientos/box.png)

El paquete `cientos` provee un `<Box />` componente que funciona como un atajo para un `BoxGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [
  width: number,
  height: number,
  depth: number,
  widthSegments: number,
  heightSegments: number,
  depthSegments: number
]
```

Referencia: [BoxGeometry](https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry)

## Utilización

```html
<Box :args="[1, 1, 1]" color="orange" />

// Caja con transformaciones materiales a medida
<Box ref="boxRef" :args="[1, 1, 1]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Box>
```
