# PositionalAudio

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
import { onUnmounted, shallowRef } from 'vue'
import { Box, PositionalAudio } from '@tresjs/cientos'

const positionalAudioRef = shallowRef(null)

onUnmounted(() => {
  positionalAudioRef?.value?.dispose()
})
</script>

<template>
  <TresCanvas>
    <Box :args="[1, 1, 1]">
      <TresMeshNormalMaterial />
      <Suspense>
        <PositionalAudio
          ref="positionalAudioRef"
          url="your-sound.mp3"
        />
      </Suspense>
    </Box>
  </TresCanvas>
</template>
```

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

## Exposed properties

| Event       | Description                                                      |
| :---------- | :--------------------------------------------------------------- |
| `root` | Root reference — Inheritance of [PositionalAudio](https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio).|
| `play()` | Play audio — *Cannot be fired if audio is already running.* |
| `pause()` | Pause audio — *Cannot be fired if audio is already paused.* |
| `stop()` | Stop audio — *Cannot be fired if audio is already stopped.* |
| `dispose()` | Dispose component — Deletion of the AudioListener in the camera, disconnection of the audio source and deletion of the PositionalAudioHelper (if it exists). |

```typescript{1,3,8}
const positionalAudioRef = shallowRef(null)

console.log(positionalAudioRef.value.root) // root properties

const handlerAudio = (action: string) => {
  if (!positionalAudioRef.value) return

  const { play, pause, stop } = positionalAudioRef.value

  if (action === 'play') play()
  else if (action === 'pause') pause()
  else if (action === 'stop') stop()
}
```

```vue{2-4,9}
<template>
  <button @click="handlerAudio('play')">play</button>
  <button @click="handlerAudio('pause')">pause</button>
  <button @click="handlerAudio('stop')">stop</button>

 <TresCanvas>
   <Sphere>
      <Suspense>
        <PositionalAudio ref="positionalAudioRef" />
      </Suspense>
    </Sphere>
  </TresCanvas>
</template>
```

## Events

| Event       | Description                                                      |
| :---------- | :--------------------------------------------------------------- |
| `is-playing` | Triggered when the audio changes its state (play, pause, or stop) <br> `@is-playing="(e) => yourIsPlayingRef = e"` |
