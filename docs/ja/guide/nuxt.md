# Nuxtのジュール `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

TresJS用の公式 Nuxtモジュールができています 🎉.

リポジトリーは[ここ](https://github.com/Tresjs/nuxt)

## インストール

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

## 機能

- 🤓 [TresJSエコシステム](https://github.com/orgs/Tresjs/repositories)からコンポーネントとコンポーザブルを自動インポートします。
- `TresCanvas`クライアントのみ。コンポーネント名または`<ClientOnly />`に`.client` を追加する必要はありません。
- TresJSコンポーネントをサポートするようにVueコンパイラーを自動的に構成します。[説明](/ja/guide/troubleshooting)を参照してください。
- Nuxtに付属する最高のDX ✨

## 使い方

`nuxt.config.ts`の`modules`セクションに`@tresjs/nuxt`を追加します。

```js
export default defineNuxtConfig({
  modules: ["@tresjs/nuxt"],
});
```

That's it! You can now use `@tresjs/nuxt` in your Nuxt app ✨

If you want to use the any package from the TresJS ecosystem, you can install the packages you want to use and they will be auto-imported by the module 🧙🏼‍♂️.

| パッケージ                                                   | バージョン                                                                                                         |
| ------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos)                 | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00)              |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# pnpmでインストール
pnpm add @tresjs/cientos @tresjs/post-processing
```
