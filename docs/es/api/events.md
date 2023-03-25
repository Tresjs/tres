# Eventos <Badge type="warning" text="^1.6.0" />

Mesh objetos de **TresJS**  emiten pointer eventos cuando  se interactuó con ellos, usando `raycaster` y `pointer` objetos fuera de vista.

<StackBlitzEmbed project-id="tresjs-events" />

## Pointer Eventos

```html
<TresMesh
  @click="(ev) => console.log('click', ev)"
  @pointer-move="(ev) => console.log('click', ev)"
  @pointer-enter="(ev) => console.log('click', ev)"
  @pointer-leave="(ev) => console.log('click', ev)"
/>
```

## Datos de Eventos

El dato del evento es un objeto `TresEvent` que se contiene las propiedades siguiente:

```ts
;({
  object: Object3D, // El mesh objeto que emite el evento
  distance: number, // LA distancia entre la cámara y el mesh
  point: Vector3, // El punto de intersección entre el ray y el mesh
  uv: Vector2, // Los coordinados uv del punto de intersección
  face: Face3, // La cara del mesh que se intersecó.
  faceIndex: number, // El índice de la cara que se intersecó
})
```
