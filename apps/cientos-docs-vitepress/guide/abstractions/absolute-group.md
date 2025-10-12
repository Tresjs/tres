# AbsoluteGroup

<DocsDemo>
  <AbsoluteGroupDemo />
</DocsDemo>

`<AbsoluteGroup />` wraps its children in a `<TresGroup />` and positions them similarly to CSS `position: absolute` property, relatively to the `<TresCanvas />` at `distance` of the camera. It supports both `PerspectiveCamera` and `OrthographicCamera` with automatic zoom handling.

## Usage

<<< @/.vitepress/theme/components/AbsoluteGroupDemo.vue

## Props

| Prop       | Description                                                 | Default                                 |
| :--------- | :---------------------------------------------------------- | --------------------------------------- |
| `distance` | Distance from the camera (for perspective camera)           |                                         |
| `top`      | Similar to CSS `top` property. Cannot be used with `bottom` | `0.5` (vertical center of the screen)   |
| `bottom`   | Similar to CSS `bottom` property. Cannot be used with `top` |                                         |
| `left`     | Similar to CSS `left` property. Cannot be used with `right` | `0.5` (horizontal center of the screen) |
| `right`    | Similar to CSS `right` property. Cannot be used with `left` |                                         |
