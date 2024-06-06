# よくある問題とその解決策についての楽しいガイド

![トラブルシューティング](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

**TresJS v2**に対してトラブルシュートガイドへようこそ 。ここでは、3Dは*"Dazzlingly Delicious Difficulties"*の略です！3Dは絡まっているな毛糸🧶のように複雑であるか、キーボードの上の猫🐈 ⌨のように予測不可能であることがわかっていますが、心配しないでください！

このガイドは、TresJS v2の使用時に発生する可能性のある最も一般的な問題の解決に役立つことを目的としています。

## 3Dシーンが見えません 😭!

[スタートガイド](/ja/guide/getting-started.md)に従いましたのに、レンダリングされたシーンは表示されません。

シーンが表示されない最も一般的な原因は次のとおりです。

### キャンバスの高さを確認してください 📏

もう1つの一般的な問題は、デフォルトで`TresCanvas`コンポーネントが親要素の`width`と`height`を継承する`canvas`要素を作成することです。親要素に高さがない場合、キャンバスにも高さはありません。

![高度情報が見つかりません](/canvas-height.png)

コンソールにも次のエラーが表示されます。

![キャンバスの高さに関する警告](/canvas-height-warning.png)

これに対する簡単な解決策は、親要素の高さを`100%`に設定することです。

```css
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
  background-color: #000;
}
```

または、「TresCanvas」コンポーネントの「window-size」プロパティを設定することもできます。

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## コンポーネントの解決中にエラーが発生しました

![](/failed-to-resolve-component.png)

**TresJS v2**はVueアプリケーションのメインインスタンス内でカスタムVueレンダラーを使用するため、親として機能するVueのメインレンダラーは`TresCanvas`コンポーネント内のコンポーネントを認識しません。 表示には影響しませんが、コンソールに警告が表示されます。

![](/failed-to-resolve-component.png)

現在、Vueには`<template/>`タグで使用されるレンダラーを定義するためのネイティブサポートはありませんが、警告を削除する簡単な解決策はあります。

以下のように`vite.config.ts` ファイルに`@vitejs/plugin-vue` 追加します。

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { templateCompilerOptions } from "@tresjs/core";

export default defineConfig({
  plugins: [
    vue({
      // その他設定
      ...templateCompilerOptions,
    }),
  ],
});
```

そうすると、上の方のようなコンソールの警告が出ないようになります。

# TresJSの改善にご協力をお願いします！ 😼

時々エラーが発生する可能性があることを承知しています。TresJSをさらに改善するためにあなたの協力が必要です。バグを見つけた場合は、[リポジトリー](https://github.com/Tresjs/playground)でチケットを開いて、**複製リンクを提供してください**。

::: warning
バグが再現できるリンクのないチケットはクローズされます。
:::

チームはバグを修正し、TresJSをみんなにとってより良いものにするために行動を起こします。 力を合わせて、TresJSをVueで最高の3Dレンダリングエクスペリエンスにすることができます。
