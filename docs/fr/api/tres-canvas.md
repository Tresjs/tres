# TresCanvas

Le composant `TresCanvas` est le composant principal de Tres. C'est celui qui crée le `WebGLRenderer` ThreeJS.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- Votre scène -->
  </TresCanvas>
</template>
```

## Taille du canva

Le composant `TresCanvas` utilisera la taille de l'élément parent comme taille du canevas. Si vous souhaitez utiliser la taille de la fenêtre comme taille du canevas, vous pouvez définir la propriété « window-size » sur « true »

```vue
<template>
  <TresCanvas window-size>
    <!-- Votre scène -->
  </TresCanvas>
</template>
```

Ou vous pouvez utiliser CSS pour définir la taille de votre canevas.

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

Tres est livré avec quelques préréglages pour le composant `TresCanvas`. Vous pouvez les utiliser en définissant la propriété `preset`.

### Réaliste

Le preset `réaliste` facilite la configuration du moteur de rendu pour des scènes 3D plus réalistes.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Votre scène -->
  </TresCanvas>
</template>
```

C'est équivalent à:

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

| Prop | Description | Valeur par défaut |
| ---- | ---- | --- |
| **alpha** | Contrôle la valeur alpha par défaut. Lorsqu'elle est définie sur true, la valeur est 0. Sinon, elle est 1. | false |
| **antialias** | Indique si un anticrénelage doit être effectué. | `true` |
| **camera** | Une caméra manuelle à utiliser par le moteur de rendu. | |
| **clearColor** | La couleur que le moteur de rendu utilisera pour effacer le canevas. | `#000000` |
| **context** | Ceci peut être utilisé pour attacher le moteur de rendu à un [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) existente. | |
| **depth** | Indique si le tampon de dessin a une [profondeur du tampon](https://en.wikipedia.org/wiki/Z-buffering) de au moins 16 bits. | `true` |
| **disableRender** | Désactive le rendu sur requestAnimationFrame, utile pour le post-traitement. | `false` |
| **failIfMajorPerformanceCaveat** | Indique si la création du moteur de rendu échouera si de mauvaises performances sont détectées. Voir la [spécification WebGL](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2) para más detalles. | `false` |
| **logarithmicDepthBuffer** | Indique s’il faut utiliser un tampon de profondeur logarithmique. Il peut être nécessaire de l'utiliser s'il s'agit de différences d'échelle énormes dans une seule scène. Notez que ce paramètre utilise gl_FragDepth s'il est disponible, ce qui désactive l'optimisation [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) et peut entraîner une baisse des performances. | `false` |
| **outputColorSpace** | Définit l'encodage de sortie. | `LinearEncoding` |
| **powerPreference** | Fournit un indice à l'agent utilisateur indiquant quelle configuration GPU est appropriée pour ce contexte WebGL. Il peut être « haute performance », « faible consommation » ou « par défaut ». | `default` |
| **precision** | Précision du shader. Il peut être « élevé », « moyen » ou « faible ». | "highp" si pris en charge par l'appareil |
| **premultipliedAlpha** | Indique si le moteur de rendu supposera que les couleurs ont [alpha prémultiplié](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha). | `true` |
| **preserveDrawingBuffer** | Indique si les tampons doivent être conservés jusqu'à ce qu'ils soient effacés ou écrasés manuellement. | `false` |
| **shadows** | Activez les ombres dans le moteur de rendu. | `false` |
| **shadowMapType** | Définit le type de carte d'ombrage. | `PCFSoftShadowMap` |
| **stencil** | Indique si le tampon de dessin possède un [tampon de pochoir](https://en.wikipedia.org/wiki/Stencil_buffer) de au moins 8 bits. | `true` |
| **toneMapping** | Définit l’exposition du mappage de tons utilisée par le moteur de rendu. | `ACESFilmicToneMapping` |
| **toneMappingExposure** | Niveau d'exposition du mappage de tons. | `1` |
| **useLegacyLights** | Indique s’il faut utiliser ou non le mode d’éclairage existant. | `true` |
| **windowSize** | Indique s’il faut utiliser la taille de la fenêtre comme taille du canevas ou de l’élément parent. | `false` |

### Valeurs par défaut

Tres essaie d’être aussi neutre que possible. C'est pourquoi il ne définit presque aucune valeur par défaut pour le composant `TresCanvas`. Utilisez les valeurs par défaut de [Three.js](https://threejs.org/). La seule exception est la propriété « antialias », qui est définie par défaut sur « true ».

## Propriétés publiques exposées

| Propriété | Descriptif |
| ---- | ---- |
| context | voir [useTresContext](composables#usetrescontext) |
