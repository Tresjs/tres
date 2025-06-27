---
title: Animations de bases
description: Comment utiliser le composable useRenderLoop pour animer vos objets.
author: alvarosabu
thumbnail: /recipes/animations.png
difficulty: 0
---

# Animations de bases

Ce guide vous aidera à démarrer avec les animations de base dans TresJS.

Nous allons construire une scène simple avec un cube. Nous animerons ensuite le cube pour qu'il tourne autour des axes Y et Z.

<SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />

## useRenderLoop

Le composable `useRenderLoop` est le cœur des animations dans TresJS. Vous permet d'enregistrer une fonction de rappel qui sera exécutée chaque fois que le moteur de rendu met à jour la scène à la fréquence de rafraîchissement du navigateur.

Pour une explication détaillée de son fonctionnement, consultez la documentation de [useRenderLoop](/api/composables#userenderloop).

```ts
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  // ~60FPS (Dépend de votre moniteur)
})
```

## Donner la référence au cube

Pour animer le cube, nous devons lui donner une référence. Nous pouvons le faire en passant un [Template Reference](https://vuejs.org/guide/essentials/template-refs.html) en utilisant la propriété `ref` dans le composant `TresMesh`. Cela renverra l’instance de THREE.

Pour améliorer les performances, nous utiliserons une [Shallow Reference](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) pour stocker la référence au lieu d'une référence régulière. Vous pouvez voir pourquoi [ici](../advanced/caveats.md#reactivity)

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)
</script>

<template>
  <TresCanvas>
    <TresMesh
      ref="boxRef"
      :scale="1"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## Animer le cube

Maintenant que nous avons une référence au cube, nous pouvons l'animer. Nous utiliserons le rappel `onLoop` pour mettre à jour la rotation du cube.

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

Vous pouvez également utiliser `delta` de [horloge interne de THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock) ou `elapsed` pour animer le cube.

## Mais pourquoi ne pas utiliser la réactivité ?

Vous vous demandez peut-être pourquoi nous n'utilisons pas la réactivité pour animer le cube. La réponse est simple : la performance.

```vue
// Esto es una mala idea ❌
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRotation = reactive([0, 0, 0])

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta
  boxRotation[2] = elapsed * 0.2
})
</script>
```

On peut être tenté d'utiliser la réactivité pour animer le cube. Mais ce serait une mauvaise idée.
La raison en est que [la réactivité de Vue est basée sur des proxys](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue) et n'est pas conçue pour être utilisée dans une boucle de rendu qui se met à jour 60 fois ou plus par seconde.

La page intégrée ci-dessous montre le [test de performances d'un proxy par rapport à un objet standard](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). Comme vous pouvez le constater, le proxy est 5 fois plus lent que l'objet standard.

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

Vous pouvez en savoir plus à ce sujet dans la section de [Mise en garde](../advanced/caveats.md#reactivity).
