# Stats

[stats.js](https://github.com/mrdoob/stats.js/) is a JavaScript performance monitor, made by [mrdoop](https://github.com/mrdoob). stats.js provides a simple info box that will help you monitor your code performance.

- FPS Frames rendered in the last second. The higher the number the better.
- MS Milliseconds needed to render a frame. The lower the number the better.
- MB MBytes of allocated memory. (Run Chrome with --enable-precise-memory-info)
- CUSTOM User-defined panel support.

**TresJS** provides a function called `Stats` that creates a panel without effort or configuration in the top left corner where you'll be able to monitor your app.

## Basic usage

```ts
import { Stats } from '@tresjs/cientos'

Stats()
```

## Options

| Name          | Type     | Default | Description          |
| :------------ | -------- | ------- | -------------------- |
| **showPanel** | `number` | `0`     | The initial monitor. |
