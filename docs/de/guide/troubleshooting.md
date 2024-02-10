# Der unterhaltsame Leitfaden für häufige Probleme und deren Lösungen

![Problembehandlung](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

Willkommen beim Troubleshooting-Guide für **TresJS v2**. Wo 3D für _"Dazzlingly Delicious Difficulties"_ steht! Wir wissen, dass 3D so komplex wie ein verwickelter Wollknäuel 🧶 oder so unberechenbar wie eine Katze auf einer Tastatur 🐈 ⌨️ sein kann, aber keine Sorge!

Dieser Leitfaden soll dir helfen, die häufigsten Probleme zu lösen, die du beim Einsatz von TresJS v2 treffen könntest.

## Ich kann meine 3D-Szene nicht sehen 😭!

Du hast der [Startanleitung](/de/guide/getting-started.md) gefolgt, kannst aber deine gerenderte Szene immer noch nicht sehen.

Hier sind die häufigsten Gründe, warum du deine Szene möglicherweise nicht sehen kannst:

### Überprüfe die Höhe deines Canvas 📏

Ein weiteres häufiges Problem ist, dass die Komponente `TresCanvas` standardmäßig ein `canvas`-Element erstellt, das die `width` und `height` des Elternelements übernimmt. Wenn das Elternelement keine Höhe hat, wird auch das Canvas keine Höhe haben.

![No se encontró altura](/canvas-height.png)

Du wirst auch diesen Fehler in der Konsole sehen:

![Advertencia de altura del lienzo](/canvas-height-warning.png)

Eine einfache Lösung dafür ist, die Höhe des Elternelements auf `100%` zu setzen:

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}
```

Oder du kannst auch die Eigenschaft `window-size` der Komponente `TresCanvas` setzen:

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Fehler beim Auflösen des Komponenten: TresComponent...

![](/failed-to-resolve-component.png)

Da **TresJS v2** einen benutzerdefinierten Vue-Renderer innerhalb der Hauptinstanz der Vue-Anwendung verwendet, wird der Hauptrenderer von Vue, der als Elternteil fungiert, die Komponenten innerhalb der Komponente `TresCanvas` nicht erkennen. Obwohl es die Darstellung nicht beeinträchtigt, wird eine Warnung in der Konsole angezeigt.

![](/failed-to-resolve-component.png)

Derzeit gibt es keine native Unterstützung von Vue, um den verwendeten Renderer im `<template />`-Tag zu definieren, aber es gibt eine schnelle Lösung, um die Warnungen zu entfernen.

Gehe zu deiner Datei `vite.config.ts` und füge die folgende Konfiguration zum `@vitejs/plugin-vue` hinzu:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
})
```

Das wird die Warnung in der Konsole entfernen.

# Hilf uns, TresJS miau-tastisch zu machen! 😼

Wir wissen, dass selbst die besten Schlafkatzen gelegentlich Fehler machen, und wir brauchen deine Hilfe, um TresJS noch besser zu machen! Wenn du einen Fehler findest, eröffne bitte ein Ticket im [Repository](https://github.com/Tresjs/playground) und **bitte stelle einen Reproduktionslink bereit**.

::: warning
Tickets ohne einen Reproduktionslink werden geschlossen.
:::

Unser Team aus katzenliebenden Entwicklern wird in Aktion treten, um diese lästigen Fehler zu beseitigen und TresJS für alle zu verbessern. Zusammen können wir TresJS zum Schnurren des 3D-Renderings in Vue machen!