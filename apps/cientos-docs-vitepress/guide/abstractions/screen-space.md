# ScreenSpace

<DocsDemo>
  <ScreenSpaceDemo />
</DocsDemo>

`<ScreenSpace />` wraps its children in a `<TresGroup />` and positions them in front of the active camera at `:depth`.

## Usage

<<< @/.vitepress/theme/components/ScreenSpaceDemo.vue

## Props

| Prop             | Description              | Default       |
| :--------------- | :----------------------- | ------------- |
| `depth`          | Distance from the camera | `1`           |
