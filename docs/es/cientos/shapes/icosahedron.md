# Icosaedro <Badge type="warning" text="^1.6.0" />

![](/cientos/icosahedron.png)

El paquete `cientos` provee un `<Icosahedron />` componente que funciona como un atajo para un `IcosahedronGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [radius: number, detail: number]
```

Referencia: [IcosahedronGeometry](https://threejs.org/docs/?q=ico#api/en/geometries/IcosahedronGeometry)

## Utilización

```html
<Icosahedron :args="[1, 0]" color="red" />

// Icosaedro con transformaciones materiales a medida
<Icosahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="red" />
</Icosahedron>
```
