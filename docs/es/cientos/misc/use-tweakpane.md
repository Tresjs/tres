# useTweakPane

[TweakPane](https://cocopon.github.io/tweakpane/) es una biblioteca de JavaScript para crear un user interface para modificar values de variables de JavaScript. Es una herramienta excelente para afinar parámetros y monitorizar en tus aplicaciones three.js.

**TresJS** provee un composable se llama  `useTweakPane` que crea un Tweakpane panel por un envase para que a lo puedes añadir modificaciones. Por defecto, se crea el panel en la esquina en el extremo superior derecho del canvas y incluye un monitor gráfico de FPS para echar un ojo del rendimiento de la escena.

::: info
Puedes cambiar el envase del panel por pasar el `selector` opción a la función `useTweakPane`.
:::

## Utilización básica

```ts
import { useTweakPane } from '@tresjs/cientos'

const { pane } = useTweakPane()

const experiment = reactive({
  clearColor: '#000000',
  alpha: true,
  shadow: true,
})

pane.addInput(experiment, 'clearColor', {
  label: 'Clear Color',
  colorMode: 'hex',
})

pane.addInput(experiment, 'alpha')
```

El resulto será algo como:

![](/use-tweakpane.png)

## Options

| Name         | Type     | Default     | Description                                                    |
| :----------- | -------- | ----------- | -------------------------------------------------------------- |
| **selector** | `string` | `undefined` | El selector del envase donde se creará el panel. |
