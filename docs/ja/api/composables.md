# コンポーザブル

Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api)を使用すると、コンポーネント間で共有できる再利用可能なロジックを作成できます。 また、コンポーネントで使用できるカスタムフックを作成することもできます。

**TresJS**は、このAPIを大いに活用して、アニメーションの作成やシーンとの対話などに使用できる一連の構成可能な関数を作成します。また、Vueコンポーネント(テクスチャ、ローダーなど)だけでは不可能な、より複雑なシーンを作成することもできます。

**TresJS**のコアはこれらのコンポーザブルを内部で使用するため、コアが使用するのと同じAPIを使用することになります。たとえば、内部レンダーループで更新する必要があるコンポーネントは、「useRenderLoop」コンポーザブルを使用して、レンダラーがシーンを更新するたびに呼び出されるコールバックを登録します。

## useRenderLoop

`useRenderLoop`コンポーザブルは**TresJS**アニメーションの中核です。ネイティブリフレッシュレートで呼び出されるコールバックを登録できます。これは**TresJS**で最も重要なコンポーザブルです。

```ts
const { onLoop, resume } = useRenderLoop();

onLoop(({ delta, elapsed, clock }) => {
  // 最大60FPSのフレームごとに実行されます (モニターによって異なります)
});
```

::: warning
このコンポーザブルの使用によるパフォーマンスへの影響に注意してください。フレームごとに実行されるため、コールバックに多くのロジックがある場合、アプリのパフォーマンスに影響を与える可能性があります。 特に、リアクティブ状態または参照を更新している場合はそうです。
:::

