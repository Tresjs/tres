# Composables

Die Composition API von Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) ermöglicht es dir, Logik und Hooks zu schreiben, die zwischen Komponenten wiederverwendet werden kann.

**TresJS** nutzt diese API, um eine Reihe von zusammensetzbaren Funktionen zu erstellen, die verwendet werden können, zum Beispiel um Animationen zu erstellen oder mit der Szene zu interagieren. Es ermöglicht dir auch, komplexere Szenen zu erstellen, die nur mit Vue-Komponenten (Texturen, Loader usw.) eventuell nicht möglich wären.

Der Kern von **TresJS** verwendet diese Composables intern, so dass du dieselbe API verwendest, die der Kern nutzt. Zum Beispiel verwenden Komponenten, die im internen Rendering-Loop aktualisiert werden müssen, das Composable `useRenderLoop`, um einen Callback zu registrieren, der bei jeder Aktualisierung der Szene durch den Renderer aufgerufen wird.

## useRenderLoop

Das Composable `useRenderLoop` ist der Kern der Animationen in **TresJS**. Es ermöglicht dir, einen Callback zu registrieren, der mit der nativen Bildwiederholrate aufgerufen wird. Dies ist das wichtigste Composable in **TresJS**.

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock, dt }) => {
  // Wird jeden Frame ausgeführt (60 FPS, abhängig vom Monitor)
})
```

::: warning
Beachte die Performance-Auswirkungen beim Verwenden dieses Composables. Es wird bei jedem Frame ausgeführt. Das bedeutet, wenn du viel Logik in deinem Callback hast, dies die Performance deiner Anwendung beeinträchtigen könnte. Insbesondere, wenn du States oder reaktive Referenzen aktualisierst.
:::

Der `onLoop`-Callback erhält ein Objekt mit den folgenden, auf der [Uhr von THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock) basierenden Eigenschaften:

- `delta`: Die verstrichene Zeit zwischen dem aktuellen Frame und dem letzten Frame. Dies ist die Zeit in Sekunden seit dem letzten Frame.
- `elapsed`: Die seit Beginn des Render-Loops verstrichene Zeit.

Dieses Composable basiert auf `useRafFn` von [vueuse](https://vueuse.org/core/useRafFn/). Dank an [@wheatjs](https://github.com/orgs/Tresjs/people/wheatjs) für diesen wundervollen Beitrag.

### Vor und nach dem Rendern

Du kannst auch einen Callback registrieren, der aufgerufen wird, bevor und nachdem der Renderer die Szene aktualisiert. Dies ist nützlich, wenn du beispielsweise einen Profiler hinzufügst, um die FPS zu messen.

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

Du kannst auch den aktiven Status des Rendering-Loops mit der Eigenschaft `isActive` abfragen.

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

Da das Composable `useLoader` ein Promise zurückgibt, kannst du es mit `async/await` oder `then/catch` verwenden. Wenn du es in einer Komponente verwendest, stelle sicher, dass du es mit einer `Suspense`-Komponente umgibst. Siehe [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) für mehr Informationen.

```vue
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

**useTexture** akzeptiert auch ein Objekt mit den folgenden Eigenschaften:

- `map`: Eine Basistextur, die auf die Oberfläche eines Objekts angewendet wird
- `displacementMap`: Eine Textur, die verwendet wird, um Beulen oder Einbuchtungen auf der Oberfläche des Objekts hinzuzufügen
- `normalMap`: Eine Textur, die verwendet wird, um Oberflächendetails und Schattierungsvariationen am Objekt hinzuzufügen
- `roughnessMap`: Eine Textur, die verwendet wird, um Rauheit oder ein mattes Finish auf der Oberfläche des Objekts hinzuzufügen
- `metalnessMap`: Eine Textur, die verwendet wird, um einen metallischen Effekt auf der Oberfläche des Objekts hinzuzufügen
- `aoMap`: Eine Textur, die verwendet wird, um Ambient Occlusion (Schattierung in Bereichen, wo Licht durch andere Objekte blockiert wird) am Objekt hinzuzufügen
- `alphaMap`: Eine Textur, die verwendet wird, um Transparenz hinzuzufügen (der schwarze Teil wird als transparent gerendert). Es ist notwendig, :transparent="true" im Material zu setzen, um diese "Map" zu verwenden
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

Ähnlich wie das vorherige Composable gibt das `useTexture`-Composable ein Promise zurück, das du mit `async/await` oder `then/catch` verwenden kannst. Wenn du es in einer Komponente verwendest, stelle sicher, dass du es mit einer `Suspense`-Komponente umgibst.

## useSeek

Das Composable `useSeek` bietet Hilfsmittel, um leicht durch komplexe Three.js-Szenen und Objektgrafiken zu navigieren. Es exportiert 4 Funktionen, die es dir ermöglichen, Kindobjekte basierend auf spezifischen Eigenschaften zu finden.

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek()
```

Die Funktion `seek` akzeptiert drei Parameter:

- `parent`: Eine Three.js-Szene oder Object3D.
- `property`: Die Eigenschaft, die für die Suchbedingung verwendet wird.
- `value`: Der Wert der Eigenschaft, mit dem abgeglichen wird.

Die Funktionen `seek` und `seekByName` durchsuchen das Objekt und geben das Kindobjekt mit der angegebenen Eigenschaft und dem Wert zurück. Wenn kein Kind mit der gegebenen Eigenschaft und dem Wert gefunden wird, gibt es null zurück und registriert eine Warnung.

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

Ähnlich geben die Funktionen `seekAll` und `seekAllByName` ein Array von Kindobjekten zurück, deren Eigenschaft den gegebenen Wert enthält. Wenn keine Übereinstimmungen gefunden werden, geben sie ein leeres Array zurück und zeigen eine Warnung.

```ts
const character = ref(null)

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, 'Bone')
  }
})
```

## useTresContext

Dieses Composable bietet Zugriff auf den Kontext, der mehrere nützliche Eigenschaften enthält.

```ts
const { camera, renderer, camera, cameras } = useTresContext()
```

::: warning
`useTresContext` kann nur innerhalb eines `TresCanvas` verwendet werden, da `TresCanvas` als Anbieter der Kontextdaten fungiert. Verwende [den von TresCanvas bereitgestellten Kontext](tres-canvas#offentlich-exportierte-eigenschaften), wenn du in Komponenten darauf zugreifen musst, die über den TresCanvas hinausgehen.
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
| **deregisterCamera** | eine Methode zum de-registrieren einer Kamera. Dies ist nur notwendig, wenn du eine Kamera manuell erstellst. Kameras im Template werden automatisch registriert. |
| **extend** | Erweitert den Katalog der Komponenten. Siehe [Erweiterung](/advanced/extending) |
| **raycaster** | der globale Raycaster, der für Zeigereignisse verwendet wird |
| **registerCamera** | eine Methode zum Registrieren einer Kamera. Dies ist nur notwendig, wenn du eine Kamera manuell erstellst. Kameras im Template werden automatisch registriert. |
| **renderer** | der [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) deiner Szene |
| **scene** | die [Szene](https://threejs.org/docs/?q=sce#api/en/scenes/Scene) |
| **setCameraActive** | eine Methode, um eine Kamera als aktiv zu setzen |
| **sizes** | enthält die Breite, Höhe und das Seitenverhältnis deines Canvas |