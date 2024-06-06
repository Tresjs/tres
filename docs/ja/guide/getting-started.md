# インストール

TresJSのインストール方法は以下のようになります。

::: code-group

```bash [pnpm]
pnpm add three @tresjs/core
```

```bash [npm]
npm install three @tresjs/core
```

```bash [yarn]
yarn add three @tresjs/core
```

:::

> Vue 3.xとComposition APIがおすすめです。

## Typescript

TresJSはTypescriptで書かれており、完全に型指定されています。 型指定がご利用には、必ずThreeの型宣言をインストールしてください。

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

## 始める

ほかのVueプラグインと同じようにTresJSをインストールができます。

```ts
import { createApp } from "vue";
import Tres from "@tresjs/core";
import App from "./App.vue";

export const app = createApp(App);

app.use(Tres);
app.mount("#app");
```

直接コンポーネント内使用することもできます。

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
</script>
<template>
  <TresCanvas>
    <!-- シーンがここに入っています -->
  </TresCanvas>
</template>
```

::: tip
ツリーシェイキングがより効果的に機能し、使用するコンポーネントのみをインポートするため、パフォーマンスとパッケージサイズの理由からこれをお勧めします。
:::

## Vite

バージョン2はカスタム レンダラーであるため、「[Vue warn]: Failed to resolve component」という警告を回避するには、アプリケーションの「vue-compiler」にTresコンポーネントを含めることができるように指示する必要があります。

以下のをVueプラグイン内の`vite.config.ts`ファイルに追加するだけで大丈夫です。

```ts
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
