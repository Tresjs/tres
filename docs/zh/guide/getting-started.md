# 安装{#Instalation}

如何安装 TresJS

::: code-group

```bash [pnpm]
pnpm add three @tresjs/core -D
```

```bash [npm]
npm install three @tresjs/core -D
```

```bash [yarn]
yarn add three @tresjs/core -D
```

:::

> 推荐在 Vue3.x 使用本库，以及使用组合式 API

## 快速开始{#Getting started}

TresJS 以 Vue 插件的方式安装

```ts
import { createApp } from "vue";
import App from "./App.vue";

import Tres from "@tresjs/core";

export const app = createApp(App);

app.use(Tres);
app.mount("#app");
```

### Nuxt

敬请期待。
