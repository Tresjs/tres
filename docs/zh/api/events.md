# 事件

**TresJS** 组件在交互时会触发鼠标事件。适用于继承自[THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) 的three.js类的组件（例如网格、组等）。

<StackBlitzEmbed project-id="tresjs-events" />

## 鼠标事件

```html
<TresMesh
  @click="(intersection, pointerEvent) => console.log('单击', intersection, pointerEvent)"
  @pointer-move="(intersection, pointerEvent) => console.log('移动', intersection, pointerEvent)"
  @pointer-enter="(intersection, pointerEvent) => console.log('移入', intersection, pointerEvent)"
  @pointer-leave="(intersection, pointerEvent) => console.log('移出', pointerEvent)"
/>
```

| 事件         | 触发时 ...                                                                        | 事件参数类型                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | ... 在同一对象上依次触发的 `pointerdown` 和 `pointerup` 事件 | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-move  | ... 鼠标在对象上方移动                                            | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-enter | ... 鼠标移入对象                                                | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-leave | ... 鼠标移出对象                                                  | [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)                                                                                                                         |

返回的 [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16) 包括触发事件的[Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) 。您可以通过`intersection.object` 访问它。

默认情况下，不会阻止事件冒泡。可以通过使用`blocks-pointer-events` 属性来实现此行为。
