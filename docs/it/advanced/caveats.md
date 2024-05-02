# Avvertenze 😱

Il nostro obiettivo è fornire un modo semplice di utilizzare ThreeJS in VueJS con la migliore esperienza di sviluppo possibile. Tuttavia, ci sono alcuni avvertimenti di cui dovresti essere a conoscenza.

## ~~HMR and ThreeJS~~

:::info

Questo è stato risolto in **TresJS** v1.7.0 🎉. Ora è possibile utilizzare HMR senza ricaricare la pagina 🥹.

:::

La sostituzione del modulo hot (HMR) è una funzionalità che consente di aggiornare il codice senza ricaricare la pagina. Questa è una grande caratteristica che rende lo sviluppo molto più veloce. **TresJS** utilizza [Vite](https://vitejs.dev/). Tuttavia, è davvero difficile farlo funzionare correttamente con ThreeJS.

Perché? Perché Tres costruisce la scena in modo dichiarativo. Questo significa che crea l'istanza e la aggiunge alla scena quando il componente è montato. La complessità viene a sapere quando rimuovere l'istanza dalla scena e quando aggiungerla di nuovo.

Sebbene sia implementato un flusso di lavoro di smaltimento minimo, non è perfetto. Ciò significa che a volte si dovrà ricaricare la pagina per vedere le modifiche correttamente, specialmente quando si fa riferimento a un'istanza usando [Template Refs](https://v3.vuejs.org/guide/component-template-refs.html)

```vue
<script setup lang="ts">
const boxRef: Ref<TresInstance | null> = ref(null);

onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01;
    boxRef.value.rotation.z = elapsed * 0.2;
  }
});
</script>

<template>
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

Se si cambia l'attributo `color` del componente `TresMeshStandardMaterial` , si vedrà che la modifica viene applicata ma la rotazione non funziona più. Questo perché l'istanza è disposto e creato di nuovo.

:::tip
Così come **regola empirica** dovresti ricaricare la pagina ogni volta che non vedi le tue modifiche riflesse.
:::

Detto questo stiamo lavorando su una soluzione migliore per questo 😁. Se avete qualche idea su come risolvere questo, fatecelo sapere.

Puoi seguire la discussione in [HMR Disposal Discussion](https://github.com/Tresjs/tres/issues/23)

## Reattività

Noi tutti amiamo la reattività 💚. È una delle caratteristiche più potenti di VueJS. Tuttavia, dobbiamo essere consapevoli di esso quando si utilizza ThreeJS.

La reattività Vue si basa su [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Questo permette a Vue 3 di tracciare automaticamente le modifiche agli oggetti dati e aggiornare i corrispondenti elementi DOM ogni volta che i dati cambiano.

Dal momento che stiamo visualizzando una scena e aggiornandola in ogni fotogramma, ad esempio con un tasso di 60FPS questo significa che stiamo aggiornando la scena 60 volte al secondo. Se l'oggetto da aggiornare è reattivo, Vue tenterà di aggiornare l'oggetto impostato 60 volte. Questa non è una buona idea 😅 e sarà dannosa per le prestazioni.

Ecco un benchmark della differenza tra l'utilizzo di un oggetto proxy e un oggetto normale.

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - Esecuzioni al secondo Plan Object vs Proxy. </figcaption>
</figure>

Fonte: [Proxy vs oggetto normale](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vsxy-vs-proxy-proxy-setter)

Se siete costretti ad usare la reattività, usate [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

A differenza di `ref()`, il valore interno di un ref superficiale è immagazzinato ed esposto così com'è, e non sarà reso profondamente reattivo. Solo il . l'accesso al valore è reattivo. Fonte [VueJS Docs](https://vuejs.org/api/reactivity-advanced.html#shallowref)

### Esempio

❌ Sbagliato

```vue
<script setup lang="ts">
const position = reactive({ x: 0, y: 0, z: 0 });

onLoop(({ _delta, elapsed }) => {
  position.x = Math.sin(elapsed * 0.1) * 3;
});
</script>

<template>
  <TresMesh :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

✅ Corretto

```vue
<script setup lang="ts">
const position = { x: 0, y: 0, z: 0 };
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);

onLoop(({ _delta, elapsed }) => {
  boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3;
});
</script>

<template>
  <TresMesh ref="boxRef" :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```
