# Composables

Die Composition API von Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) ermöglicht es dir, wiederverwendbare Logik und Hooks zu schreiben.

**TresJS** nutzt diese API, um eine Reihe von zusammensetzbaren Funktionen bereitzustellen, die verwendet werden können um zum Beispiel Animationen zu erstellen oder mit der Szene zu interagieren. Sie ermöglicht dir auch, komplexere Szenen zu erstellen, die mit reinen Vue-Komponenten (Texturen, Loader usw.) eventuell nicht möglich wären.

Der Kern von **TresJS** verwendet diese Composables auch intern, so dass du dieselbe API verwendest, die der Kern nutzt. Zum Beispiel verwenden Komponenten, die im internen Rendering-Loop aktualisiert werden müssen, das Composable `useRenderLoop`, um einen Callback zu registrieren, der bei jeder Aktualisierung der Szene durch den Renderer aufgerufen wird.

## useRenderLoop

Das Composable `useRenderLoop` ist der Kern der Animationen in **TresJS**. Es ermöglicht dir, einen Callback zu registrieren, der mit der nativen Bildwiederholrate aufgerufen wird. Dies ist das wichtigste Composable in **TresJS**.

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock, dt }) => {
  // Wird jeden Frame ausgeführt (60 FPS, abhängig vom Monitor)
})
```

::: warning
Achte auf die Performance-Auswirkungen beim Verwenden dieses Composables, da es bei jedem Frame ausgeführt wird. Wenn du also viel Logik in deinem Callback hast, könnte dies die Performance deiner Anwendung beeinträchtigen. Insbesondere, wenn du State oder reaktive Referenzen veränderst.
:::

Der `onLoop`-Callback erhält ein Objekt mit den folgenden, auf der [Uhr von THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock) basierenden Properties:

- `delta`: Die verstrichene Zeit zwischen dem aktuellen Frame und dem letzten Frame. Dies ist die Zeit in Sekunden seit dem letzten Frame.
- `elapsed`: Die verstrichene Zeit seit Beginn des Render-Loops.

Dieses Composable basiert auf `useRafFn` von [vueuse](https://vueuse.org/core/useRafFn/). Danke an [@wheatjs](https://github.com/wheatjs) für diesen wundervollen Beitrag.

### Vor und nach dem Rendern

Es gibt jeweils zwei Callbacks die aufgerufen werden, vor und nachdem der Render die Szene aktualisiert. Dies ist nützlich, wenn du beispielsweise einen Profiler hinzufügst, um die FPS zu messen.

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop()

onBeforeLoop(({ delta, elapsed }) => {
  // Wird ausgeführt bevor der Renderer die Szene aktualisiert
  fps.begin()
})

onAfterLoop(({ delta, elapsed }) => {
  // Wird ausgeführt nachdem der Renderer die Szene aktualisiert hat
  fps.end()
})
```

### Pausieren und Fortsetzen

Du kannst den Rendering-Loop mit den Methoden `pause` und `resume` pausieren und fortsetzen.

```ts
const { pause, resume } = useRenderLoop()

// Rendering-Loop pausieren
pause()

// Rendering-Loop fortsetzen
resume()
```

Du kannst auch den aktiven Status des Rendering-Loops mit der Property `isActive` abfragen.

```ts
const { resume, isActive } = useRenderLoop()

console.log(isActive) // false

resume()

console.log(isActive) // true
```

## useLoader

Das Composable `useLoader` ermöglicht es dir, Ressourcen mit den [Loadern von THREE.js](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models) zu laden. Es gibt ein Promise mit der geladenen Ressource zurück.

```ts
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(THREE.GLTFLoader, 'path/to/asset.gltf')
```

Da das Composable `useLoader` ein Promise zurückgibt, kannst du es mit `async/await` oder `then/catch` verwenden. Stelle sicher, dass du die Komponente im Template mit einer `Suspense`-Komponente umgibst. Siehe [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) für mehr Informationen.

