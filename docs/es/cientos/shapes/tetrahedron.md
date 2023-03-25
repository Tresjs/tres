# Tetraedro <Badge type="warning" text="^1.6.0" />

![](/cientos/tetrahedron.png)

El paquete `cientos` provee un `<Tetrahedron />` componente que funciona como un atajo para un `TetrahedronGeometry` y un `MeshBasicMaterial` con un `Mesh` objeto.

```typescript
args: [radius: number, detail: number]
```

Referencia: [TetrahedronGeometry](https://threejs.org/docs/?q=tetr#api/en/geometries/TetrahedronGeometry)

## Utilización

```html
<Tetrahedron :args="[1, 0]" color="yellow" />

// Tetraedro con transformaciones materiales a medida
<Tetrahedron ref="tetrahedronRef" :args="[1, 0]" :position="[2, 4, 0]">
  <TresMeshToonMaterial color="yellow" />
</Tetrahedron>
```
