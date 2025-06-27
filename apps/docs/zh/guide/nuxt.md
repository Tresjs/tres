# Nuxt 模块 `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

这里是 TresJS 的官方 Nuxt 模块🎉。

仓库在[这里](https://github.com/Tresjs/nuxt)

## 安装

::: code-group

```bash [pnpm]
pnpm add three @tresjs/nuxt
```

```bash [npm]
npm install three @tresjs/nuxt
```

```bash [yarn]
yarn add three @tresjs/nuxt
```

:::

## 特性

- 🤓 从 [TresJS 生态系统](https://github.com/orgs/Tresjs/repositories)自动导入组件和组合式函数
- `TresCanvas` 仅在客户端渲染，您无需为组件文件名添加 `.client` 或是使用 `<ClientOnly />`
- 自动配置 vue 编译器支持 TresJS 组件，了解[为什么](/guide/troubleshooting.html#failed-resolve-component-trescomponent-%F0%9F%A4%94)？
- Nuxt 所有附带的开发体验魔法

## 使用方式

将 `@tresjs/nuxt` 添加到 `nuxt.config.ts` 的 `module` 部分

```js [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
})
```

就这样！你现在可以在你的 Nuxt 应用中开始使用 `@tresjs/nuxt` ✨

如果你想使用TresJS生态系统中的任何包，你可以安装你想使用的包，它们将由模块自动导入🧙🏼。

| 包名                     | 版本                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos) | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00) |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# 使用 pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```
