# Waarschuwingen 😱

Ons doel is om een eenvoudige manier te bieden om ThreeJS in VueJS te gebruiken met de best mogelijke ontwikkelaarservaring. Er zijn echter enkele kanttekeningen waar u rekening mee moet houden.

## ~~HMR and ThreeJS~~

:::info

Dit is gefixt in **TresJS** v1.7.0 🎉. Je kan nu HMR gebruiken zonder de pagina opnieuw te laden🥹.

:::

Hot module replacement (HMR) is een functie waarmee u uw code kunt bijwerken zonder de pagina opnieuw te laden. Dit is een geweldige functie die de ontwikkeling veel sneller maakt. **TresJS** gebruikt [Vite](https://vitejs.dev/). Het is echter erg lastig om het correct te laten werken met ThreeJS.

Waarom? Omdat Tres de scène op een declaratieve manier opbouwt. Dit betekent dat het de instantie maakt en deze aan de scène toevoegt wanneer de component wordt aangekoppeld. De complexiteit komt om te weten wanneer de instantie van de scène moet worden verwijderd en wanneer deze opnieuw moet worden toegevoegd.

Hoewel er een minimale verwijderingsworkflow is geïmplementeerd, is deze niet perfect. Dit betekent dat u soms de pagina opnieuw moet laden om de wijzigingen correct te zien, vooral wanneer u naar een exemplaar verwijst met behulp van [Template Refs](https://v3.vuejs.org/guide/component-template-refs.html)

```vue
<script setup lang="ts">
const boxRef: Ref<TresInstance | null> = ref(null)

onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
</script>

<template>
  <TresMesh
    ref="boxRef"
    :scale="1"
    cast-shadow
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

Als u het kenmerk `color` van de component `TresMeshStandardMaterial` wijzigt, zult u zien dat de wijziging wordt toegepast, maar dat de rotatie niet meer werkt. Dit komt omdat de instantie wordt verwijderd en opnieuw wordt gemaakt.

:::tip
Dus als **vuistregel** moet u de pagina opnieuw laden wanneer uw wijzigingen niet worden weergegeven.
:::

Dat gezegd hebbende, werken we aan een betere oplossing hiervoor 😁. Heeft u enig idee hoe u dit kunt oplossen, laat het ons dan weten.

Je kunt de discussie volgen in [HMR Disposal Discussion](https://github.com/Tresjs/tres/issues/23)

## Reactiviteit

We houden allemaal van reactiviteit 💚. Het is een van de krachtigste functies van VueJS. We moeten er echter rekening mee houden bij het gebruik van ThreeJS.

Vue-reactiviteit is gebaseerd op [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Hierdoor kan Vue 3 automatisch wijzigingen in data-objecten volgen en de bijbehorende DOM-elementen bijwerken wanneer de gegevens veranderen.

Omdat we een scène renderen en deze in elk frame bijwerken, bijvoorbeeld met een snelheid van 60 FPS, betekent dit dat we de scène 60 keer per seconde bijwerken. Als het te updaten object reactief is, zal Vue proberen het ingestelde object 60 keer bij te werken. Dit is geen goed idee 😅 en zal impact hebben op de prestaties.

Hier is een benchmark van het verschil tussen het gebruik van een Proxy-object en een gewoon object.

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - Executions per second Plan Object vs Proxy. </figcaption>
</figure>

Bron: [Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

Als je reactiviteit moet gebruiken, gebruik dan [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

In tegenstelling tot `ref()` wordt de innerlijke waarde van een ondiepe ref opgeslagen en weergegeven zoals hij is, en zal deze niet diep reactief worden gemaakt. Alleen de .value-toegang is reactief. Bron [VueJS Docs](https://vuejs.org/api/reactivity-advanced.html#shallowref)

### Voorbeeld

❌ Incorrect

```vue
<script setup lang="ts">
const position = reactive({ x: 0, y: 0, z: 0 })

onLoop(({ _delta, elapsed }) => {
  position.x = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

✅ Correct

```vue
<script setup lang="ts">
const position = { x: 0, y: 0, z: 0 }
const boxRef: ShallowRef<TresInstance | null>
  = shallowRef(null)

onLoop(({ _delta, elapsed }) => {
  boxRef.value.position.x
    = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh
    ref="boxRef"
    :position="position"
    cast-shadow
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```
