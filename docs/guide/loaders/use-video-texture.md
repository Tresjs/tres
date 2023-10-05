# useVideoTexture <Badge type="warning" text="^3.2.0" />

<DocsDemo>
  <VideoTextureDemo />
</DocsDemo>

A composable to easily use videos as textures in your meshes.

This composable is based on the Drei [useVideoTexture](https://github.com/pmndrs/drei/tree/master#usevideotexture)

## Usage

<<< @/.vitepress/theme/components/VideoTextureDemo.vue{4,8-9,20}

## Props

| Prop          | Description                                                              | Default          |
| :------------ | :----------------------------------------------------------------------- | ---------------- |
| `src`         | Path to the video.                                                       | `undefined`      |
| `unsuspend`   | Path to the model file.                                                  | `loadedmetadata` |
| `crossOrigin` | Whether to use CORS to fetch the related video.                          | `Anonymous`      |
| `muted`       | Whether to set the audio silenced.                                       | true             |
| `loop`        | Automatically seek back to the start upon reaching the end of the video. | true             |
| `start`       | To play to the video once loaded or not.                                 | true             |
| `playsInline` | To be play the video inline or not.                                      | true             |

- Any other attribute for a `<video>` tag is accepted and will automatically set
