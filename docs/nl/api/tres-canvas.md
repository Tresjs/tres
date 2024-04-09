# TresCanvas

Het onderdeel `TresCanvas` is de core van Tres. Het is degene die de ThreeJS `WebGLRenderer` creëert.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- Je scene komt hier -->
  </TresCanvas>
</template>
```

## Canvas grootte

De component `TresCanvas` gebruikt de grootte van het parent element als canvasgrootte. Als je de window size als canvasgrootte wilt gebruiken, kun je de `window-size` prop op `true` zetten.

```vue
<template>
  <TresCanvas window-size>
    <!-- Je scene komt hier -->
  </TresCanvas>
</template>
```

Of je kan CSS gebruiken om jouw canvasgrootte in te stellen.

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

Tres wordt geleverd met een paar presets voor de component `TresCanvas`. Je kunt ze gebruiken door de `preset` prop in te stellen.

### Realistic

De `realistic` preset maakt het eenvoudig om de renderer in te stellen voor meer realistische 3D-scènes.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Je scene komt hier -->
  </TresCanvas>
</template>
```

Het is gelijk aan:

```ts
renderer.shadows = true
renderer.physicallyCorrectLights = true
renderer.outputColorSpace = SRGBColorSpace
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
```

## Props

| Prop | Beschrijving | Standaard |
| ---- | ---- | --- |
| **alpha** | Beheert de standaardwaarde voor duidelijke alfa. Wanneer ingesteld op true, is de waarde 0. Anders is het 1. | false |
| **antialias** |Of anti-aliasing moet worden uitgevoerd. | `true` |
| **camera** | Een handmatige camera die door de renderer moet worden gebruikt. | |
| **clearColor** | De kleur die de renderer gebruikt om het canvas leeg te maken. | `#000000` |
| **context** | Dit kan worden gebruikt om de renderer aan een bestaand [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) te koppelen | |
| **depth** | Of de drawing buffer een [depth buffer](https://en.wikipedia.org/wiki/Z-buffering) heeft van tenminste 16 bits. | `true` |
| **disableRender** | Blokkeer render op requestAnimationFrame, handig voor PostProcessing | `false` |
| **failIfMajorPerformanceCaveat** | Er wordt gedetecteerd of het maken van de renderer zal mislukken bij lage prestaties. Zie [WebGL spec](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2) for details. | `false` |
| **logarithmicDepthBuffer** | Of de logarithmic depth buffer gebruikt moet worden. Het kan zijn dat dit noodzakelijk is als je te maken hebt met flinke verschillen in scale in een enkele scene. Merk op dat deze setting gebruik maakt van gl_FragDepth wanneer deze beschikbaar is en deze schakelt [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) uit en kan een verlies in prestaties veroorzaken. | `false` |
| **outputColorSpace** | Definieert de uitvoercodering | `LinearEncoding` |
| **powerPreference** | Geeft een hint aan de user-agent die aangeeft welke configuratie van GPU geschikt is voor deze WebGL-context. Kan "high-performance", "low-power" or "default" zijn. | `default` |
| **precision** | Shader presisie. Kan "highp", "mediump" or "lowp" zijn. | "highp" als deze is ondersteund door het apparaat |
| **premultipliedAlpha** | Of de renderer ervan uitgaat dat kleuren [premultiplied alpha](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha) hebben. | `true` |
| **preserveDrawingBuffer** | Of de buffers moeten worden behouden totdat ze handmatig worden gewist of overschreven.. | `false` |
| **shadows** | Schakelt shadows in de renderer in | `false` |
| **shadowMapType** | Zet de shadow map type | `PCFSoftShadowMap` |
| **stencil** | Of de drawing buffer een [stencil buffer](https://en.wikipedia.org/wiki/Stencil_buffer) heeft van tenminste 8 bits. | `true` |
| **toneMapping** | Definiërt de tone mapping exposure gebruikt door de renderer. | `NoToneMapping` |
| **toneMappingExposure** | Exposure level van tone mapping. | `1` |
| **useLegacyLights** | Of de legacy belichtingsmodus gebruikt moet worden of niet | `true` |
| **windowSize** | Of de window grootte gebruikt moet worden als de canvas grootte of de parent element. | `false` |

### Standaard waardes

Tres probeert zo min mogelijk een mening te hebben. Dat is de reden waarom het vrijwel geen standaardwaarde voor de `TresCanvas`-component instelt. Het gebruikt de standaardinstellingen van [three.js](https://threejs.org/). De enige uitzondering is de prop `antialias`. Die is standaard ingesteld op `true`.

## Blootgestelde public eigenschappen

| Eigenschap | Beschrijving |
| ---- | ---- |
| context | zie [useTresContext](composables#usetrescontext) |