```vue{2,4}
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

Das Composable `useTexture` ermöglicht es dir, Texturen mit dem [Texture Loader von THREE.js](https://threejs.org/docs/#api/en/loaders/TextureLoader) zu laden. Es gibt ein Promise mit der/den geladenen Textur(en) zurück.

```ts
const texture = await useTexture(['path/to/texture.png'])
```

**useTexture** akzeptiert auch ein Objekt mit den folgenden Properties:

- `map`: Eine Basistextur, die auf die Oberfläche eines Objekts angewendet wird
- `displacementMap`: Eine Textur, die verwendet wird, um Beulen oder Einbuchtungen auf der Oberfläche des Objekts hinzuzufügen
- `normalMap`: Eine Textur, die verwendet wird, um Oberflächendetails und Schattierungsvariationen am Objekt hinzuzufügen
- `roughnessMap`: Eine Textur, die verwendet wird, um Rauheit oder ein mattes Finish auf der Oberfläche des Objekts hinzuzufügen
- `metalnessMap`: Eine Textur, die verwendet wird, um einen metallischen Effekt auf der Oberfläche des Objekts hinzuzufügen
- `aoMap`: Eine Textur, die verwendet wird, um Ambient Occlusion (Schattierung in Bereichen, wo Licht durch andere Objekte blockiert wird) am Objekt hinzuzufügen
- `alphaMap`: Eine Textur, die verwendet wird, um Transparenz hinzuzufügen (der schwarze Teil wird als transparent gerendert). Um diese "Map" zu verwenden, ist es notwendig, :transparent="true" im Material zu setzen
- `matcap`: Diese Textur kodiert die Farbe und Schattierung des Materials

In diesem Fall gibt es ein Objekt mit den geladenen Texturen zurück.

```ts
const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap, alphaMap, matcap } = await useTexture({
  map: 'path/to/albedo.png',
  displacementMap: 'path/to/height.png',
  normalMap: 'path/to/normal.png',
  roughnessMap: 'path/to/roughness.png',
  metalnessMap: 'path/to/metalness.png',
  aoMap: 'path/to/ambien-occlusion.png',
  alphaMap: 'path/to/alpha.png',
  matcap: 'path/to/matcap.png',
})
```

Dann kannst du die Texturen an das Material binden.

```vue
<template>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial
        :map="map"
        :displacement-map="displacementMap"
        :normal-map="normalMap"
        :roughness-map="roughnessMap"
        :metalness-map="metalnessMap"
        :ao-map="aoMap"
        :alpha-map="alphaMap"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

Ähnlich wie das vorherige Composable gibt das `useTexture`-Composable ein Promise zurück, das du mit `async/await` oder `then/catch` verwenden kannst. Auch hier solltest du es im Template innerhalb einer `Suspense`-Komponente verwenden.

## useSeek

Das Composable `useSeek` bietet Hilfsmittel, um leicht durch komplexe Three.js-Szenen und Objektgrafiken zu navigieren. Es exportiert 4 Funktionen, die es dir ermöglichen, Objekte basierend auf spezifischen Properties zu finden.

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek()
```

Die Funktion `seek` akzeptiert drei Parameter:

- `parent`: Eine Three.js-Szene oder Object3D.
- `property`: Die Property, die für die Suchbedingung verwendet wird.
- `value`: Der Wert der Property, mit dem abgeglichen wird.

Die Funktionen `seek` und `seekByName` durchsuchen das Objekt nach einem Kindobjekt mit den angegebenen Parametern. Wenn kein Kind mit der passenden Property und  Wert gefunden wird, geben sie `null` zurück und zeigen eine Warnung.

```ts
const carRef = ref(null)

watch(carRef, ({ model }) => {
  if (model) {
    const car = model.children[0]

    const body = seek(car, 'name', 'Octane_Octane_Body_0')
    body.color.set(new Color('blue'))
  }
})
```

Ähnlich geben die Funktionen `seekAll` und `seekAllByName` ein Array von Kindobjekten zurück, deren Property den gegebenen Wert enthält. Wenn keine Übereinstimmungen gefunden werden, geben sie ein leeres Array zurück und zeigen eine Warnung.

```ts
const character = ref(null)

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, 'Bone')
  }
})
```

## useTresContext

Dieses Composable bietet Zugriff auf den Kontext, der mehrere nützliche Properties enthält.

```ts
const { camera, renderer, camera, cameras } = useTresContext()
```

::: warning
`useTresContext` kann nur innerhalb eines `TresCanvas` verwendet werden, da `TresCanvas` als Anbieter der Kontextdaten fungiert. Verwende [den von TresCanvas bereitgestellten Kontext](tres-canvas#offentlich-exportierte-properties), wenn du in Komponenten darauf zugreifen musst, die über den TresCanvas hinausgehen.
:::

```vue
<TresCanvas>
  <MyModel />
</TresCanvas>
```

```vue
// MyModel.vue

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'

const context = useTresContext()
</script>
```

### Kontexteigenschaften

| Eigenschaft | Beschreibung |
| --- | --- |
| **camera** | die aktuell aktive Kamera |
| **cameras** | die Kameras, die in der Szene vorhanden sind |
| **controls** | die Steuerungen deiner Szene |
| **deregisterCamera** | eine Methode zum de-registrieren einer Kamera. Dies ist nur notwendig, wenn du eine Kamera manuell erstellst. Kameras im Template werden automatisch de-registriert. |
| **extend** | Erweitert den Katalog der Komponenten. Siehe [Erweiterung](/de/advanced/extending) |
| **raycaster** | der globale Raycaster, der für Zeigereignisse verwendet wird |
| **registerCamera** | eine Methode zum Registrieren einer Kamera. Dies ist nur notwendig, wenn du eine Kamera manuell erstellst. Kameras im Template werden automatisch registriert. |
| **renderer** | der [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) deiner Szene |
| **scene** | die [Szene](https://threejs.org/docs/?q=sce#api/en/scenes/Scene) |
| **setCameraActive** | eine Methode, um eine Kamera als aktiv zu setzen |
| **sizes** | enthält die Breite, Höhe und das Seitenverhältnis deines Canvas |