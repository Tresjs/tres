# Text3D <Badge type="warning" text="^1.1.0" />

`<Text3D />` es un componente que renderizar un texto en #D. Es un wrapper sobre la clase [TextGeometry](https://threejs.org/docs/#api/en/geometries/TextGeometry).

<StackBlitzEmbed projectId="tresjs-text3d-cientos" />

## Utilización

Para usar el `<Text3D />` componente necesitas pasar el prop `font` con el URL del archivo JSON de font que quieres usar.TextGeometry usa fonts generados por `typeface`.json, puedes generar los tuyos [aquí](http://gero3.github.io/facetype.js/)

```vue
<template>
  <TresCanvas>
    <TresScene>
      <Text3D text="TresJS" font="/fonts/FiraCodeRegular.json">
        <TresMeshNormalMaterial />
      </Text3D>
    </TresScene>
  </TresCanvas>
</template>
```

Nota que necesitas pasar el componente `<TresMeshNormalMaterial />` como un niño del componente `<Text3D />`. Eso es porque `<Text3D />`es un componente `Mesh`, entonces necesita un material. La geométrica se crea automáticamente. También puedes pasar el texto como un slot o como un prop así:

```vue
<template>
  <TresCanvas>
    <TresScene>
      <Text3D font="/fonts/FiraCodeRegular.json">
        TresJS
        <TresMeshNormalMaterial />
      </Text3D>
    </TresScene>
  </TresCanvas>
</template>
```

## Props [[1]](#1)

| Prop               | Descripción                                                            | Defacto |
| :----------------- | :--------------------------------------------------------------------- | ------- |
| **font**           | Los datos o el nombre del font para usar por el texto.                       |         |
| **text**           | El texto a mostrar.                                                |         |
| **size**           | El tamaño del texto.                                                | 0.5     |
| **height**         | La altura del texto.                                         | 0.2     |
| **curveSegments**  | El número de los segmentos de curva a usar al generar la geométrica del texto. | 5       |
| **bevelEnabled**   | Una bandera que indica si hay que habilitar biselar por el texto.     | true    |
| **bevelThickness** | El espesor del borde biselado en el texto.                         | 0.05    |
| **bevelSize**      | El tamaño del borde biselado en el texto.                            | 0.02    |
| **bevelOffset**    | El espacio del borde biselado en el texto.                            | 0       |
| **bevelSegments**  | El número de segmentos de biselar a usar al generar la geométrica del texto.| 4       |

## Referencias

<a id="1">[1]</a>
Esa tabla era generada por [ChatGPT](https://chat.openai.com/chat) en base de los props de los componentes de Vue.
