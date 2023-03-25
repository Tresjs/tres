# Dodecaedro <Badge type="warning" text="^1.6.0" />

![](/cientos/dodecahedron.png)

El paquete `cientos` provee un `<Dodecahedron />` componente que funciona como un atajo para un `DodecahedronGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [radius: number, detail: number]
```

Referencia: [DodecahedronGeometry](https://threejs.org/docs/?q=dode#api/en/geometries/DodecahedronGeometry)

## Utilización

```html
<Dodecahedron :args="[1, 0]" color="deeppink" />

// Dodecaedro con transformaciones materiales a medida
<Dodecahedron ref="dodecahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="deeppink" />
</Dodecahedron>
```
