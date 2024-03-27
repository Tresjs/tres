# Events

**TresJS** componenten zenden pointer events uit wanneer er interactie mee is. Dit is het geval voor de componenten die three.js-klassen vertegenwoordigen die zijn afgeleid van [THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) (zoals netten, groepen,...).

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

| Event         | wordt afgevuurd, wanneer ...                                                          | Event Handler Parameter Type(s)                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | ... de events pointerdown and pointerup vuurt op hetzelfde object de een na de ander | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-move  | ... de pointer hangt boven het object                                            | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-enter | ... de pointer gaat het object in                                                | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-leave | ... de pointer is uit het object aan het gaan                                                  | [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/pointerEvent)                                                                                                                         |

De returned [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16) bevat de [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) die het event triggerde. Je kan het benaderen via `intersection.object`.

Standaard voorkomen objecten die vóór anderen zijn geplaatst met event handlers niet dat deze gebeurtenissen worden geactiveerd. Dit gedrag kan worden bereikt door de prop `blocks-pointer-events` te gebruiken.
