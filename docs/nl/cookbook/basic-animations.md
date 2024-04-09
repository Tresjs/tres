---
title: Basis Animaties
description: Hoe u de useRenderLoop-composable gebruikt om uw objecten te animeren.
author: alvarosabu
thumbnail: /recipes/animations.png
difficulty: 0
---

# Basis Animaties

Deze gids helpt je op weg met basisanimaties in TresJS.

We zullen een eenvoudige scène bouwen met een kubus. Vervolgens zullen we de kubus animeren om rond de Y- en Z-as te roteren.

<SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />

## useRenderLoop

De composable `useRenderLoop` is de kern van TresJS-animaties. Hiermee kunt u een callback registreren die wordt aangeroepen telkens wanneer de renderer de scène bijwerkt met de refresh rate van de browser.

Voor een gedetailleerde uitleg over hoe het werkt, raadpleegt u de documentatie [useRenderLoop](/nl/api/composables#userenderloop).

```ts
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  // Ik run elke frame op ~ 60FPS (depending of your monitor)
})
```

## De reference naar de kubus verkrijgen

Om de kubus te animeren, moeten we er een reference naar krijgen. We kunnen dit doen door een [Template Ref](https://vuejs.org/guide/essentials/template-refs.html) door te geven met behulp van de `ref` prop aan de `TresMesh` component. Hiermee wordt de THREE-instantie returned.

Om de prestaties te verbeteren, zullen we een [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) gebruiken om de referentie op te slaan in plaats van een gewone Ref. Ontdek [hier] waarom (../advanced/caveats.md#reactivity)

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

## De kubus animeren

Nu we een verwijzing naar de kubus hebben, kunnen we deze animeren. We zullen de `onLoop` callback gebruiken om de rotatie van de kubus bij te werken.

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

Je kan ook de `delta` van de interne [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) gebruiken of de `elapsed` om de kubus te animeren.

## Maar waarom gebruiken we geen reactiviteit?

Je vraagt je misschien af waarom we geen reactiviteit gebruiken om de kubus te animeren. Het antwoord is simpel: prestaties.

```vue
// Dit is een slecht idee ❌
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRotation = reactive([0, 0, 0])

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta
  boxRotation[2] = elapsed * 0.2
})
</script>
```

We kunnen in de verleiding komen om reactiviteit te gebruiken om de kubus te animeren. Maar het zou een slecht idee zijn.
De reden is dat [Vue's reactivity is gebaseerd op Proxies](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue) en niet is ontworpen om te worden gebruikt in een render loop die 60 of meer keer per seconde wordt bijgewerkt.

De onderstaande ingesloten pagina toont de [benchmark van een proxy versus een gewoon object](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). Zoals u kunt zien, is de proxy 5 keer langzamer dan het reguliere object.

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

U kunt hier meer over lezen in de sectie [Caveats](../advanced/caveats.md#reactivity).
