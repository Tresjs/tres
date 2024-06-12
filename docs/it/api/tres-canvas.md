# TresCanvas

Il componente `TresCanvas` è il componente principale di Tres. È quello che crea il ThreeJS `WebGLRenderer`.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
    <!-- La tua scena va qui -->
  </TresCanvas>
</template>
```

## Dimensione del canvas

Il componente `TresCanvas` userà la dimensione dell'elemento genitore come dimensione tela. Se si desidera utilizzare la dimensione della finestra come dimensione della tela, è possibile impostare la dimensione della finestra`prop a`true`.

```vue
<template>
  <TresCanvas window-size>
    <!-- La tua scena va qui -->
  </TresCanvas>
</template>
```

Oppure puoi usare i CSS per impostare la dimensione della tela.

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#canvas {
  height: 100%;
  width: 100%;
}
```

## Presets

Tres viene fornito con alcuni preset per il componente `TresCanvas` . Puoi usarli impostando il prop`preimpostato`.

### Realistic

Il preset `realistico` semplifica la configurazione del renderer per scene 3D più realistiche.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- La tua scena va qui -->
  </TresCanvas>
</template>
```

Equivale a:

```ts
renderer.shadows = true;
renderer.physicallyCorrectLights = true;
renderer.outputColorSpace = SRGBColorSpace;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
```

## Props

| Prop                             | Descrizione                                                                                                                                                                                                                                                                                                                                                                                      | Default                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| **alpha**                        | Controlla il valore alfa chiaro predefinito. Se impostato a true, il valore è 0. Altrimenti è 1.                                                                                                                                                                                                                                                                                                 | false                                 |
| **antialias**                    | Se eseguire l'antialiasing.                                                                                                                                                                                                                                                                                                                                                                      | `true`                                |
| **camera**                       | Una fotocamera manuale che deve essere utilizzata dal renderer.                                                                                                                                                                                                                                                                                                                                  |                                       |
| **clearColor**                   | Il colore che il renderizzatore userà per cancellare la tela.                                                                                                                                                                                                                                                                                                                                    | `#000000`                             |
| **context**                      | Questo può essere usato per collegare il renderer a un esistente [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)                                                                                                                                                                                                                                      |                                       |
| **depth**                        | Indica se il buffer di disegno ha un [buffer di profondità](https://en.wikipedia.org/wiki/Z-buffering) di almeno 16 bit.                                                                                                                                                                                                                                                                         | `true`                                |
| **disableRender**                | Disabilita il rendering su requestAnimationFrame, utile per il postprocessing                                                                                                                                                                                                                                                                                                                    | `false`                               |
| **failIfMajorPerformanceCaveat** | Viene rilevato se la creazione del renderer fallirà a basse prestazioni. Vedere [WebGL spec](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2) per i dettagli.                                                                                                                                                                                                                           | `false`                               |
| **logarithmicDepthBuffer**       | Indica se usare un buffer di profondità logaritmico. Potrebbe essere necessario usare questo se hai a che fare con enormi differenze di scala in una singola scena. Nota che questa impostazione usa gl_FragDepth se disponibile che disabilita l'ottimizzazione [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) e può causare una diminuzione delle prestazioni. | `false`                               |
| **outputColorSpace**             | Definisce la codifica di output                                                                                                                                                                                                                                                                                                                                                                  | `LinearEncoding`                      |
| **powerPreference**              | Fornisce un suggerimento all'interprete che indica quale configurazione della GPU è adatta per questo contesto WebGL. Può essere "ad alte prestazioni", "a basso consumo" o "predefinito".                                                                                                                                                                                                       | `default`                             |
| **precision**                    | Precisione Shader. Può essere "highp", "mediump" o "lowp".                                                                                                                                                                                                                                                                                                                                       | "highp" se supportato dal dispositivo |
| **premultipliedAlpha**           | Indica se il renderer assumerà che i colori hanno [premultiplied alpha](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha).                                                                                                                                                                                                                                        | `true`                                |
| **preserveDrawingBuffer**        | Indica se conservare i buffer finché non vengono cancellati manualmente o sovrascritti..                                                                                                                                                                                                                                                                                                         | `false`                               |
| **shadows**                      | Abilita le ombre nel renderizzatore                                                                                                                                                                                                                                                                                                                                                              | `false`                               |
| **shadowMapType**                | Imposta il tipo di mappa ombra                                                                                                                                                                                                                                                                                                                                                                   | `PCFSoftShadowMap`                    |
| **stencil**                      | Indica se il buffer di disegno ha un buffer [stencil buffer](https://en.wikipedia.org/wiki/Stencil_buffer) di almeno 8 bit.                                                                                                                                                                                                                                                                      | `true`                                |
| **toneMapping**                  | Definisce l'esposizione di mappatura dei toni utilizzata dal renderer.                                                                                                                                                                                                                                                                                                                           | `NoToneMapping`                       |
| **toneMappingExposure**          | Livello di esposizione della mappatura tonale.                                                                                                                                                                                                                                                                                                                                                   | `1`                                   |
| **useLegacyLights**              | Indica se utilizzare o meno la modalità di illuminazione legacy                                                                                                                                                                                                                                                                                                                                  | `true`                                |
| **windowSize**                   | Indica se utilizzare la dimensione della finestra come dimensione della tela o come elemento padre.                                                                                                                                                                                                                                                                                              | `false`                               |

### Defaults

Tres cerca di essere il meno presuntuoso possibile. Ecco perché non imposta quasi nessun valore predefinito per il componente `TresCanvas` . Usa i valori predefiniti da [three.js](https://threejs.org/). L'unica eccezione è la prop `antialias` . È impostata a `true` per impostazione predefinita.

## Proprietà pubbliche esposte

| Proprietà | Descrizione                                       |
| --------- | ------------------------------------------------- |
| context   | vedi [useTresContext](composables#usetrescontext) |
