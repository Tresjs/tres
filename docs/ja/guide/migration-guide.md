# マイグレーションガイド

このガイドは、TresJSのv1から最新バージョンへの移行を支援することを目的としています。🤩✨.

::: code-group

```bash [pnpm]
pnpm update @tresjs/core
```

```bash [npm]
npm update @tresjs/core
```

```bash [yarn]
yarn upgrade @tresjs/core
```

:::

## 変わったこと

### Vueカスタムレンダラー

**TresJS**は[Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#creatorenderer) 🎉 になり、`WebGLRenderer`と`Scene`を使用して、シーンをレンダリングするための**新しいVueアプリインスタンス**を作成します。

### TypescriptのサポートとIntellisense 🦾

![TresJS Intellisense](/v2-intellisense.gif)

TresJSで最も**リクエストの多かった機能**でした。TresコンポーネントはVolarと連携して動作し、タイプ インテリセンスを提供するようになりました。

**TresJS**は、ThreeJSのカタログに基づいてすべてのコンポーネントのビルド時に型宣言を生成するようになりました。ThreeJSのすべてのコンポーネントを使用し、コンポーネントに対してタイプインテリセンスが提供されると意味します。

### Tresプラグインはオプションです 👍

`TresPlugin`はオプションになりました。`tresjs/core`からコンポーネントを直接インポートすることで、TresJSを使用せずにTresJSを使用できます。

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

::: info
パフォーマンスとバンドルサイズの理由から推奨されます。ツリーシェイキングがより適切に機能し、使用するコンポーネントのみをインポートします。
:::

### TresSceneは不要になりました

シーンが `<TresCanvas />` によって作成されるようになったため、`<TresScene />`コンポーネントは非推奨になりました。

当初は、冗長性の観点からシーンに別のコンポーネントを用意し、プレーンな ThreeJSと同様に保つのが良いアイデアだと考えていましたが、実際には役に立たないことがわかりました。

次のようなシーンを作成できるようになりました。

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

コードを移行するには、`<TresScene />`コンポーネントを削除し、子を`<TresCanvas />`コンポーネントに移動するだけです。

### `useCatalog`は非推奨になりました

`useCatalog`関数は現在非推奨です。`@tresjs/core`からカタログを直接インポートできるようになりました。詳細については、こちらをご覧ください: [拡張](/advanced/extending.md)

以下のようのコードを

```ts {2,5,7}
// 誤 ❌
import { useCatalog } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

const { extend } = useCatalog();

extend({ TextGeometry });
```

これに変更してください。

```ts {2,6}
// 正 ✅
import { extend } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

// エレメントをカタログに追加する
extend({ TextGeometry });
```

### モデルの`ref`値の`getModel`は非推奨になりました

`getModel`関数は現在非推奨です。`model`プロパティを直接使用できるようになりました。

以下のようのコードを

```vue {7,9-12}
// 誤 ❌
<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF(
  "/models/AkuAku.gltf",
  { draco: true },
);

const modelRef = ref();

watch(modelRef, ({ getModel }) => {
  const model = getModel();
  model.position.set(0, 0, 0);
});
</script>
<template>
  <primitive :object="nodes.MyModel" />
</template>
```

これに変更してください。

```vue {7,9-12}
// 正 ✅
<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF(
  "/models/AkuAku.gltf",
  { draco: true },
);

const modelRef = ref();

watch(modelRef, (model) => {
  // モデルを使って何かをする
  model.position.set(0, 0, 0);
});
</script>
<template>
  <primitive :object="nodes.MyModel" />
</template>
```

### カメラはコントロールの前にある必要があります 🎥

`TresOrbitControls`コンポーネントはツリー内のカメラの後にある必要があります。コントロールが機能するためにカメラを認識する必要があるためです。

以下のようのコードを

```vue {3,5}
// 誤 ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

これに変更してください。

```vue {3,5}
// 正 ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```

## UseTresはuseTresContextになりました <Badge type="warning" text="^3.0.0" />

v3では、プラグイン作成者やエコシステムパッケージがより柔軟で使いやすいように、状態ロジック全体を作り直しました。v2のようなストアを使用する代わりに、`provide/inject`に基づくコンテキスト プロバイダーを使用するようになりました。

`useTres`関数は、デモや実験の中断を避けるために`useTresContext`関数のエイリアスになりましたが、今後は`useTresContext`の使用を検討してください。

大きなリアクティブオブジェクトの代わりに、他のプロパティ間の`scene`参照と`renderer`参照を直接取得できるようになります。

以下のようのコードを

```ts {2}
// 誤 ❌
import { useTres } from "@tresjs/core";

const { state, setState } = useTres();

console.log(state.scene);
```

これに変更してください。

```ts {2}
// 正 ✅
import { useTresContext } from "@tresjs/core";

const { scene, renderer } = useTresContext();

console.log(scene.value);
```

新しいコンテキストプロバイダーシステムの詳細については、[API DOCS](/api/composables.md)セクションを参照してください。
