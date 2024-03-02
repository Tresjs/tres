# WIP
<!-- # Events

**TresJS** los componentes emiten eventos de puntero cuando se interactúa con ellos. Esto es válido para los componentes que representan clases de three.js que derivan de [THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) (como mallas, grupos, ...).

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

| Event         | se dispara cuando ...                                                                 | Tipo(s) de parámetro del controlador de eventos                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | ... los eventos pointerdown y pointerup se disparan en el mismo objeto uno tras otro | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-move  | ... el puntero se mueve sobre el objeto                                               | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-enter | ... el puntero entra en el objeto                                                     | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent) |
| pointer-leave | ... el puntero sale del objeto                                                        | [PointerEvent](https://developer.mozilla.org/es/docs/Web/API/PointerEvent)                                                                                                                         |

La [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16) devuelta incluye el [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) que desencadenó el evento. Puedes acceder a él a través de `intersection.object`.

De forma predeterminada, los objetos posicionados delante de otros con controladores de eventos no evitan que se disparen esos eventos. Este comportamiento se puede lograr utilizando la propiedad `blocks-pointer-events`. -->
