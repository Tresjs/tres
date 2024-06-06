# インスタンス

**Trees**の中心となるアイデアは、3つのJS要素すべての自動生成されたカタログです。このカタログはThreeJSソース コードから生成されているため、常に最新です。

ThreeJSを使用する場合は、使用する要素をインポートする必要があります。たとえば、`PerspectiveCamera`を使用したい場合は、`three`パッケージからインポートする必要があります。

```js
import { PerspectiveCamera } from "three";

const camera = new PerspectiveCamera(45, width / height, 1, 1000);
```

**Tres**を使用すると、何もインポートする必要はありません。**Tres**は、キャメルケースで使用したい3つのオブジェクトに基づいて、Tresプレフィックス**を付けて**Vueコンポーネントを自動的に生成するためです。たとえば、`PerspectiveCamera`を使用したい場合は、`<TresPerspectiveCamera />`コンポーネントを使用します。

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- シーンはここに -->
  </TresCanvas>
</template>
```

つまり、プレーンなThreeJSを使用する場合と同じ[ドキュメント](https://threejs.org/docs/)を、Vueの機能を利用して使用できることを意味します。

## オブジェクトの宣言

この議論に従うと、次のようにインスタンスをレイアウトできるはずです。 ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="new THREE.Vector3(1, 2, 3)" />
    <!-- シーンはここに -->
  </TresCanvas>
</template>
```

しかし、**Tres**ではこれは必要ありません。次のように宣言的にプロパティを定義できます。 ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="[1, 2, 3]" />
    <!-- シーンはここに -->
  </TresCanvas>
</template>
```

## 引数

一部のThreeJSオブジェクトには引数があります。たとえば、`PerspectiveCamera`コンストラクターには次の引数があります。

- `fov` - カメラの錐台の垂直視野
- `aspect` - カメラの錐台のアスペクト比
- `near` - 平面近くのカメラ錐台
- `far` - カメラ錐台の遠方平面

これらの引数を`TresPerspectiveCamera`コンポーネントに渡すには、`args`プロパティを使用できます。

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <!-- シーンはここに -->
  </TresCanvas>
</template>
```

これを行うと同じです:

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
```

## Props (プロパティーズ)

プロパティをコンポーネントに渡すこともできます。たとえば、`TresAmbientLight`には`intensity`プロパティがあるため、次のようにコンポーネントに渡すことができます。

```html
<TresAmbientLight :intensity="0.5" />
```

### Set

基礎となるオブジェクトに`.set()`メソッドがあるすべてのプロパティには、値を配列として受け取るためのショートカットがあります。たとえば、「TresPerspectiveCamera」には「Vector3」オブジェクトである「position」プロパティがあるため、次のようにコンポーネントに渡すことができます。

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

位置、回転、スケールなどの変換プロパティを指定するには、プロップ内で設定する軸を直接指定できる省略表現を使用できます。同様の省略表現がcolorプロパティにも使用できます。

<!-- vueが壊れているようで、ネストされたコンポーネントに色が付けられないため、色の構文をvue からhtmlに変更しました。 -->

```html
<TresMesh :position-x="1" :scale-y="2" :rotation-x="Math.PI * 2">
  <TresMeshBasicMaterial :color-r="0.7" :color-b="0.3" />
</TresMesh>
```

::: warning
[three.js](https://threejs.org/docs/index.html#api/en/math/Euler)で回転プロパティを設定すると、デフォルトで「XYZ」順序が使用されます。速記法を使用して回転プロパティを設定する場合、角度を設定する順序が重要であることに注意することが重要です。詳細については、[オイラー角](https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%A4%E3%83%A9%E3%83%BC%E8%A7%92)を参照してください。
:::

```vue
<TresMesh :rotation-x="1" :rotation-y="2" :rotation-z="Math.PI * 2" />

<TresMesh :rotation-z="Math.PI * 2" :rotation-x="1" :rotation-y="2" />

<!-- 回転プロパティの順序は重要であり、順序を入れ替えると異なる結果が生じる可能性があることに注意してください。 -->
```

### スカラー

使用できる別のショートカットは、ベクターの残りの部分に同じ値を使用して、`Vector3`オブジェクトを予期するプロパティにスカラー値を渡すことです。

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### カラー

`color`プロパティを使用してコンポーネントに色を渡すことができます。プロパティは、色の名前またはhexの値を含む文字列を受け入れます。

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### メソッド

基礎となるプロパティの一部は実際にはメソッドであり、`TresPerspectiveCamera`には[Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt)から継承した`lookAt`メソッドがあるため、渡すことができます。コンポーネントへの座標は次のようになります。

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
