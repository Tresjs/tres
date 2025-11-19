---
title: Backdrop
description: A curved plane studio backdrop for presentational purposes.
---

# Backdrop

::SceneWrapper
  ::StagingBackdrop
  ::
::

The `cientos` package provides a `<Backdrop />` component. It's just a curved plane, like a studio backdrop. Meant is for presentational purposes, to break up light and shadows more interestingly.

## Usage

```vue{3,9}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Backdrop } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <Backdrop />
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
```
Or with a custom material
```html
    <Backdrop
      :floor="1.5"
      :segments="20"
      receive-shadow
    >
      <TresMeshPhysicalMaterial color="orange" :roughness="1" />
    </Backdrop>
```

## Props

| Name | Type | Default | Required |
| :--- | :--- | ------- | -------- |
| floor | number | `0.25` | No |
| segments | number | `20` | No |
| receiveShadow | boolean | `false` | No |