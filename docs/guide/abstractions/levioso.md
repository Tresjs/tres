# Levioso (Float)

<DocsDemo>
  <LeviosoDemo />
</DocsDemo>

![Leviosa](https://media.giphy.com/media/HaCFT5ghY6L1m/giphy.gif)

The `cientos` package provides a `<Levioso />` wrapper that makes its content … float, just like Magic 🪄✨

## Usage

```html
<Levioso ref="groupRef">
  <TorusKnot :position="[0, 4, 0]">
    <TresMeshNormalMaterial />
  </TorusKnot>
</Levioso>
```

## Props

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `speed`          | Floating speed, higher it rocks more 🤘.              | `1`           |
| `rotationFactor` | Factor for Euler rotation.                           | `1`           |
| `floatFactor`    | Factor for Up/down movement.                         | `1`           |
| `range`          | Range of y-axis values the object will float within. | `[-0.1, 0.1]` |

<style scoped>
img {
  width: 100%;
}
</style>
