# Events

**TresJS**-Komponenten lösen Mouse-Events aus, wenn mit ihnen interagiert wird. Dies gilt für Komponenten, die von [THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) abgeleitet sind (wie Meshes, Groups, ...).

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

| Ereignis      | wird ausgelöst, wenn ...                                                         | Typ(en) des Eventhandler-Parameters                                                                                                                                |
| ------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | ... die Ereignisse pointerdown und pointerup nacheinander auf demselben Objekt ausgelöst werden | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/de/docs/Web/API/PointerEvent) |
| pointer-move  | ... der Zeiger sich über dem Objekt bewegt                                         | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/de/docs/Web/API/PointerEvent) |
| pointer-enter | ... der Zeiger in das Objekt eintritt                                              | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/de/docs/Web/API/PointerEvent) |
| pointer-leave | ... der Zeiger das Objekt verlässt                                                 | [PointerEvent](https://developer.mozilla.org/de/docs/Web/API/PointerEvent)                                                                                          |

Die zurückgegebene [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16) beinhaltet das [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D), das das Ereignis ausgelöst hat. Du kannst darauf über `intersection.object` zugreifen.

Standardmäßig verhindern Objekte, die vor anderen mit Event-Handlern positioniert sind, nicht, dass diese Ereignisse ausgelöst werden. Dieses Verhalten kann mit der Eigenschaft `blocks-pointer-events` erreicht werden.
