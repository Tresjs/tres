# TresCanvas

`TresCanvas`コンポーネントはTresの主要コンポーネントです。ThreeJSの`WebGLRenderer`を作成するものです。

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- シーンはここに -->
  </TresCanvas>
</template>
```

## キャンバスサイズ

`TresCanvas`コンポーネントは、親要素のサイズをキャンバスサイズとして使用します。ウィンドウサイズをキャンバスサイズとして使用したい場合は、`window-size`プロパティを`true`に設定します。

```vue
<template>
  <TresCanvas window-size>
    <!-- シーンはここに -->
  </TresCanvas>
</template>
```

また、CSSを使用してキャンバスのサイズを設定することもできます。

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#canvas {
  height: 100%;
  width: 100%;
}
```

## プリセット

Tresには、「TresCanvasコンポーネント用のいくつかのプリセットが付属しています。`preset`プロパティを設定することで使用できます。

### Realistic

「realistic」プリセットを使用すると、より現実的な3Dシーン用にレンダラーを簡単にセットアップできます。

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- シーンはここに -->
  </TresCanvas>
</template>
```

以下と同等です:

```ts
renderer.shadows = true;
renderer.physicallyCorrectLights = true;
renderer.outputColorSpace = SRGBColorSpace;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
```

## Props (プロパティーズ)

| プロパティ                       | 説明                                                                                                                                                                                                                                                                                                                                                              | デフォルト                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **alpha**                        | デフォルトのクリアアルファ値を制御します。trueに設定すると、値は0になります。それ以外の場合は1になります。                                                                                                                                                                                                                                                        | false                                       |
| **antialias**                    | アンチエイリアスを実行するかどうか。                                                                                                                                                                                                                                                                                                                              | `true`                                      |
| **camera**                       | レンダラーによって使用される手動カメラ。                                                                                                                                                                                                                                                                                                                          |                                             |
| **clearColor**                   | レンダラーがキャンバスをクリアするために使用する色。                                                                                                                                                                                                                                                                                                              | `#000000`                                   |
| **context**                      | レンダラを既存の[RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)に紐つくこと可能です。                                                                                                                                                                                                                                  |                                             |
| **depth**                        | 描画バッファーに少なくとも16ビットの[深度バッファー](https://ja.wikipedia.org/wiki/Z%E3%83%90%E3%83%83%E3%83%95%E3%82%A1)があるかどうか。                                                                                                                                                                                                                         |  `true`                                     |
| **disableRender**                | requestAnimationFrameでのレンダリングを無効にする（後処理に便利）                                                                                                                                                                                                                                                                                                 | `false`                                     |
| **failIfMajorPerformanceCaveat** | パフォーマンスが低い場合にレンダラーの作成が失敗するかどうかが検出されます。 詳細については、[WebGL仕様](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2)を参照してください。                                                                                                                                                                            | `false`                                     |
| **logarithmicDepthBuffer**       | 対数深度バッファを使用するかどうか。1つのシーン内でスケールの大きな違いを扱う場合は、これを使用する必要がある場合があります。 この設定は、利用可能な場合はgl_FragDepthを使用します。これにより、[Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) の最適化が無効になり、パフォーマンスが低下する可能性があることに注意してください。 | `false`                                     |
| **outputColorSpace**             | 出力エンコーディングを定義します                                                                                                                                                                                                                                                                                                                                  | `LinearEncoding`                            |
| **powerPreference**              | このWebGLコンテキストに適したGPUの構成を示すヒントをユーザー エージェントに提供します。 「high-performance」、「low-power」、または「default」のいずれかになります。                                                                                                                                                                                              | `default`                                   |
| **precision**                    | シェーダーの精度。 「highp」、「mediump」、または「lowp」を指定できます。                                                                                                                                                                                                                                                                                         | デバイスでサポートされている場合は「highp」 |
| **premultipliedAlpha**           | レンダラーが色に [事前乗算されたアルファ](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha) があると想定するかどうか。                                                                                                                                                                                                             | `true`                                      |
| **preserveDrawingBuffer**        | 手動でクリアまたは上書きされるまでバッファを保持するかどうか。                                                                                                                                                                                                                                                                                                    | `false`                                     |
| **shadows**                      | レンダラーでシャドウを有効にする                                                                                                                                                                                                                                                                                                                                  | `false`                                     |
| **shadowMapType**                | シャドウマップタイプを設定する                                                                                                                                                                                                                                                                                                                                    | `PCFSoftShadowMap`                          |
| **stencil**                      | 描画バッファーに少なくとも 8 ビットの [ステンシル バッファー](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%86%E3%83%B3%E3%82%B7%E3%83%AB%E3%83%90%E3%83%83%E3%83%95%E3%82%A1) があるかどうか。                                                                                                                                                                   | `true`                                      |
| **toneMapping**                  | レンダラーによって使用されるトーン マッピング露出を定義します。                                                                                                                                                                                                                                                                                                   | `NoToneMapping`                             |
| **toneMappingExposure**          | トーンマッピングの露出レベル。                                                                                                                                                                                                                                                                                                                                    | `1`                                         |
| **useLegacyLights**              | 従来の照明モードを使用するかどうか                                                                                                                                                                                                                                                                                                                                | `true`                                      |
| **windowSize**                   | ウィンドウ サイズをキャンバス サイズとして使用するか、親要素として使用するか。                                                                                                                                                                                                                                                                                    | `false`                                     |

### デフォルト

Tresはできる限り自分の意見を言わないように努めています。そのため、`TresCanvas`コンポーネントにはほとんどデフォルト値が設定されません。[three.js](https://threejs.org/)のデフォルトを使用します。唯一の例外は「antialias」プロップです。デフォルトでは「true」に設定されています。

## 公開された公共プロパティ

| プロパティ | 説明                                                             |
| ---------- | ---------------------------------------------------------------- |
| context    | [useTresContext](composables#usetrescontext)を参照してください。 |
