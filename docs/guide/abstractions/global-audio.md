# GlobalAudio

The `cientos` package provides a `<GlobalAudio />` component that serves to easily add a global sound to your scene.

Reference: [Audio](https://threejs.org/docs/index.html?q=audio#api/en/audio/Audio)

## Usage

```vue{3,9}
<script setup>
import { TresCanvas } from '@tresjs/core'
import { GlobalAudio } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 7.5]" />
    <GlobalAudio :src="exampleAudio" />
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                        | Default               |
| :------------- | :------------------------------------------------- | --------------------- |
| `src`          | Path to your audio file                            |                       |
| `playElement`  | Id of the DOM element that trigger the play state  | `renderer.domElement` |
| `pauseElement` | Id of the DOM element that trigger the pause state |                       |
| `stopElement`  | Id of the DOM element that trigger the stop state  |                       |
| `loop`         | If the audio must be replayed when ends            | `false`               |
| `volume`       | Volume of the audio.                               | `0.5`                 |
| `playbackRate` | PlaybackRate of the audio                          | `1`                   |

## Events

| Event       | Description                                                       |
| :---------- | :---------------------------------------------------------------- |
| `isPlaying` | Dispatched when the Audio change its state (play, pause or stop). |
