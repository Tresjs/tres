<script setup>
  import cientos from '../node_modules/@tresjs/cientos/package.json'
</script>

# Cientos <Badge :text="`v${cientos.version}`" type="warning" vertical="middle" />

![Cientos banner](/cientos-banner.png)

> Cientos (西班牙语中的 "hundreds", 发音 `/θjentos/`) 提供了非 [core](/guide/index.md) 包的一些实用工具和组件。包名使用了西班牙语中的单词，意思是“乘以 100”，用来表示这个包具有容纳惊人抽象概念的潜力。

`cientos` 底层使用 [`three-stdlib`](https://github.com/pmndrs/three-stdlib) 模块代替 `three/examples/jsm` 模块。这样您不需要使用 [useCatalogue](/api/composables#useCatalogue) 提供的 `extend` 方法来扩展组件。`cientos` 会为您处理这些琐事。

成功. 💯

::: info
当使用核心库开发的时候，并不一定需要 `cientos` 包。 `cientos` 只是提高您的开发体验，特别是开发复杂场景的时候。
:::

## 安装

```bash
npm install @tresjs/cientos -D
```

## 基础用法

```ts
import { OrbitControls } from "@tresjs/cientos";
```

场景中使用 `OrbitControls` 组件。

```html
<template>
  <TresCanvas shadows alpha>
    <OrbitControls />
    <TresScene> ... </TresScene>
  </TresCanvas>
</template>
```

::: warning
注意 `OrbitControls` 组件不带有 `Tres` 前缀。
:::
