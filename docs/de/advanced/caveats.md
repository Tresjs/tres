# Warnhinweise 😱

Unser Ziel ist es, eine einfache Möglichkeit zu bieten, ThreeJS in VueJS mit der bestmöglichen Entwicklererfahrung zu nutzen. Es gibt jedoch einige Vorbehalte, derer du dir bewusst sein solltest.

## ~~HMR und ThreeJS~~

:::info

Dies wurde in **TresJS** v1.7.0 🎉 behoben. Jetzt kannst du HMR nutzen, ohne die Seite neu laden zu müssen 🥹.

:::

Die Hot Module Replacement (HMR) ist eine Funktion, die es dir erlaubt, deinen Code zu aktualisieren, ohne die Seite neu zu laden. Dies ist eine großartige Funktion, die die Entwicklung viel schneller macht. **TresJS** verwendet [Vite](https://vitejs.dev/). Es ist jedoch wirklich kompliziert, dies korrekt mit ThreeJS zu bewerkstelligen.

Warum? Weil Tres die Szene deklarativ aufbaut. Das bedeutet, dass es die Instanz erstellt und der Szene hinzufügt, wenn die Komponente gemountet wird. Die Komplexität liegt darin zu wissen, wann die Instanz aus der Szene entfernt und wann sie wieder hinzugefügt werden soll.

Obwohl ein minimaler Löschfluss implementiert wurde, ist er nicht perfekt. Das bedeutet, dass du manchmal die Seite neu laden musst, um die Änderungen korrekt zu sehen, insbesondere wenn du Instanzen über [Template Refs](https://v3.vuejs.org/guide/component-template-refs.html) referenzierst.


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

Wenn du eine Änderung an der `color`-Eigenschaft des `TresMeshStandardMaterial`-Komponenten vornimmst, wirst du sehen, dass die Änderung angewendet wird, aber die Rotation funktioniert nicht mehr. Dies liegt daran, dass die Instanz entfernt und neu erstellt wird.

:::tip
Also, als **Faustregel**, solltest du die Seite neu laden, wenn du die von dir vorgenommenen Änderungen nicht siehst.
:::

Mit dem gesagt, arbeiten wir an einer besseren Lösung dafür 😁. Wenn du eine Idee hast, wie man dies lösen könnte, lass es uns bitte wissen.

Du kannst der Diskussion in [HMR Disposal Discussion](https://github.com/Tresjs/tres/issues/23) folgen.

## Reaktivität

Wir alle lieben Reaktivität 💚. Es ist eines der mächtigsten Features von VueJS. Allerdings sollten wir vorsichtig sein, wenn wir ThreeJS verwenden.

Die Reaktivität von Vue basiert auf [Proxy](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Dies ermöglicht es Vue 3, automatisch Änderungen an Datenobjekten zu verfolgen und die entsprechenden DOM-Elemente jedes Mal zu aktualisieren, wenn sich die Daten ändern.

Da wir eine Szene rendern und sie bei jedem Frame (60FPS) aktualisieren, bedeutet das, dass wir die Szene 60 Mal pro Sekunde aktualisieren. Wenn das zu aktualisierende Objekt reaktiv ist, wird Vue versuchen, dieses Objekt so oft zu aktualisieren. Das ist keine gute Idee 😅 und wird sich negativ auf die Leistung auswirken.

Hier ist ein Benchmark, der den Unterschied zwischen der Verwendung eines Proxy-Objekts und eines einfachen Objekts zeigt.

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - Ausführungen pro Sekunde: Objekt vs Proxy. </figcaption>
</figure>

Quelle: [Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

Wenn du gezwungen bist, Reaktivität zu nutzen, verwende [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref).

Im Gegensatz zu `ref()` wird der innere Wert eines shallow ref gespeichert und so wie er ist exponiert, und es findet keine tiefe Reaktivität statt. Nur der Zugriff auf `.value` ist reaktiv. Quelle: [VueJS Docs](https://vuejs.org/api/reactivity-advanced.html#shallowref)

### Beispiel

❌ Falsch

```vue
<script setup lang="ts">
const position = reactive({ x: 0, y: 0, z: 0 })

onLoop(({ _delta, elapsed }) => {
  position.x = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh
    :position="position"
    cast-shadow
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

✅ Richtig

```vue
<script setup lang="ts">
const position = { x: 0, y: 0, z: 0 }
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)

onLoop(({ _delta, elapsed }) => {
  boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3
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
