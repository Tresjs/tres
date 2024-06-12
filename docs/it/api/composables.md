# Composables

Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) consente di creare logiche riutilizzabili che possono essere condivise tra i componenti. Consente inoltre di creare ganci personalizzati che possono essere utilizzati nei componenti.

**TresJS** sfrutta questa API per creare un insieme di funzioni componibili che possono essere utilizzate per creare animazioni, interagire con la scena e altro ancora. Consente inoltre di creare scene più complesse che potrebbero non essere possibili utilizzando solo i componenti Vue (Texture, Loader, ecc.).

Il nucleo di **TresJS** utilizza internamente questi materiali compositi, quindi useresti la stessa API utilizzata dal core. Per esempio, i componenti che devono essere aggiornati sul loop interno di rendering usano il `useRenderLoop` composable per registrare una callback che verrà chiamata ogni volta che il renderer aggiorna la scena.

## useRenderLoop

Il `useRenderLoop` composable è il nucleo delle animazioni **TresJS**. Permette di registrare una callback che verrà chiamata sulla frequenza di aggiornamento nativa. Questo è il più importante componibile in **TresJS**.

```ts
const { onLoop, resume } = useRenderLoop();

onLoop(({ delta, elapsed, clock }) => {
  // Eseguirò ad ogni fotogramma ~60FPS (a seconda del monitor)
});
```

::: warning
Essere consapevoli delle implicazioni di prestazioni di utilizzare questo componibile. Verrà eseguito in ogni fotogramma, quindi se si dispone di un sacco di logica nel vostro callback, potrebbe influenzare le prestazioni della vostra applicazione. Specialmente se stai aggiornando stati reattivi o riferimenti.
:::

