# Introduction

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

TresJS is written in Typescript and it's fully typed. If you are using Typescript, you will get the full benefit of the typings. Just make sure you install the types for three.

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

If you are using Vite, you just need to import and add the `templateCompilerOptions` from TresJS to your `vite.config.ts` inside of the vue plugin:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
  ],
})
```

This is required to make the template compiler work with the custom renderer so it does not throw warnings on the console. For more info check [here](/guide/troubleshooting.html).

## Try it online

### Playground

You can try TresJS online using the official [playground](https://play.tresjs.org/). Check it out:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

We have a brand new [StackBlitz](https://stackblitz.com/) starter to try TresJS online. Check it out:

![](/stackblitz-starter.png)

## Labs

We also have a showcase lab of examples made with TresJS. Check it out [here](https://lab.tresjs.org/).

![](/tresjs-lab.png)

## Motivation

[ThreeJS](https://threejs.org/) is a wonderful library to create awesome **WebGL** 3D websites. It's also a library, which is constantly updated, which makes it hard for wrapper maintainers like [TroisJS](https://troisjs.github.io/) to keep up with all the enhancements.

The React ecosystem has an impressive **custom render** solution called [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) that allows you build your scenes declaratively with re-usable, self-contained components that react to state.

In my search for something similar in the VueJS ecosystem, I found this amazing library called [Lunchbox](https://github.com/breakfast-studio/lunchboxjs), which works with the same concept as R3F, it provides a [custom Vue3 Renderer](https://vuejs.org/api/custom-renderer.html).

But none of them was actively maintained or had the same level of abstraction as R3F.

So I was inspired by both libraries to create a Vue custom renderer for ThreeJS. That's **TresJS**.
