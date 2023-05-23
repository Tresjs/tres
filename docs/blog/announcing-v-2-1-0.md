---
sidebar: false
---

# Announcing v2.1.0 🎉

We are excited to announce the release of **TresJS v2.1.0** 🎉 . First release since we open source the project an recieveing such a warm welcome from the vue community. We are so grateful for all the support and feedback we have received so far. More than 225 ⭐️ in the [github repo](https://github.com/Tresjs/tres) in just 2 weeks! 🤯.

This new version comes with exciting new features and improvements in the ecosystem, let's dive in!

## What's hot? 🔥

### Export types and better intellisense 🦾

We are now correctly exporting the types from the core package (thanks to [@userquin](https://github.com/userquin)), this means that you can use the types in your project and get better intellisense. Specially if you are using `moduleResolution: 'bundler'` in your `tsconfig.json`.

#### Before 😨

![Export types core 2.0.0](/blog/tres-core-2-0-0.png)

[Source](https://arethetypeswrong.github.io/?p=%40tresjs%2Fcore%402..0.0)

#### After 🥹

![Export types core 2.1.1](/blog/tres-core-2-1-1.png)

[Source](https://arethetypeswrong.github.io/?p=%40tresjs%2Fcore%402.1.1)

Shoutout to the team behind this amazing tool [Are the types wrong](https://arethetypeswrong.github.io), a must-have for every library author.

### Inherit types from THREE 🤓

We are now inheriting the types from the `three` package instead of generating them on build time. That means that you no longer need to wait for a release of TresJS to get the latest types from ThreeJS which follows our goal of always being up to date with the latest ThreeJS features.

::: tip
Make sure you have the `@types/three` package installed in your project.
:::

We took serious inspiration from R3F v9 and how they are handling [the types](https://github.com/pmndrs/react-three-fiber/blob/v9/packages/fiber/src/three-types.ts), so thanks to [@CodyJasonBennett](https://github.com/CodyJasonBennett) from the Pmndrs team for pointing me in the right direction.

```ts
type ThreeExports = typeof THREE
type ThreeInstancesImpl = {
  [K in keyof ThreeExports as Uncapitalize<K>]: ThreeExports[K] extends ConstructorRepresentation
    ? ThreeElement<ThreeExports[K]>
    : never
}

export interface ThreeInstances extends ThreeInstancesImpl {
  primitive: Omit<ThreeElement<any>, 'args'> & { object: object }
}

type TresComponents = {
  [K in keyof ThreeInstances as `Tres${Capitalize<string & K>}`]: DefineComponent<ThreeInstances[K]>
}

declare module 'vue' {
  export type GlobalComponents = TresComponents
}
```

This is a simplified version of the code, you can check the full implementation [here](https://github.com/Tresjs/tres/blob/main/src/types/index.ts)

Why is this so great? For example now you get a better intellisense of the `args` property for the instance constructor parameters:

![Args intellisense](/blog/args-intellisense.png)

### Improved HMR

We have improved the HMR experience, now you can update the code without reloading the page. This is a huge improvement for the development experience but still not perfect. For example `OrbitControls` is not working correctly with HMR, so you will have to reload the page to see the changes.

![HMR](/blog/hmr.gif)

### Updated to Vue 3.3.4

We are now using the latest version of [Vue 3.3.4](https://blog.vuejs.org/posts/vue-3-3) "Rurouni Kenshin", this means that you get all the latest features and bug fixes from Vue.

## Ecossystem updates 🌳

### Cientos v2.1.0

We have updated the `@tresjs/cientos` package to v2.1.0, this version comes with a lot of improvements and new features. Check out the [release notes]()

#### Enhanced `OrbitControls`

The abstraction for `OrbitControls` has been improved adding all the properties and methods from the original ThreeJS class such as `enableDamping` and `autoRotate` as well as events like `change` and `start`.

This was highly requested by the community, so thanks to everyone that contributed to this release.

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000] />
    <OrbitControls enable-damping :damping-factor="0.1" @start="onOrbitControlStart" />
  </TresCanvas>
</template>
```