La callback `onLoop` riceve un oggetto con le seguenti proprietà in base al [THREE clock](https://threejs.org/?q=clock#api/en/core/Clock):

- `delta`: il tempo delta tra la corrente e l'ultimo frame. Questo è il tempo in secondi dall'ultimo frame.
- `elapsed`: il tempo trascorso dall'inizio del ciclo di rendering.

Questo componibile è basato su `useRafFn` da [vueuse](https://vueuse.org/core/useRafFn/). Grazie a [@wheatjs](https://github.com/wheatjs) per l'incredibile contributo.

### Prima e dopo il render

È anche possibile registrare una callback che verrà chiamata prima e dopo che il renderer aggiorna la scena. Questo è utile se si aggiunge un profiler per misurare il FPS per esempio.

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop();

onBeforeLoop(({ delta, elapsed }) => {
  // Eseguirò prima che il renderer aggiorni la scena
  fps.begin();
});

onAfterLoop(({ delta, elapsed }) => {
  // Eseguirò dopo che il renderer aggiorna la scena
  fps.end();
});
```

### Pausa e riprendere

È possibile mettere in pausa e riprendere il ciclo di rendering usando i metodi esposti`pausa` e `riprendere` .

```ts
const { pause, resume } = useRenderLoop();

// Metti in pausa il render loop
pause();

// Riprendi il render loop
resume();
```

Inoltre è possibile ottenere lo stato attivo del ciclo di rendering usando la proprietà`isactive` .

```ts
const { resume, isActive } = useRenderLoop();

console.log(isActive); // false

resume();

console.log(isActive); // true
```

## useLoader

Il comando `useLoader` composable permette di caricare gli asset usando i [THREE.js loaders](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models). Restituisce una promessa con asset caricato.

```ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const { scene } = await useLoader(THREE.GLTFLoader, "path/to/asset.gltf");
```

Dato che il `useLoader` composable restituisce una promessa, puoi usarlo con `async/wait` o `then/catch`. Se lo stai usando su un componente assicurati di avvolgerlo con un componente `Suspense`. Vedere [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) per ulteriori informazioni.

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

La `useTexture` composable permette di caricare le texture usando il [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader). Restituisce una promessa con la texture caricata (s).

```ts
const texture = await useTexture(["path/to/texture.png"]);
```

**useTexture** also accepts an object with the following properties:

- `map`: struttura di base applicata alla superficie di un oggetto
- `displacementMap`: una texture che viene utilizzata per aggiungere urti o rientranze alla superficie dell'oggetto
- `normalMap`: una texture che viene utilizzata per aggiungere dettagli superficiali e variazioni di ombreggiatura all'oggetto
- `roughnessMap`: una texture che viene utilizzata per aggiungere rugosità o una finitura opaca alla superficie dell'oggetto
- `metalnessMap`: una texture che viene utilizzata per aggiungere un effetto metallico alla superficie dell'oggetto
- `aoMap`: una texture usata per aggiungere occlusione ambientale (ombreggiatura in aree dove la luce è bloccata da altri oggetti) all'oggetto.
- `alphaMap`: una texture usata per aggiungere alfa (la parte nera resa trasparente) all'oggetto. È necessario impostare :trasparent="true" sul materiale per usare questa mappa
- `matcap`: questa texture codifica il colore del materiale e l'ombreggiatura.

In quel caso restituirà un oggetto con le strutture caricate.

```ts
const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap, alphaMap, matcap } =
  await useTexture({
    map: "path/to/albedo.png",
    displacementMap: "path/to/height.png",
    normalMap: "path/to/normal.png",
    roughnessMap: "path/to/roughness.png",
    metalnessMap: "path/to/metalness.png",
    aoMap: "path/to/ambien-occlusion.png",
    alphaMap: "path/to/alpha.png",
    matcap: "path/to/matcap.png",
  });
```

Quindi puoi legare le trame al materiale.

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

`useTexture` per impostazione predefinita prende il secondo argomento 'manager' come LoadingManager. Se omesso, verrà automaticamente aggiunto a `THREE.DefaultLoadingManager`. Naturalmente, puoi anche aggiungere il tuo LoadingManager, in questo modo:

```ts
const loadingManager = new LoadingManager();
const texture = await useTexture({ map: "path/to/texture.png" }, loadingManager);
```

Simile a quanto sopra componibile, la `useTexture` composable restituisce una promessa, puoi usarla con `async/wait` o `then/catch`. Se lo stai usando su un componente assicurati di avvolgerlo con un componente `Suspense`.

## useSeek

Il `useSeek` composable fornisce utilità per attraversare e navigare facilmente attraverso complesse scene ThreeJS e grafici figli di oggetti. Esporta 4 funzioni che consentono di trovare oggetti figlio in base a proprietà specifiche.

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek();
```

La funzione di ricerca accetta tre parametri:

- `parent`: una scena ThreeJS o oggetto 3D.
- `property`: la proprietà da utilizzare nella condizione di ricerca.
- `value`: il valore della proprietà da abbinare.

La funzione `seek` e `seekByName` attraversa l'oggetto e restituisce l'oggetto figlio con la proprietà e il valore specificati. Se non viene trovato nessun figlio con la proprietà e il valore specificati, restituisce null e registra un avviso.

```ts
const carRef = ref(null);

watch(carRef, ({ model }) => {
  if (model) {
    const car = model.children[0];

    const body = seek(car, "name", "Octane_Octane_Body_0");
    body.color.set(new Color("blue"));
  }
});
```

Allo stesso modo, le funzioni `seekAll` e `seekAllByName` restituiscono un array di oggetti figli la cui proprietà include il valore dato. Se non vengono trovate corrispondenze, restituiscono un array vuoto e viene registrato un avviso.

```ts
const character = ref(null);

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, "Bone");
  }
});
```

## useTresContext

Questo composable mira a fornire accesso al modello di stato che contiene molteplici proprietà utili.

```ts
const { camera, renderer, camera, cameras } = useTresContext();
```

::: warning
`utilizzare TresContext` può essere utilizzato solo all'interno di un `TresCanvas` poiché`TresCanvas` agisce come fornitore dei dati di contesto. Utilizzare [il contesto esposto da TresCanvas](tres-canvas#exposed-public-properties) se si trova ad averne bisogno nei componenti padre di TresCanvas.
:::

```vue
<TresCanvas>
  <MyModel />
</TresCanvas>
```

```vue
// MyModel.vue

<script lang="ts" setup>
import { useTresContext } from "@tresjs/core";

const context = useTresContext();
</script>
```

### Proprietà del contesto

| Proprietà            | Descrizione                                                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **camera**           | La fotocamera attualmente attiva                                                                                                                                                         |
| **cameras**          | Le telecamere che esistono nella scena                                                                                                                                                   |
| **controls**         | I controlli della tua scena                                                                                                                                                              |
| **deregisterCamera** | Un metodo per annullare la registrazione di una telecamera. Questo è richiesto solo se si crea manualmente una telecamera. Le telecamere nel modello vengono cancellate automaticamente. |
| **extend**           | Estende il catalogo dei componenti. Vedi [estensione](/avanzata/estensione)                                                                                                              |
| **raycaster**        | Il raycaster globale utilizzato per gli eventi puntatore                                                                                                                                 |
| **registerCamera**   | Un metodo per registrare una telecamera. Questo è richiesto solo se si crea manualmente una telecamera. Le telecamere nel modello sono registrate automaticamente.                       |
| **renderer**         | Il [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) della tua scena                                                                                             |
| **scene**            | La [scena](https://threejs.org/docs/?q=sce#api/en/scenes/Scene).                                                                                                                         |
| **setCameraActive**  | Un metodo per impostare una telecamera attiva                                                                                                                                            |
| **sizes**            | Contiene larghezza, altezza e proporzioni della tela                                                                                                                                     |
