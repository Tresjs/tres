# Controles de transformación

Los [Transform Controls](https://threejs.org/docs/#examples/en/controls/TransformControls) son un grupo de tres aparatos que se pueden usar a trasladar, rotar y escalar objectos en la escena. Se adaptan un model de interacción similar de herramientas de DDC como Blender.

<StackBlitzEmbed projectId="tresjs-transform-controls" />

## Utilización

Para usar los controles de transformación, simplemente añade el componente `TransformControls` a tu escena. Puedes pasar el `templateRef` de la instancia que quieres controlar como un prop.

```vue{2,6,8}
<script setup>
const boxRef = shallowRef()
</script>
<template>
  <TresCanvas>
    <OrbitControls make-default />
    <TresScene>
        <TransformControls :object="boxRef" />
        <TresMesh ref="boxRef" :position="[0, 4, 0]" cast-shadow>
            <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
            <TresMeshToonMaterial color="#4F4F4F" />
        </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```

::: precaución
Si usas otros controles ([OrbitControls](/cientos/controls/orbit-controls)) interferirán en cada uno cuando arrastrando. Para evitar eso, puedes poner el `makeDefault` prop a `true` en los **OrbitControls**.
:::

## Modos

Los controles de transformación se pueden usar en tres modos:

### Transladar

![Translate](/cientos/transform-controls-translate.png)

El modo por defacto te permita mover el objeto por todo la escena.

```html
<TransformControls mode="translate" :object="sphereRef" />
```

### Rotar

![Rotate](/cientos/transform-controls-rotate.png)

El modo de rotar te permita rotar el objeto por todo la escena.

```html
<TransformControls mode="rotate" :object="boxRef" />
```

### Escalar

![Scale](/cientos/transform-controls-scale.png)

El modo de escalar te permita escalar el objeto por todo la escena.

```html
<TransformControls mode="scale" :object="sphereRef" />
```

## Props

| Prop                | Descripción                                                                                   | Defacto     |
| :------------------ | :-------------------------------------------------------------------------------------------- | ----------- |
|  **object**         | La instancia [Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D) a controlar. | `null`      |
| **mode**            | El modo de los controles. Puede ser `translate`, `rotate` o `scale`.                            | `translate` |
| **enabled**         | Si `true`, los controles se habilitarán.                                                    | `true`      |
| **axis**            | El eje a utilizar para los controles. Puede ser `X`, `Y`, `Z`, `XY`, `YZ`, `XZ`, `XYZ`.              | `XYZ`       |
| **space**           | El espacio a utilizar para los controles. Puedes ser `local` o `world`.                                 | `local`     |
| **size**            | El tamaño de los controles.                                                                     | `1`         |
| **translationSnap** | La distancia al que moverse en traslado. (World units)                                       | `null`      |
| **rotationSnap**    | El angulo al que moverse en rotación. (Radians)                                                 | `null`      |
| **scaleSnap**       | La escala al que moverse en el proceso de escalar.                                                            | `null`      |
| **showX**           | Si `true`, se muestra el ayudante en eje x.                                                   | `true`      |
| **showY**           | Si `true`, se muestra el ayudante en eje y.                                                    | `true`      |
| **showZ**           | Si `true`, se muestra el ayudante en eje x.                                                    | `true`      |

## Eventos

| Evento            | Descripción                                                    |
| :--------------- | :------------------------------------------------------------- |
| **dragging**     | Iniciado cuando el usuario empiece o termine a drag los controles   |
| **change**       | Iniciado cuando el usuario cambia los controles.                     |
| **mouseDown**    | Iniciado cuando el usuario hace clic en los controles.                |
| **mouseUp**      | Iniciado cuando el usuario suelta el botón del mouse en los controles. |
| **objectChange** | Iniciado cuando el usuario cambia el objeto.                        |

<style scoped>
img {
    aspect-ratio: 16/9;
    object-fit: cover;
    object-position: top;
    border-radius: 8px;
}
</style>
