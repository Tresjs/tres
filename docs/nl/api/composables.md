# Composables

De Composition API van Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) stelt je in staat om herbruikbare logica te bouwen die met meerdere componenten gedeeld kan worden. Ook kun je custom hooks maken die je kan gebruiken in je componenten.

**TresJS** maakt enorm gebruik van deze API om een reeks samenstelbare functies te creëren die kunnen worden gebruikt om animaties te maken, interactie te hebben met de scène en meer. Hiermee kun je ook complexere scènes maken die misschien niet mogelijk zijn met alleen de Vue-componenten (texturen, laders, enz.).

De kern van **TresJS** gebruikt deze composables intern, dus u zou dezelfde API gebruiken als de kern. Componenten die moeten worden bijgewerkt op de interne renderlus, gebruiken bijvoorbeeld de `useRenderLoop` composable om een callback te registreren die elke keer wordt aangeroepen als de renderer de scène bijwerkt.

## useRenderLoop

De composable `useRenderLoop` is de kern van **TresJS**-animaties. Hiermee kunt u een callback registreren die wordt aangeroepen met de eigen refresh rate. Dit is de belangrijkste composable in **TresJS**.

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock }) => {
  // I will run at every frame ~60FPS (depending of your monitor)
})
```

::: warning
Houd rekening met de prestatie-implicaties van het gebruik van deze composable. Het wordt bij elk frame uitgevoerd, dus als je veel logica in je callback hebt, kan dit de prestaties van je app beïnvloeden. Vooral als u reactieve states of references bijwerkt.
:::

De `onLoop` callback ontvangt een object met de volgende eigenshappen gebaseerd op de [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock):

- `delta`: De deltatijd tussen het huidige en het laatste frame. Dit is de tijd in seconden sinds het laatste frame.
- `elapsed`: De verstreken tijd sinds het begin van de render loops.

Deze composable is gebaseerd op `useRafFn` van [vueuse](https://vueuse.org/core/useRafFn/). Met dank aan [@wheatjs](https://github.com/wheatjs) voor de geweldige bijdrage.

### Voor en na de render

U kunt ook een callback registreren die wordt aangeroepen vóór en nadat de renderer de scène heeft bijgewerkt. Dit is handig als je een profiler toevoegt om bijvoorbeeld de FPS te meten.

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop()

onBeforeLoop(({ delta, elapsed }) => {
  // Ik zal uitvoeren voordat de renderer de scène bijwerkt
  fps.begin()
})

onAfterLoop(({ delta, elapsed }) => {
  // Ik zal uitvoeren nadat de renderer de scène heeft bijgewerkt
  fps.end()
})
```

### Pauzeren en doorgaan

U kunt de weergavelus pauzeren en hervatten met behulp van de blootgestelde methoden `pause` en `resume`.

```ts
const { pause, resume } = useRenderLoop()

// Pauzeer de render loop
pause()

// Hervat de render loop
resume()
```

U kunt ook de actieve status van de render loop verkrijgen met behulp van de eigenschap `isActive`.

```ts
const { resume, isActive } = useRenderLoop()

console.log(isActive) // false

resume()

console.log(isActive) // true
```

## useLoader

De `useLoader` composable stelt je in staat assets the laden met behulp van de [THREE.js loaders](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models). Het returned een promise met geladen asset.

```ts
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(THREE.GLTFLoader, 'path/to/asset.gltf')
```

Omdat de `useLoader` composable een promise returned, kun je deze gebruiken met `async/await` or `then/catch`. Als je het op een component gebruikt, zorg er dan voor dat je er een `Suspense` component omheen zet. Zie [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) voor meer informatie.

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

De  `useTexture` composable stelt je in staat om textures te laden met behulp van de [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader). Het returned een promise met de geladen texture(s).

```ts
const texture = await useTexture(['path/to/texture.png'])
```

**useTexture** accepteert ook een object met de volgende eigenschappen:

