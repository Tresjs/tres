# Events

Komponenty **TresJS** emitują zdarzenia wskaźnika podczas interakcji z nimi. Dotyczy to komponentów reprezentujących klasy three.js, które dziedziczą po [THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) (takich jak meshy, grupy,...).

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

| Zdarzenia     | Wywoływane, gdy... cuando ...                                                             | Typ(y) parametru obsługi zdarzeń                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | ... zdarzenia pointerdown i pointerup są wywoływane na tym samym obiekcie jeden po drugim | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-move  | .... wskaźnik porusza się po obiekcie                                                     | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-enter | ... wskaźnik wchodzi do obiektu objeto                                                    | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-leave | ... wskaźnik opuszcza obiekt objeto                                                       | [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent)                                                                                                                         |

[Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16) którą zwraca, obejmuje [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) który wywołał zdarzenie. Możesz uzyskać do niego dostęp za pomocą `intersection.object`.

Domyślnie obiekty umieszczone przed innymi z obsługą zdarzeń nie powodują zapobiegania wywołaniu tych zdarzeń. To zachowanie można osiągnąć, używając właściwości `blocks-pointer-events`.
