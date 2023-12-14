![repo-banner](/public/repo-banner.png)

<p align="center">
  <a href="https://www.npmjs.com/package/@tresjs/core"><img src="https://img.shields.io/npm/v/@tresjs/core/latest?color=%2382DBCA" alt="npm package"></a>
  <a href="https://discord.gg/UCr96AQmWn"><img src="https://img.shields.io/badge/chat-discord-purple?style=flat&logo=discord" alt="discord chat"></a>
</p>

[English](./README.md) | 简体中文

# TresJS `@tresjs/core`

> 使用Vue组件实现声明式的ThreeJS

- 💡 将3D场景构建为Vue组件形式
- ⚡️ 由Vite驱动
- 🥰 使用ThreeJS的所有更新功能，全版本兼容。
- 🦾 完全类型化

Tres (是西班牙语的"three", 读作 `/tres/` ) 是一种以声明式方式使用Vue组件创建ThreeJS场景的方法。

它是基于 [Vue自定义渲染器](https://vuejs.org/api/custom-renderer.html#createrenderer) 构建的，并且由Vite提供支持。

我们的目标是为Vue社区提供一种简单的方式来构建使用Vue的3D场景，并始终与最新的ThreeJS功能保持同步，同时减少维护工作。

## 安装

```bash
pnpm install @tresjs/core three
```

## 文档

Checkout the [docs](https://tresjs.org)

## 演示

- [Stackblitz Collection](https://stackblitz.com/@alvarosabu/collections/tresjs)

## 生态系统

| Package                     | Version                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Tres](packages/tres)       | ![tres version](https://img.shields.io/npm/v/@tresjs/core/latest.svg?label=%20&color=%2382DBCA)    |
| [Cientos](packages/cientos) | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00) |
| [Post-processing](packages/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=%ff7bac00) |

## 贡献

我们欢迎贡献者加入，请阅读[贡献指南](/CONTRIBUTING.md)开始参与。

### 安装

```
pnpm install --shamefully-hoist
```

### 案例展示

运行案例展示

```
pnpm run playground
```

### 编译库

编译核心使用库模式

```
pnpm run build
```

### 文档

使用开发模式下运行文档

```bash
pnpm run docs:dev
```

编译生成文档

```bash
pnpm run docs:build
```

## 许可

[MIT](/LICENSE)

## 赞助者

成为首个支持该项目的人。 [点这里](https://github.com/sponsors/alvarosabu) ☺️
