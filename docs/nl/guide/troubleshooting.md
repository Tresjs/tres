# De hilarische gids van vaak voorkomende issues en hoe ze op te lossen

![Problemen oplossen](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

Welkom bij **TresJS v2 probleemoplossingsgids**. Waar 3D staat voor _"Dazzlingly Delightful Difficulties"_! We weten dat 3D zo complex kan zijn als een verwarde bol garen 🧶 of zo onvoorspelbaar als een kat op een toetsenbord 🐈 ⌨️, maar wees niet bang!

Deze handleiding is bedoeld om u te helpen bij het oplossen van de meest voorkomende problemen die u kunt tegenkomen bij het gebruik van TresJS v2.

## Ik kan mijn 3D scene niet zien 😭!

Je hebt de [Getting started guide](/nl/guide/getting-started.md) gevolgd, maar nog steeds kan je je scene niet gerendered zien.

Dit zijn de meest waarschijnlijke redenen waarom je je scene niet ziet:

### Controleer de hoogte van je canvas 📏

Een ander veelvoorkomend probleem is dat de component `TresCanvas` standaard een `canvas` element aanmaakt dat de `width` en `height` van het bovenliggende element aanneemt. Als het bovenliggende element geen hoogte heeft, heeft het canvas ook geen hoogte.

![No height found](/canvas-height.png)

Je zal ook deze error in de console zien:

![Canvas height warning](/canvas-height-warning.png)

Een gemakkelijke manier om dit te fixen is door de hoogte van de parent op `100%` te zetten:

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

Of je kan de `window-size` prop of the `TresCanvas` component zetten:

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Failed resolve component: TresComponent... 🤔

![](/failed-to-resolve-component.png)

Omdat **TresJS v2** een custom Vue-renderer in de main Vue App gebruikt, zal de core Vue renderer die als ouder fungeert de componenten in de component `TresCanvas` niet herkennen. Zelfs als dit geen invloed heeft op de weergave, wordt er een waarschuwing weergegeven in de console.

![](/failed-to-resolve-component.png)

Op dit moment is er geen native Vue-ondersteuning om de renderer te definiëren die wordt gebruikt op de `<template />`, maar er is een snelle oplossing om de waarschuwingen te verwijderen

Ga naar je `vite.config.ts` en voeg de volgende configuratie toe aan `@vitejs/plugin-vue`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Andere config
      ...templateCompilerOptions,
    }),
  ],
})
```

Dit zal de waarschuwing verwijderen uit de console.

# Help ons om TresJS Purr-fect te maken! 😼

We weten dat zelfs de beste kattenluiers af en toe fouten maken, en we hebben jouw hulp nodig om TresJS nog beter te maken! Als je een bug vindt, open dan een ticket op [the
repo](https://github.com/Tresjs/playground) en **geef een reproductielink op**.

::: warning
Tickets zonder reproductielink worden gesloten.
:::

Ons team van coderende kattenliefhebbers
zal in actie komen om die vervelende bugs te elimineren en TresJS voor iedereen te verbeteren. Laten we samen van TresJS de kat maken
miauw van 3D-weergave in Vue!
