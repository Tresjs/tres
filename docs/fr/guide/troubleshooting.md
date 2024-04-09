# Le drôle de guide sur les problèmes communs et comment les résoudre

![Solution aux problemes](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

Bienvenue dans le guide de résolution de problèmes de **TresJS v2**. Où 3D veux dire _"Difficulté Déraisonnablement Délicieuse"_! Nous savons que la 3D peut être aussi complèxe qu'une pelotte de laine 🧶 ou aussi imprévisible qu'un chat sur un clavier 🐈 ⌨️, mais n'ayez crainte!

Ce guide a pour vocation de vous aider à résoudre les problèmes les plus communs que vous pourriez rencontrer en utilisant TresJS v2.

## Je ne vois pas ma scène 3D 😭!

Vous avez suivi l'[introduction](/guide/getting-started.md) mais vous n'avez toujours aucun rendu de votre scène.

Voici les raisons les plus courantes qui pourraient expliquer pourquoi votre scène n'est toujours pas visible:

### Verifiez la taille de votre canvas 📏

Rappelez vous que l'élément `TresCanvas` prendra la `hauteur` et la `largeur` de l'élément parent. Si l'élément parent n'a pas de hauteur, le canvas n'en aura pas non plus.

![Pas de hauteur](/canvas-height.png)

Vous aurez aussi cette erreur dans la console:

![Avertissement sur la hauteur du canvas](/canvas-height-warning.png)

Le plus simple pour résoudre ce souci est de donner à l'élément parent une hauteur de `100%`:

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

Ou vous pouvez utiliser la propriété `window-size` du composant `TresCanvas`:

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Impossible de résoudre le composant: TresComponent...

![](/failed-to-resolve-component.png)

Étant donné que **TresJS v2** utilise un moteur de rendu Personnalisé au sein de l'instance principale de l'application Vue, le moteur de rendu principal de Vue, agissant comme un parent, ne reconnaitra pas les composants au sein de `TresCanvas`. Même si cela n'a aucun effet sur le rendu, cela affichera un avertissement dans la console.

![](/failed-to-resolve-component.png)

Actuellement, il n'est pas possible de définir nativement un autre moteur de rendu pour le `<template />`, mais voici la solution pour éviter les avertissements.

Dans votre `vite.config.ts`, ajoutez la configuration pour le plugin `@vitejs/plugin-vue`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Autres configs
      ...templateCompilerOptions,
    }),
  ],
})
```

Ceci retirera les avertissements dans la console.

# Aidez nous à faire en sorte que TresJS soit purr-fait! 😼

Nous savons que même les meilleurs font parfois des erreurs, et nous avons besoin de votre aide pour rendre TresJS encore meilleur ! Si vous trouvez un bug, veuillez ouvrir un ticket sur [le dépôt](https://github.com/Tresjs/playground) et **fournir un lien de reproduction.**

::: warning
Les tickets sans lien de reproduction seront fermés
:::

Notre équipe de développeurs amoureux des chats passera à l'action pour éliminer ces bugs embêtants et améliorer TresJS pour tout le monde. Ensemble, faisons de TresJS le miaulement de chat du rendu 3D dans Vue !
