# Events

**TresJS** components emit pointer events when they are interacted with. This is the case for the components that represent three.js classes that derive from [THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) (like meshes, groups,...).

<StackBlitzEmbed project-id="tresjs-events" />

## Pointer Events

The following pointer events are available on `v3` and previous:

- `click`
- `pointer-move`
- `pointer-enter`
- `pointer-leave`

From `v4.x` on, the following pointer events are been added to the list:

- `context-menu` (right click)
- `double-click`
- `pointer-down`
- `pointer-up`
- `wheel`
- `pointer-missed`

```html
<TresMesh
  @click="(event) => console.log('click')"
  @context-menu="(event) => console.log('context-menu (right click)')"
  @double-click="(event) => console.log('double-click')"
  @pointer-move="(event) => console.log('pointer-move')"
  @pointer-enter="(event) => console.log('pointer-enter')"
  @pointer-leave="(event) => console.log('pointer-leave')"
  @pointer-down="(event) => console.log('pointer-down')"
  @pointer-up="(event) => console.log('pointer-up')"
  @wheel="(event) => console.log('wheel')"
  @pointer-missed="(event) => console.log('pointer-missed')"
/>
```

| <div style="width:160px">Event</div>            | fires when ...                                                                       | Event Handler Parameter Type(s)                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click            | the events pointerdown and pointerup fired on the same object one after the other    | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| contextMenu <Badge type="warning" text="4.0.0" />     | the user triggers a context menu, often by right-clicking                            | [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)                                                                                                                         |
| double-click <Badge type="warning" text="4.0.0" />      | the user clicks the mouse button twice in quick succession on the same object        | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| wheel <Badge type="warning" text="4.0.0" />              | the mouse wheel or similar device is rotated                                         | [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent)                                                                                                                             |
| pointer-down <Badge type="warning" text="4.0.0" />       | the pointer is pressed down over the object                                          | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-up <Badge type="warning" text="4.0.0" />        | the pointer is released over the object                                              | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-leave    | the pointer is leaves the object                                                     | [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)                                                                                                                         |
| pointer-move     | the pointer is moving above the object                                               | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-missed <Badge type="warning" text="4.0.0" />    | the pointer interaction is attempted but misses the object                           | [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)                                                                                                                         |

## Event Propagation (Bubbling 🫧) <Badge type="warning" text="^4.0.0" />

Propagation of events on 3D scenes works differently than in the DOM because objects can **occlude each other in 3D**. The `intersections` array contains all the objects that the raycaster intersects with, sorted by distance from the camera. The first object in the array is the closest one to the camera.

When an event is triggered, the event is propagated to the closest object in the `intersections` array. If the event is not handled by the object, it will be propagated to the next object in the array.

`event.stopPropagation()` can be used to stop the event from propagating to the next object in the array, stoping the event from bubbling up and reaching to farther objects (the oens behind the first one).

```html
<TresMesh
  @pointer-down="(event) => {
    console.log('pointer-down')
    event.stopPropagation()
  }"
/>
```
