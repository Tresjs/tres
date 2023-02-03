# Events <Badge type="warning" text="^1.6.0" />

**TresJS** Mesh objects emit pointer events when they are interacted with using `raycaster` and `pointer` objects under the hood.

<StackBlitzEmbed project-id="tresjs-events" />

## Pointer Events

```html
<TresMesh
  @click="(ev) => console.log('click', ev)"
  @pointer-move="(ev) => console.log('click', ev)"
  @pointer-enter="(ev) => console.log('click', ev)"
  @pointer-leave="(ev) => console.log('click', ev)"
/>
```

## Event Data

The event data is a `TresEvent` object that contains the following properties:

```ts
;({
  object: Object3D, // The mesh object that emitted the event
  distance: number, // The distance between the camera and the mesh
  point: Vector3, // The intersection point between the ray and the mesh
  uv: Vector2, // The uv coordinates of the intersection point
  face: Face3, // The face of the mesh that was intersected
  faceIndex: number, // The index of the face that was intersected
})
```