- `map`: een basistextuur die op het oppervlak van een object wordt aangebracht
- `displacementMap`: een textuur die wordt gebruikt om hobbels of inkepingen aan het oppervlak van het object toe te voegen
- `normalMap`: een textuur die wordt gebruikt om oppervlaktedetails en variaties in schaduw aan het object toe te voegen
- `roughnessMap`:een textuur die wordt gebruikt om ruwheid of een matte afwerking aan het oppervlak van het object toe te voegen
- `metalnessMap`: en textuur die wordt gebruikt om een metaalachtig effect aan het oppervlak van het object toe te voegen
- `aoMap`: een textuur die wordt gebruikt om omgevingsocclusie (schaduw in gebieden waar licht wordt geblokkeerd door andere objecten) aan het object toe te voegen.
- `alphaMap`: een textuur die wordt gebruikt om alpha (het zwarte gedeelte wordt transparant weergegeven) aan het object toe te voegen. Het is noodzakelijk om :trasparent="true" in te stellen op het materiaal om deze kaart te gebruiken
- `matcap`: deze textuur codeert de kleur en shading van het materiaal.

n dat geval zal het een object returnen met de geladen texturen.

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

Dan kun je de textures binden aan het materiaal

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

Vergelijkbaar met de bovenstaande composable, returned de `useTexture` composable een promise, je kunt deze gebruiken met `async/await` of `then/catch`. Als je het op een component gebruikt, zorg er dan voor dat je er een `Suspense` component omheen zet.

## useSeek

De `useSeek` composable biedt utilities waarmee u eenvoudig door complexe ThreeJS-scènes en object-child-grafieken kunt navigeren. Het exporteert vier functies waarmee u onderliggende objecten kunt vinden op basis van specifieke eigenschappen.

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek()
```

De zoekfunctie accepteert drie parameters:

- `parent`: een ThreeJS-scène of Object3D.
- `property`: de eigenschap die moet worden gebruikt in de zoekvoorwaarde.
- `value`: De waarde van de eigenschap die moet overeenkomen.

De functies `seek` en `seekByName` doorlopen het object en returnen het child object met de opgegeven eigenschap en waarde. Als er geen child met de opgegeven eigenschap en waarde wordt gevonden, returned het null en wordt er een waarschuwing geregistreerd.

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

Op dezelfde manier returnen de functies `seekAll` en `seekAllByName` een array van child objecten waarvan de eigenschap de gegeven waarde bevat. Als er geen overeenkomsten worden gevonden, returnen ze een lege array en wordt er een waarschuwing gelogged.

```ts
const character = ref(null)

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, 'Bone')
  }
})
```

## useTresContext
Deze composable is om toegang te bieden tot het state model dat meerdere nuttige eigenschappen bevat.

```ts
const { camera, renderer, camera, cameras } = useTresContext()

```

::: warning
`useTresContext` kan alleen gebruikt worden in een `TresCanvas` omdat `TresCanvas` werkt als de provider voor de context data. Gebruik [de context exposed door TresCanvas](tres-canvas#exposed-public-properties) als je merkt dat je het nodig hebt in parent componenten van TresCanvas.
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

### Properties of context
| Eigenschap | Beschrijving |
| --- | --- |
| **camera** | De huidig actieve camera |
| **cameras** | De camera's die bestaan in de scene |
| **controls** | De controls van je scene |
| **deregisterCamera** | Een methode om een camera af te melden. Dit is alleen nodig als u handmatig een camera aanmaakt. Camera's in de template worden automatisch afgemeld. |
| **extend** | Breid de component calalogus uit. Zie [extending](/advanced/extending) |
| **raycaster** | De globale raycaster gebruikt voor pointer events |
| **registerCamera** | Een methode om een camera te registreren. Dit is alleen nodig als u handmatig een camera aanmaakt. Camera's in de template worden automatisch geregistreerd.|
| **renderer** | De [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) van je scene |
| **scene** | De [scene](https://threejs.org/docs/?q=sce#api/en/scenes/Scene). |
| **setCameraActive** | Een methode om de actieve camera te zetten |
| **sizes** | Bevat breedte, hoogte en aspect ratio van je canvas |

