# Un esilarante guida su come risolvere i problemi più comuni

![Troubleshooting](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

Benvenuti a **TresJS v2 guida alla risoluzione dei problemi**. Dove 3D sta per _"Dazzlingly Delightful Difficulties"_! Sappiamo che il 3D può essere complesso come un gomitolo 🧶 o imprevedibile come un gatto su una tastiera 🐈 ⌨️ , ma non temere!

Questa guida ha lo scopo di aiutarti a risolvere i problemi più comuni che potresti incontrare quando utilizzi TresJS v2.

## Non riesco a vedere la mia scena in 3D 😭!

Hai seguito la [Guida introduttiva](/guide/getting-started.md) ma ancora non riesci a vedere la tua scena resa.

Questi sono i motivi più comuni per cui potresti non essere in grado di vedere la tua scena:

### Controlla l'altezza del tuo canvas 📏

Un altro problema comune è che il componente `TresCanvas` sta creando di default un elemento `canvas` che prende il`width` e`height` dell'elemento parent. Se l'elemento parent non ha altezza, anche il canvas non avrà altezza.

![No height found](/canvas-height.png)

Vedrai anche questo errore nella console:

![Canvas height warning](/canvas-height-warning.png)

Un modo semplice per risolvere questo problema è impostare l'altezza dell'elemento parent a `100%`:

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

Oppure si può impostare la prop `window-size` del componente `TresCanvas` :

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Failed resolve component: TresComponent... 🤔

![](/failed-to-resolve-component.png)

Dato che **TresJS v2** sta usando un Vue Custom Renderer all'interno dell'istanza principale di Vue App, il renderer Vue principale che agisce da parent non riconoscerà i componenti all'interno del componente `TresCanvas` . Anche se non influisce sul rendering, mostrerà un avviso nella console.

![](/failed-to-resolve-component.png)

Al momento non c'è il supporto nativo Vue per definire il renderer usato sul `<template />` ma c'è una soluzione rapida per rimuovere gli avvisi

Vai al tuo `vite.config.ts` e aggiungi la seguente configurazione al `@vitejs/plugin-vue`:

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { templateCompilerOptions } from "@tresjs/core";

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
});
```

Questo rimuoverà l'avviso dalla console.

# Aiutaci a far diventare TresJS Purr-fetto! 😼

Sappiamo che anche i migliori pedofili occasionalmente commettono errori, e abbiamo bisogno del tuo aiuto per rendere TresJS ancora migliore! Se trovate un bug, aprite un ticket a [il
repo](https:///github.com/Tresjs/playground) e **si prega di fornire un link alla riproduzione**.

::: warning
I tickets senza link di riproduzione saranno chiusi.
:::

Our team of coding cat lovers
will jump into action to squash those pesky bugs and improve TresJS for everyone. Together, let's make TresJS the cat's
meow of 3D rendering in Vue!

Il nostro team di gatti che amano il codice entrerà in azione per schiacciare quei fastidiosi bug e migliorare TresJS per tutti. Insieme, facciamo TresJS il gatto miao di rendering 3D in Vue!
