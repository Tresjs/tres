# Eventi

**TresJS** componenti emettono eventi puntatore quando sono interagiti con. Questo è il caso dei componenti che rappresentano tre classi.js che derivano da [THREE.Object3D](https://threejs.org/docs/index.html"q=object#api/en/core/Object3D) (come mesh, gruppi,...).

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

| Evento        | viene attivata quando ...                                                            | Event Handler Parameter Type(s)                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | ... gli eventi pointerdown e pointerup sparato sullo stesso oggetto uno dopo l'altro | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-move  | ... il puntatore si muove sopra l'oggetto                                            | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-enter | ... il puntatore sta entrando nell'oggetto                                           | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-leave | ... il puntatore è lascia l'oggetto                                                  | [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)                                                                                                                         |

Il valore restituito [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16) include l'oggetto [Object3D](https://threejs.org/docs/index.html"q=api#api/en/Object3D) che ha attivato l'evento. È possibile accedervi tramite `intersection.object`.

Per impostazione predefinita, gli oggetti posizionati di fronte ad altri con gestori di eventi non impediscono l'attivazione di tali eventi. Questo comportamento può essere ottenuto usando il comando prop `blocks-pointer-events`.
