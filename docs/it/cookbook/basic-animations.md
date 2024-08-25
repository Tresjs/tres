---
title: Animazioni base
description: Come usare il useRenderLoop composable per animare i tuoi oggetti.
author: alvarosabu
thumbnail: /recipes/animations.png
difficulty: 0
---

# Animazioni base

Questa guida ti aiuterà a iniziare con le animazioni di base in TresJS.

Costruiremo una scena semplice con un cubo. Poi animeremo il cubo per ruotare intorno all'asse Y e Z.

<SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />

## useRenderLoop

Il `useRenderLoop` composable è il cuore delle animazioni TresJS. Permette di registrare una callback che verrà chiamata ogni volta che il renderer aggiorna la scena con la frequenza di refresh del browser.

Per una spiegazione dettagliata di come funziona, fare riferimento alla documentazione [useRenderLoop](/api/composables#userenderloop).

```ts
const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  // Eseguirò ad ogni fotogramma ~ 60FPS (a seconda del monitor)
});
```

## Ottenere il riferimento al cubo

Per animare il cubo, abbiamo bisogno di un riferimento ad esso. Possiamo farlo passando a [Template Ref](https://vuejs.org/guide/essentials/template-refs.html) usando `ref` prop al componente `TresMesh` . Questo restituirà l'istanza THREE.

Per migliorare le prestazioni, useremo un [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) per memorizzare il riferimento invece di un Ref regolare. Vedere perché [qui](../advanced/caveats.md#reactivity)

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);
</script>

<template>
  <TresCanvas>
    <TresMesh ref="boxRef" :scale="1">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## Animare il cubo

Ora che abbiamo un riferimento al cubo, possiamo animarlo. Useremo la callback `onLoop` per aggiornare la rotazione del cubo.

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta;
    boxRef.value.rotation.z = elapsed * 0.2;
  }
});
```

Puoi anche usare il `delta` dall'interno [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) o il `elapsed` per animare il cubo.

## Ma perché non usare la reattività?

Ci si potrebbe chiedere perché non stiamo usando la reattività per animare il cubo. La risposta è semplice, prestazioni.

```vue
// Questa non è una buona idea ❌
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";

const boxRotation = reactive([0, 0, 0]);

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta;
  boxRotation[2] = elapsed * 0.2;
});
</script>
```

Possiamo essere tentati di usare la reattività per animare il cubo. Ma sarebbe una cattiva idea.
La ragione è che [la reattività di Vue è basata sui Proxy](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue) e non è progettata per essere utilizzata in un ciclo di rendering che aggiorna 60 o più volte al secondo.

La pagina sottostante mostra il [benchmark di un proxy vs un oggetto normale](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). Come puoi vedere, il proxy è 5 volte più lento dell'oggetto normale.

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

Si può leggere di più su questo nella sezione [Avvertenze](../advanced/caveats.md#reactivity).
