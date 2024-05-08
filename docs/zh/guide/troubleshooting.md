# 常见问题及解决方法的趣味指南

![Troubleshooting](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

欢迎使用 **TresJS v2 故障排除指南**。其中 3D 代表 _"Dazzlingly Delightful Difficulties"_！我们知道 3D 可以像缠结的毛线球🧶一样复杂，也可以像键盘上的猫🐈 ⌨️一样不可预测，但不要害怕！

本指南旨在帮助您解决使用 TresJS v2 时可能遇到的最常见问题。

## 我看不到我的3D场景 😭!

您遵循了[入门指南](/zh/guide/getting-started.md)，但仍不能看到渲染的场景。

以下是您可能无法看到场景的最常见原因：

### 检查画布的高度📏

另一个常见问题是 `TresCanvas` 组件默认创建一个`canvas`画布元素，该元素采用父元素的宽和高。如果父元素没有高度，则画布也没有高度。

![No height found](/canvas-height.png)

您还将在控制台中看到以下错误：

![Canvas height warning](/canvas-height-warning.png)

将父元素的高设置为 `100%` 是一种最简单修复此问题的的方法：

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

或者你可以设置组件 `TresCanvas` 的 `window-size` prop：

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Failed resolve component: TresComponent... 🤔

![](/failed-to-resolve-component.png)

由于 **TresJS v2** 在主 Vue App 实例中使用了 Vue 自定义渲染器，因此作为父级的核心 Vue 渲染器不会识别组件内部的 `TresCanvas` 组件。即使不影响渲染，也会在控制台中显示警告。

![](/failed-to-resolve-component.png)

目前，没有原生的 Vue 支持来定义 `<template />` 中使用的渲染器，但有一个快速的解决方法可以删除警告

在你的 `vite.config.ts` 中将以下配置添加到 `@vitejs/plugin-vue`：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
})
```

这将从控制台中删除警告。

# 帮助我们让 TresJS 更完美! 😼

我们知道，即使是最好的猫咪午睡者偶尔也会犯错误，我们需要您的帮助才能使 TresJS 变得更好！如果您发现错误，请在 repo 中打开工单并**请提供重现链接**。

::: warning
没有提供重现链接的工单将被关闭
:::

我们的编码猫爱好者团队将采取行动，消除那些讨厌的错误，并为每个人改进 TresJS。让我们一起让 TresJS 成为 Vue 中 做 3D 渲染最好的的猫咪！
