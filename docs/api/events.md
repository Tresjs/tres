# Events

**TresJS** components emit pointer events when they are interacted with. This is the case for the components that represent three.js classes that derive from [THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) (like meshes, groups,...).

<StackBlitzEmbed project-id="tresjs-events" />

## Pointer Events

```html
<TresMesh
  @click="(intersection, pointerEvent) => console.log('click', intersection, pointerEvent)"
  @pointer-move="(intersection, pointerEvent) => console.log('pointer-move', intersection, pointerEvent)"
  @pointer-enter="(intersection, pointerEvent) => console.log('pointer-enter', intersection, pointerEvent)"
  @pointer-leave="(intersection, pointerEvent) => console.log('pointer-leave', pointerEvent)"
/>
```

| Event         | fires when ...                                                                        | Event Handler Parameter Type(s)                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | ... the events pointerdown and pointerup fired on the same object one after the other | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-move  | ... the pointer is moving above the object                                            | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-enter | ... the pointer is entering the object                                                | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-leave | ... the pointer is leaves the object                                                  | [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)                                                                                                                         |

The returned [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16) includes the [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) that triggered the event. You can access it via `intersection.object`.

By default, objects positioned in front of others with event handlers do not prevent those events from being triggered. This behavior can be achieved by using the prop `blocks-pointer-events`.
