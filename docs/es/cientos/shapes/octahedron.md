# Octaedro <Badge type="warning" text="^1.6.0" />

![](/cientos/octahedron.png)

El paquete `cientos` provee un `<Octahedron />` componente que funciona como un atajo para un `OctahedronGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [radius: number, detail: number]
```

Referencia: [OctahedronGeometry](https://threejs.org/docs/?q=octa#api/en/geometries/OctahedronGeometry)

## Utilización

```html
<Octahedron :args="[1, 0]" color="red" />

// Octaedro con transformaciones materiales a medida
<Octahedron ref="icosahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="red" />
</Octahedron>
```
