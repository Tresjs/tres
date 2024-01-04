# Events

**TresJS** components emit pointer events when they are interacted with. This is the case for the components that represent three.js classes that derive from [THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) (like meshes, groups,...).

<SandboxDemo url="https://play.tresjs.org/#eNqdVm1v2joU/itWdiXWXUhgXacp6q5Yud20ad2qlW+l0kw4gItjW7ZDoVX/+47tBBJEWTdBX3LOc57zbuchGmowH5SKlwVEaXRqMs2UJQZsoQinYvZ+FFkziv4bCZYrqS15IM5kQMWSGvJIplrmpNW3KLs1SSY1tGrQM2pYdjWnE3l3QVWbXP34dDaQXOorRTNok29yKAWgSjEx27DZuQZHUyP6rsfMDqSwWvI9bhkIK403yaQwlsw4eU8eRoKQjAPV3mdKWi9ed92n1XYa4+MyKbG6AC+hXM1pSqaUmyAIEIxvuFaQ7qbjELKwqsDIqpzS3RwdyG6TTJs5o/rRRT0tRGaZFESKAWfZ4iUsj0L8bEq2D4TAMpbjW8hsnFMLmlEeZ85ZjC172XrR7b7DT+vIgZF4l/tSMoFW5+7X37oYDD5+7B7/zsVXoEt40kXy6rduYOo+rSPyKjns6UIecOSmQXKIuZw5cZ3pNAnDjqONDxZyxTEOfCLkdDvigeaOCex5x7B7CIJlZ4wiXI4ZH0VO5O1Ky0vQRmFibAkDmoOmQUdIqqRhLno0vO712iT83AQKj+BSLjrUOkC3Tdx3o00qH81lcOJSUSWB4U2lRo4VYYJcd17HJ54L/yJbSbMPvz6IL9O7ADPfilwtgvH9PuM6MF3AGnE//3m4XrXJuk3ubx5/7kDqFapATUg/cwuC+nJVdrQqTEUHTwRwUTWH/gkwnhFLqIP9+D4BznHg6lg3gHVorV5lxc7k6hPIHKxek5TqmfH9x9bjF7PbdHanyEMpxUW5GzjJuBtoVy7GjtVpUhltu5s0ZnqfwNn8z7QbVSko/8pmc0tSl5TALrhe9Wp+PPxDPnaH7UFoCCbsDwoafqN2FA71Tk5VfGukwGvHL+uoVOBtk1brO4rqN4tTjKK5tcqkSZJNBNpPgLOljgXYRKg8qcP7x/FJ3E0mzNjEiRE9ivx53CAOd8efcAcLpH9bpy/FTS/2DuhCUfGc2DfY/pu4G/dK5koY58zZ1LndNfkcXofrI+PJO4z3XzB5vQx48RcGnl3fGrzf6/oC40EIqzhvVrfE4QWqYfIHxMHgEDUCOxPI2TNIK6hL/k38NuFsXKesbgOcSWvwppiy2c5EZjJXjIP+rtyGNCeTci7vvnjZ5gXC28whW+yR35pVCPkShwW0OzO2rcRDAWxQn199gxX+v1HmclLwsjlPKH8A3nKFizHAzgoxwbBrOB/tZ79g+NoxNOcrv7llUo1ALb7reOl1dZRsZi0IbnzhPN63Y3CgStvMjuPjTcEffwHRXGJ4" />

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