`onLoop`コールバックは、[THREEクロック](https://threejs.org/docs/?q=lock#api/en/core/Clock)に基づいて次のプロパティを持つオブジェクトを受け取ります。

- `delta`: 現在のフレームと最後のフレームの間のデルタ時間。最後のフレームからの秒単位の時間です。
- `elapsed`: レンダリングループの開始からの経過時間。

このコンポーザブルは、[vueuse](https://vueuse.org/core/useRafFn/)の`useRafFn` に基づいています。 [@wheatjs](https://github.com/wheatjs)の素晴らしい貢献に感謝します。

### レンダリングの前後

レンダラーがシーンを更新する前後に呼び出されるコールバックを登録することもできます。たとえばFPSを測定するためにプロファイラーを追加する場合に便利です。

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop();

onBeforeLoop(({ delta, elapsed }) => {
  // レンダラーがシーンを更新する前に実行します
  fps.begin();
});

onAfterLoop(({ delta, elapsed }) => {
  // レンダラーがシーンを更新した後に実行します
  fps.end();
});
```

### 一時停止と再開

公開されている`pause`および`resume`メソッドを使用して、レンダリングループを一時停止および再開できます。

```ts
const { pause, resume } = useRenderLoop();

// レンダリング ループを一時停止します
pause();

// レンダリング ループを再開する
resume();
```

また、`isActive`プロパティを使用してレンダー ループのアクティブ状態を取得することもできます。

```ts
const { resume, isActive } = useRenderLoop();

console.log(isActive); // false

resume();

console.log(isActive); // true
```

## useLoader

「useLoader」コンポーザブルを使用すると、[THREE.js ローダー](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models)を使用してアセットをロードできます。ロードされたアセットを含むPromiseを返します。

```ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const { scene } = await useLoader(THREE.GLTFLoader, "path/to/asset.gltf");
```

`useLoader`コンポーザブルはPromiseを返すため、`async/await`または`then/catch`とともに使用できます。コンポーネントで使用している場合は、必ず「Suspense」コンポーネントでラップしてください。詳細については、[サスペンス](https://vuejs.org/guide/built-ins/suspense.html#suspense)を参照してください。

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

`useTexture`コンポーザブルを使用すると、[THREE.jsテクスチャローダー](https://threejs.org/docs/#api/en/loaders/TextureLoader)を使用してテクスチャをロードできます。ロードされたテクスチャを含むPromiseを返します。

```ts
const texture = await useTexture(["path/to/texture.png"]);
```

**useTexture** は、次のプロパティを持つオブジェクトも受け入れます。

- `map`: オブジェクトの表面に適用される基本的なテクスチャ
- `displacementMap`: オブジェクトの表面に凹凸やくぼみを追加するために使用されるテクスチャ
- `normalMap`: オブジェクトに表面の詳細とシェーディングのバリエーションを追加するために使用されるテクスチャ
- `roughnessMap`: オブジェクトの表面に粗さまたはマット仕上げを追加するために使用されるテクスチャ
- `metalnessMap`: オブジェクトの表面にメタリックな効果を追加するために使用されるテクスチャ
- `aoMap`: アンビエントオクルージョン(他のオブジェクトによって光がブロックされている領域の陰影)をオブジェクトに追加するために使用されるテクスチャです。
- `alphaMap`: オブジェクトにアルファ(黒い部分を透明としてレンダリング) を追加するために使用されるテクスチャ。このマップを使用するにはマテリアルに`:trasparent="true"`を設定する必要があります
- `matcap`: このテクスチャはマテリアルの色とシェーディングをエンコードします。

その場合、ロードされたテクスチャを含むオブジェクトが返されます。

```ts
const {
  map,
  displacementMap,
  normalMap,
  roughnessMap,
  metalnessMap,
  aoMap,
  alphaMap,
  matcap,
} = await useTexture({
  map: "path/to/albedo.png",
  displacementMap: "path/to/height.png",
  normalMap: "path/to/normal.png",
  roughnessMap: "path/to/roughness.png",
  metalnessMap: "path/to/metalness.png",
  aoMap: "path/to/ambien-occlusion.png",
  alphaMap: "path/to/alpha.png",
  matcap: "path/to/matcap.png",
});
```

次に、テクスチャをマテリアルにバインドできます。

```vue
<template>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial
        :map="map"
        :displacement-map="displacementMap"
        :normal-map="normalMap"
        :roughness-map="roughnessMap"
        :metalness-map="metalnessMap"
        :ao-map="aoMap"
        :alpha-map="alphaMap"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

上記のコンポーザブルと同様に、「useTextureコンポーザブルはPromiseを返して、「async/awaitまたは「then/catchで使用できます。コンポーネントで使用している場合は、必ず「Suspenseコンポーネントでラップしてください。

## useSeek

「useSeekコンポーザブルは、複雑なThreeJSシーンとオブジェクトの子グラフを簡単に横断およびナビゲートするためのユーティリティを提供します。特定のプロパティに基づいて子オブジェクトを検索できるようにする4つの関数をエクスポートします。

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek();
```

シーク関数は3つのパラメータを受け入れます。

- `parent`: ThreeJSシーンまたはObject3D。
- `property`: 検索条件に使用するプロパティ。
- `value`: 照合するプロパティの値。

`seek`および`seekByName`関数はオブジェクトを走査し、指定されたプロパティと値を持つ子オブジェクトを返します。指定されたプロパティと値を持つ子が見つからない場合は、nullを返し、警告をログに記録します。

```ts
const carRef = ref(null);

watch(carRef, ({ model }) => {
  if (model) {
    const car = model.children[0];

    const body = seek(car, "name", "Octane_Octane_Body_0");
    body.color.set(new Color("blue"));
  }
});
```

同様に、`seekAll`および`seekAllByName`関数は、プロパティに指定された値が含まれる子オブジェクトの配列を返します。一致するものが見つからない場合は、空の配列が返され、警告がログに記録されます。

```ts
const character = ref(null);

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, "Bone");
  }
});
```

## useTresContext

このコンポーザブルは、複数の有用なプロパティを含む状態モデルへのアクセスを提供することを目的としています。

```ts
const { camera, renderer, camera, cameras } = useTresContext();
```

::: warning
`TresCanvas`はコンテキストデータのプロバイダーとして機能するため、`useTresContext`は`TresCanvas`内でのみ使用できます。TresCanvasの親コンポーネンで必要な場合は、[TresCanvasによって公開されるコンテキスト](tres-canvas#exused-public-properties)を使用してください。
:::

```vue
<TresCanvas>
  <MyModel />
</TresCanvas>
```

```vue
// MyModel.vue

<script lang="ts" setup>
import { useTresContext } from "@tresjs/core";

const context = useTresContext();
</script>
```

### コンテキストのプロパティ

| プロパティ           | 説明                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **camera**           | 現在アクティブなカメラ                                                                                                     |
| **cameras**          | シーンに存在するカメラ                                                                                                     |
| **controls**         | The controls of your scene                                                                                                 |
| **deregisterCamera** | カメラの登録を解除する方法。 カメラを手動で作成する場合にのみ必要です。 テンプレート内のカメラは自動的に登録解除されます。 |
| **extend**           | コンポーネントカタログを拡張します。[拡張](/advanced/extending)を参照してください。                                        |
| **raycaster**        | ポインターイベントに使用されるグローバルレイキャスター                                                                     |
| **registerCamera**   | カメラを登録する方法です。カメラを手動で作成する場合にのみ必要です。テンプレート内のカメラは自動的に登録されます。         |
| **renderer**         | シーンの[WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)                                          |
| **scene**            | [シーン](https://threejs.org/docs/?q=sce#api/en/scenes/Scene)。                                                            |
| **setCameraActive**  | カメラをアクティブに設定する方法                                                                                           |
| **sizes**            | キャンバスの幅、高さ、アスペクト比が含まれます                                                                             |
