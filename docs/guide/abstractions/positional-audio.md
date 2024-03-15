# Positional Audio

<DocsDemo>
  <!-- <PositionalAudioDemo /> -->
</DocsDemo>

The `cientos` package provides an abstraction of the [PositionalAudio](https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio), `<PositionalAudio>` is an object specifically designed for controlling sound in a scene graph space. This allows for the simulation of various audio environments, creating a more immersive user experience.

`<PositionalAudio>` includes a helper 🛠️ that allows you to view the directional cone of te audio. The helper is based on the [PositionalAudioHelper](https://threejs.org/docs/#examples/en/helpers/PositionalAudioHelper) class.

::: info
This component is still under development, so please report any problems or suggestions on the [@tresjs/cientos](https://github.com/Tresjs/cientos) repository on GitHub.
:::

## Usage

Description

<DocsDemo>
  <PositionalAudioDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/PositionalAudioDemo.vue{4,15,21-24,58-61}

## Props

| Prop              | Description                                          | Default                   |
| :---------------- | :--------------------------------------------------- | ------------------------- |
| **helper**         | `boolean` — Helper mode (Useful for visualising the angle of sound propagation)            | `false`                   |