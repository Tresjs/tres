# あなたの最初のシーン

Tresで最初のシーンを作成するのガイドとなります。 🍩

<ClientOnly>
<div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
  <DonutExample />
</div>
</ClientOnly>

## キャンバスをセットアップする

シーンを作成する前に、それを表示する場所が必要です。[Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)を使用する場合は、HTML`canvas` 要素を作成する必要があります。 `WebglRenderer`をマウントし、`scene`を初期化します。

**TresJS**を使用する場合、標準の`<TresCanvas />`コンポーネントをインポートし、Vue コンポーネントのテンプレートに追加するだけで大丈夫です。

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>
<template>
  <TresCanvas window-size>
    <!-- シーンがここに入れます -->
  </TresCanvas>
</template>
```

::: warning
シーンに関連付けられたすべてのコンポーネントが <TresCanvas /> コンポーネント内にあることが重要です。 そうしないとレンダリングされません。
:::

TresCanvasコンポーネントは、バックグラウンドでいくつかの構成を実行します。

すべてのフレームで自動的に更新される [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer)を作成します。
ブラウザのリフレッシュ レートに基づいてすべてのフレームを呼び出すようにレンダリング ループを設定します。

## キャンバスサイズ

デフォルトでは、`TresCanvas`コンポーネントは**親要素の幅と高さ**を受け取ります。 空白のページが表示された場合は、親要素のサイズが適切であることを確認してください。

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>
<template>
  <TresCanvas>
    <!-- シーンがここに入れます -->
  </TresCanvas>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
```

シーンがUIの一部でない場合は、次のように`window-size`プロパティを使用してウィンドウの全幅と高さを使用することもできます。

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>
<template>
  <TresCanvas window-size>
    <!-- シーンがここに入れます -->
  </TresCanvas>
</template>
```

## シーンを作成する

3Dエクスペリエンスを作成するには、基本的に4つの要素が必要です。

- カメラとオブジェクトを一緒に保持する [**シーン**](https://threejs.org/docs/index.html?q=scene#api/de/scenes/Scene)。
- DOMでシーンをレンダリングする [**レンダラー**](https://threejs.org/docs/index.html?q=renderer#api/de/renderers/WebGLRenderer)。
- [**カメラ**](https://threejs.org/docs/index.html?q=camera#api/de/cameras/Camera)
- [**オブジェクト**](https://threejs.org/docs/index.html?q=object#api/de/core/Object3D)

TresJSを使用すると、`<TresCanvas/>`コンポーネントをVueコンポーネントのテンプレートに追加するだけで、自動的に`renderer`(DOM `canvas` 要素)とシーンが作成されます。

```vue
<template>
  <TresCanvas window-size>
    <!-- シーンがここに入れます -->
  </TresCanvas>
</template>
```

次に、`<TresPerspectiveCamera />` コンポーネントを使用して[**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/de/cameras/PerspectiveCamera)を追加できます。

::: warning
よくある問題は、カメラのデフォルトの位置がシーンの原点(0,0,0)であることです。 位置プロパティが定義されていない場合、TresJS はカメラの位置を[3,3,3]に自動的に設定します。 シーンにカメラが定義されていない場合は、パースペクティブ カメラが自動的に追加されます。
:::

## 🍩を追加する

現状ただ空のシーンですので、基本オブジェクトを追加していきましょう。
Three.jsを使用した場合、まず[**メッシュオブジェクト**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh)を作成してから[**マテリアル**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material)や[**ジオメトリー**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry)が次にように追加する必要があります。

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32);
const material = new THREE.MeshBasicMaterial({ color: "orange" });
const donut = new THREE.Mesh(geometry, material);
scene.add(donut);
```

**メッシュ** はthree.jsの基本的なシーンオブジェクトであり、3D空間で形状を表現するために必要なジオメトリとマテリアルを保持するために使用されます。

次に、**TresJS**を使用して同じことを簡単に実現する方法を見てみましょう。 これを行うには、コンポーネント`<TresMesh/>`を使用し、標準スロットの間に`<TresTorusGeomety />`と`<TresMeshBasicmaterial />`を追加します。

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
  </TresCanvas>
</template>
```

::: info
**TresJS**は、Tresプレフィックス**を持つCamelCaseで使用する Threeオブジェクトに基づいて**Vueコンポーネントを自動的に生成するため、何もインポートする必要がないことに注意してください。 たとえば、「AmbientLight」を使用したい場合は、「TresAmbientLight」コンポーネントを使用します。
:::

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
</script>
<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

ここから、シーンにオブジェクトを追加したり、コンポーネントのプロパティを編集したり、コンポーネントがシーンにどのような影響を与えるかを試したりできます。

<SandboxDemo url="https://play.tresjs.org/#eNqVVMtu2kAU/ZWRu8iiYIcQoojSikCjqlXTRi27OIuJfYGBeWlmzKOIf+8d2zhD2kZU8oI5955z3+yiiQF7o3W8KiDqRwObGaYdseAKTTiVs/dp5GwafUglE1oZR3bEU8ZUrqglezI1SpCzoUNsYZNMGTh7l8pBUgkhDR8OhObUAb4IGQT0jAM17UxxZTDOm+uLj6NxL43ImslcrduW/ao4NesejNWQObaCMRVgaGUjpK+VZY4piSoP3Rbx32MaNeapWqHlEqUbiCu1bFPnCect4r+GkIQx78DO63eNTJQp7CdQApzZkj41M+tVOigR91qkc4XBL1Cs0QmURtSy7A5bYRjl5FC4MthoCBiD5EXoUuBGPDGQ7iubzR3pM+lAYtVbFOg03IpZtReBQRL0PmpF1Qzbgup4YZXEie88K60NOOg+KRGPhUP1hjSaO6dtP0myXCI/B85WJpbgEqlFEroPu3EvPk9yZl3iYfROo9Yfwr4cVQY9VbtioPxVKF/Dx1HcGuhSU3lK7o3v8DI+jzu18gGMBfOcUHtu4CRd7zdExd415vsWrAjbgDdXWDi5v4H7sIO7hop4J7CJxXF3az87pwby/xCuCK9Jo2M7B8FOED24+uIv46uEs6dQ0ivuU7nHnXQ2U3LKZi82MlNCMw7mu/aHfbyZlHO1/lJizhTQ5JfNIVv+BV/YTZXyPS4LmBW2+3mUeMDgKvPtz2+wwd+NUai84PVw/mH8AVbxwudYuY0KmWPagV+Z7efywJicTeztprzcuqijRN1WQ4k+HP46ml2rgMeycaV/OY7xK116rqwbd5uG738DogXwDg==" />
