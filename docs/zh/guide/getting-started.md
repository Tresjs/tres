# 安装

了解如何安装 TresJS

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

> 最好与 Vue 3.x 和组合式 API 一起使用

## Typescript

TresJS 是用 Typescript 编写的，是完全类型化的。如果您使用的是 Typescript，您就能充分享受类型的好处。 只需要保证你安装了 three 的类型定义。

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

## 开始

你可以像其他的 Vue 插件一样安装 TresJS

```ts
import Tres from '@tresjs/core'
import { createApp } from 'vue'
import App from './App.vue'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

或者你可以直接在你的组件中使用

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Your scene here -->
  </TresCanvas>
</template>
```

::: tip
出于性能和捆绑包大小的考虑，建议采用这种方法，树摇的效果会更好，而且您只需导入您使用的组件。
:::

## Vite

由于 v2 是自定义渲染器，我们需要让应用程序的 `vue-compiler` 知道 Tres 的组件是被包含在内的，以避免出现 `[Vue warn]: Failed to resolve component` 警告。

您只需将此添加到 vue 插件中的 `vite.config.ts`：

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
  ]
})
```
