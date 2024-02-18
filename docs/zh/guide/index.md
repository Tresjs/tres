# 简介

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

## Vite

如果你使用 Vite，你需要在你的 `vite.config.ts` 中添加下面的配置:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
  ],
}),
```

要使模板编译器能与自定义渲染器一起工作，并且不会在控制台上发出警告，这样做是必须的。获得更多信息，请点击[此处](/guide/troubleshooting.html)。

## 线上尝试

### 沙盒

你可以在官方[沙盒](https://play.tresjs.org/)中线上尝试 TresJS。尝试一下：

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

我们现在有一个全新的[StackBlitz](https://stackblitz.com/)模板供线上尝试 TresJS。尝试一下：

![](/stackblitz-starter.png)

<StackBlitzEmbed projectId="tresjs-basic" />

## 演练场

我们同时也拥有一个可以让你线上尝试 TresJS 的演练场。点击[这里](https://playground.tresjs.org/)尝试一下。

![](/playground.png)

## 动机

ThreeJS 在创建超棒 **WebGL** 3D 网站方面是一个奇妙的库。同时他也是一个保持不断更新的库，一些对其封装的维护者，如 [TroisJS](https://troisjs.github.io/)，往往很难跟上其所有的更新。

React 生态系统中有一个令人印象深刻的使用**自定义渲染器**的解决方案叫 [React-three-fiber](https://docs.pmnd.rs/react-three-fiber)，它能让你使用一些可重用，独立的对状态做出反应的组件进行声明式的构建你的场景。

我在 VueJS 生态系统中寻找类似的东西时，发现了这个名为 [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) 的神奇库，它的工作原理与 R3F 相同，提供了一个[自定义的 Vue3 渲染器](https://cn.vuejs.org/api/custom-renderer.html)。我也在不断改进这个库，让它变得像 R3F 一样成熟、功能丰富。

同时唯一的问题是，混合编译不同的渲染器是 Vue 社区仍在努力解决的问题 —— 更多信息参阅[此处](https://github.com/vuejs/vue-loader/pull/1645)。

```ts
// Example Vite setup
import { createApp } from 'vue'
import { createApp as createLunchboxApp } from 'lunchboxjs'
import App from './App.vue'
import LunchboxApp from './LunchboxApp.vue'

// html app
const app = createApp(App)
app.mount('#app')

// lunchbox app
const lunchboxApp = createLunchboxApp(LunchboxApp)
// assuming there's an element with ID `lunchbox` in your HTML app
lunchboxApp.mount('#lunchbox')
```

因此，我受到这两个库的启发，为 ThreeJS 创建了一个 Vue 自定义渲染器。这就是 **TresJS v2**。

