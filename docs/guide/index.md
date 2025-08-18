# Introduction

This library is based on [Rapier](https://rapier.rs/), which is a Rust library ported to JavaScript using WASM, [Rapier.js](https://github.com/dimforge/rapier.js/).

## Installation

::: code-group

```bash [pnpm]
pnpm add @tresjs/rapier
```

```bash [npm]
npm install @tresjs/rapier

```

```bash [yarn]
yarn add @tresjs/rapier
```

:::

## Basic Usage

```vue{4,13-26}
<script setup lang="ts" >
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics>
        <RigidBody>
          <TresMesh :position="[0, 8, 0]">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
          </RigidBody>
          <RigidBody type="fixed">
            <TresMesh :position="[0, 0, 0]">
              <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
              <TresMeshBasicMaterial color="#f4f4f4" />
            </TresMesh>
          </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

:::warning
This library is under heavy development and it's not ready for production
:::
