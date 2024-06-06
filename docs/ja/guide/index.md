# 導入

<ClientOnly>
    <div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
      <FirstScene />
    </div>
</ClientOnly>

::: code-group

```bash [npm]
npm install @tresjs/core three
```

```bash [yarn]
yarn add @tresjs/core three
```

```bash [pnpm]
pnpm add @tresjs/core three
```

:::

## Typescript

TresJSはTypescriptで書かれており、完全に型指定されています。Typescriptを使用している場合は、入力の利点を最大限に活用できます。 必ずthreeのタイプをインストールしてください。

::: code-group

```bash [npm]
npm install @types/three -D
```

```bash [yarn]
yarn add @types/three -D
```

```bash [pnpm]
pnpm add @types/three -D
```

:::

## Vite

Viteを使用している場合は、TresJSから`templateCompilerOptions`をvueプラグイン内の`vite.config.ts`にインポートして追加するだけです。

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // その他設定
      ...templateCompilerOptions
    }),
  ],
}),
```

テンプレートコンパイラがカスタムレンダラーと連携してコンソールに警告を表示しないようにするために必要です。詳細については、[こちら](/ja/guide/troubleshooting.html)を確認してください。

## オンラインで試してみる

### Playground

公式[Playground](https://play.tresjs.org/)を使用して、TresJSをオンラインで試すことができます。

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

TresJSをオンラインで試すための[StackBlitz](https://stackblitz.com/)スターターを用意しました。

![](/stackblitz-starter.png)

## ショーケース

TresJSで作成されたサンプルのショーケースもあります。[こちら](https://playground.tresjs.org/)をチェックしてください。

![](/tresjs-lab.png)

## Tresを作った理由

[ThreeJS](https://threejs.org/) は、**WebGL**で3D Webサイトを作成するための素晴らしいライブラリです。常に更新されるライブラリでもあるため、[TroisJS](https://troisjs.github.io/) のようなラッパーメンテナーがすべての機能強化に追いつくのは困難です。

Reactエコシステムには、[React-three-fiber](https://docs.pmnd.rs/react-three-fiber)と呼ばれる印象的な **カスタムレンダリング**ソリューションがあり、再利用可能で宣言的にシーンを構築できます。状態に反応する自己完結型コンポーネントです。

VueJSエコシステムで同様のものを探していたところ、[Lunchbox](https://github.com/breakfast-studio/lunchboxjs)というライブラリを見つけました。
R3Fと同じコンセプトで動作し、[カスタムVue3レンダラー](https://vuejs.org/api/custom-renderer.html)。ライブラリがR3Fと同じように成熟して機能が豊富になるように、ライブラリの改善にも貢献しています。

これに関する唯一の問題は、Vue 3でコンパイラーレンダラーを混合することは、Vueコミュニティがまだ取り組んでいることです。詳細については、[こちら](https://github.com/vuejs/vue-loader/pull/1645)を参照してください。

```ts
// Viteセットアップ例
import { createApp } from "vue";
import { createApp as createLunchboxApp } from "lunchboxjs";
import App from "./App.vue";
import LunchboxApp from "./LunchboxApp.vue";

// アプリをマウント
const app = createApp(App);
app.mount("#app");

// ランチボックスアプリ
const lunchboxApp = createLunchboxApp(LunchboxApp);
// HTMLにIDが「lunchbox」の要素があると仮定します
lunchboxApp.mount("#lunchbox");
```

両方のライブラリからインスピレーションを得て、ThreeJS用のVueカスタムレンダラーを作成しました。それが **TresJS v2** となりました。
