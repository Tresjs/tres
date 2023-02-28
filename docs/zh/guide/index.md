# 简介 {#Introduction}

<ClientOnly>
    <FirstScene style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"/>
</ClientOnly>

::: code-group

```bash [npm]
npm install three @tresjs/core -D
```

```bash [yarn]
yarn add three @tresjs/core -D
```

```bash [pnpm]
pnpm add three @tresjs/core -D
```

:::

## 线上尝试 Tres {#Try it online}

您不需要在本地安装任何东西，在 [StackBlitz](https://stackblitz.com/edit/tresjs-basic?file=src/App.vue) 上 fork 这个模板示例，就可以尝试使用它 😋 。
<StackBlitzEmbed projectId="tresjs-basic" />

## 动机 {#Motivation}

[ThreeJS](https://threejs.org/) 是一个很棒的库，常用来创建炫酷的 **WebGL** 3D 网站。同时，它更新很频繁，使得包维护者，例如： [TroisJS](https://troisjs.github.io/)，很难跟上所有功能。

React 生态中有大家熟悉的**自定义渲染**解决方案 —— [React-three-fiber](https://docs.pmnd.rs/react-three-fiber)。它允许您使用可复用且自包含的组件以声明式的方式构建场景，并且保持响应式。

在 Vue 生态中探索类似的解决方案时，我发现了一个优秀的库 [Lunchbox](https://github.com/breakfast-studio/lunchboxjs)，该库采用与 [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) 相似的工作原理，即提供[自定义渲染器](https://vuejs.org/api/custom-renderer.html)。我成为了它的贡献者，以便它变得和 [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) 一样成熟、功能丰富。

但是，这存在一个问题，Vue 社区一直在致力于解决 Vue 3 中混合使用不同的渲染器，[详细内容请参见这里](https://github.com/vuejs/vue-loader/pull/1645)。

在没有类似 [React Reconciliation](https://reactjs.org/docs/reconciliation.html) 解决方案之前，一种不理想的解决方案是创建两个独立的`Apps`。

```ts
// Example Vite setup
import { createApp } from "vue";
import { createApp as createLunchboxApp } from "lunchboxjs";
import App from "./App.vue";
import LunchboxApp from "./LunchboxApp.vue";

// html app
const app = createApp(App);
app.mount("#app");

// lunchbox app
const lunchboxApp = createLunchboxApp(LunchboxApp);
// assuming there's an element with ID `lunchbox` in your HTML app
lunchboxApp.mount("#lunchbox");
```

最终我受到了这两个库的启发，开发了一个不使用**自定义渲染器**，但很智能的库。它可以基于 ThreeJS 的构造函数创建 Vue 组件，不需要特殊维护, 只需引入 `three:latest` 即可，这就是 **TresjS**。
