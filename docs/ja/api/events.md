# イベント

**TresJS**コンポーネントは、操作時にポインターイベントを生成します。[THREE.Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)から派生したthree.jsクラスを表すコンポーネントの場合に当てはまります (例: メッシュ、グループなど)。

<StackBlitzEmbed project-id="tresjs-events" />

## ポインタイベント

```html
<TresMesh
  @click="(intersection, pointerEvent) => console.log('click', intersection, pointerEvent)"
  @pointer-move="(intersection, pointerEvent) => console.log('pointer-move', intersection, pointerEvent)"
  @pointer-enter="(intersection, pointerEvent) => console.log('pointer-enter', intersection, pointerEvent)"
  @pointer-leave="(intersection, pointerEvent) => console.log('pointer-leave', pointerEvent)"
/>
```

| イベント      | 実行条件 ...                                                             | イベント ハンドラ パラメータのタイプ                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| click         | 同じオブジェクトに対してイベントpointerdownとpointerupが次々に起動される | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-move  | ポインタがオブジェクトの上を移動している                                 | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-enter | ポインタがオブジェクトに入っています                                     | [Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16), [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) |
| pointer-leave | ポインタがオブジェクトから離れます                                       | [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)                                                                                                                         |

返された[Intersection](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/three/src/core/Raycaster.d.ts#L16)には、[Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)がイベントをトリガーしたものです。「intersection.object」経由でアクセスできます。

デフォルトでは、イベントハンドラーを使用して他のオブジェクトの前に配置されたオブジェクトは、イベントのトリガーを妨げません。この動作は、プロップ`blocks-pointer-events`を使用することで実現できます。
