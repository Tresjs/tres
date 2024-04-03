# Évenements

Les composants **TresJS** émettent des événements de pointeur lorsqu'ils interagissent avec eux. Cela est vrai pour les composants qui représentent les classes three.js dérivées de [THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) (comme les mailles, les groupes, ...).

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

| Event         | se produit quand ...                                                                             | Type(s) de paramètre(s) du gestionnaire d'événements                                                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | ... les événements pointerdown et pointerup sont déclenchés sur le même objet l'un après l'autre | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-move  | ... le pointeur se déplace sur l'objet                                                           | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-enter | ... le pointeur entre dans l'objet                                                               | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-leave | ... le pointeur quitte l'objet                                                                   | [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent)                                                                                                                         |

L'[Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16) renvoyée inclut le [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) qui a déclenché l'événement. Vous pouvez y accéder via `intersection.object`.

Par défaut, les objets positionnés devant les autres avec des gestionnaires d'événements n'empêchent pas le déclenchement de ces événements. Ce comportement peut être obtenu en utilisant la propriété `blocks-pointer-events`.
