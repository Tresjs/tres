# Positional Audio

<DocsDemo>
  <PositionalAudioDemo />
</DocsDemo>

---

The `cientos` package provides an abstraction of the [PositionalAudio](https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio), `<PositionalAudio>` is an object specifically designed for controlling sounds in a scene graph space. This allows, for the simulation of various audio environments, creating a more immersive user experience.

`<PositionalAudio>` includes a helper 🛠️ that allows you to view the directional cone of te audio. The helper is based on the [PositionalAudioHelper](https://threejs.org/docs/#examples/en/helpers/PositionalAudioHelper) class.

## Usage

The `<PositionalAudio>` component is very simple to set up and use, allowing you to bring your 3D scenes to life.  All you need to do is call the `<PositionalAudio>` component and set the `url`. It must be wrapped around the `<Suspense>` component to enable it to load your audio asynchronously. 💥

```vue
<script setup lang="ts">
import { shallowRef, onUnmounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { PositionalAudio, Box } from '@tresjs/cientos'

const positionalAudioRef = shallowRef(null)

onUnmounted(() => {
  positionalAudioRef?.value?.dispose()
})
</script>

<template>
  <Box :args="[1, 1, 1]">
    <TresMeshNormalMaterial />
    <Suspense>
      <PositionalAudio
        ref="positionalAudioRef"
        loop
        helper
        url="https://raw.githubusercontent.com/Tresjs/assets/main/music/beat-1.mp3"
      /> 
    </Suspense>
  </Box>
</template>
```

<DocsDemo>
  <PositionalAudioDemoHelper />
</DocsDemo>

:::warning
AudioContext is authorised when an user gesture has been made on the page. `:autoplay="true"` cannot be activated if no user gesture has been made previously (https://goo.gl/7K7WLu).
If you are sure that there will be a user gesture before your `<PositionAudio>` component appears/is created, you can directly add `:ready="true"` and `autoplay="true"` for a direct launch.
:::

## How does it work?
<img class="mx-auto" src="/positional-audio/sketch.jpg" />

## Props

| Prop              | Description                                          | Default                   |
| :---------------- | :--------------------------------------------------- | ------------------------- |
| **url**        | `string` - **required** — The path or URL to the file. |                    |
| **helper**        | `boolean` — Selects whether helper mode is enabled. <br> *(Useful for visualising the angle of sound propagation)*  | `false`                   |
| **distance**        | `number` — The distance at which the volume reduction starts taking effect. ***A non-negative number.***  | `1`                   |
| **ready**        | `boolean` — Tells `<PositionalAudio>` that `AudioContext` is authorised because an user gesture has been made on the page. This is imperative, as `autoplay` cannot be activated if no user gesture has been made previously (https://goo.gl/7K7WLu). <br> | `false`                   |
| **autoplay**        | `boolean` — Selects whether the audio is launched automatically. Please refer to the `ready` prop for a better understanding of how to use autoplay.  | `false`                   |
| **loop**        | `boolean` — Specifies whether the audio should loop. |      `false`              |
| **innerAngle**        | `number` —  A parameter for directional audio sources, this is an angle, inside of which there will be no volume reduction. |      `360`              |
| **outerAngle**        | `number` —  A parameter for directional audio sources, this is an angle, outside of which the volume will be reduced to a constant value of `outerGain` prop. |      `0`              |
| **outerGain**        | `number` —  A parameter for directional audio sources, this is the amount of volume reduction outside of the `outerAngle` prop. When the value is `0` no sound can be heard. |      `0`              |
