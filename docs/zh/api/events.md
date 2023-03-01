# 事件 <Badge type="warning" text="^1.6.0" /> {#Events}

**TresJS** 中的网格对象与 `raycaster` 或者 `pointer` 交互时会触发鼠标事件

<StackBlitzEmbed project-id="tresjs-events" />

## 鼠标事件 {#Pointer Events}

```html
<TresMesh
  @click="(ev) => console.log('click', ev)"
  @pointer-move="(ev) => console.log('click', ev)"
  @pointer-enter="(ev) => console.log('click', ev)"
  @pointer-leave="(ev) => console.log('click', ev)"
/>
```

## 事件数据 {#Event Data}

事件数据是 `TresEvent` 对象，它包括的属性如下:

```ts
({
  object: Object3D, // The mesh object that emitted the event
  distance: number, // The distance between the camera and the mesh
  point: Vector3, // The intersection point between the ray and the mesh
  uv: Vector2, // The uv coordinates of the intersection point
  face: Face3, // The face of the mesh that was intersected
  faceIndex: number, // The index of the face that was intersected
});
```
