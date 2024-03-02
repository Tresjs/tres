# WIP
<!-- # Luces y sombras

Esta guía te ayudará a comenzar con luces y sombras simples en TresJS.

Construiremos una escena simple con tres mallas y un plano, pero solo dos tendrán sombras.

<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## Configurando la escena (opcional)

Importamos todos los módulos que necesitamos, para mayor comodidad podemos usar orbit-controls de cientos,
[ver aquí para saber cómo](/examples/orbit-controls).

Coloquemos cuatro objetos en nuestra escena, uno será el plano que recibirá sombras, dos de ellos proyectarán sombras y el último no proyectará ninguna sombra en absoluto.

Voy a usar [MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial). Simplemente porque podemos ver fácilmente el "sobreado suave".

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
    clear-color="#111"
    window-size
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[5, 7.5, 7.5]" />

    <TresMesh
      :position="[-2, 2, 0]"
      :rotation="[0, Math.PI, 0]"
    >
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh
      :position="[0, 0, 0]"
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh
      :position="[2, -2, 0]"
    >
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh
      :position="[0, -3, 0]"
      :rotation="[-Math.PI / 2, 0, 0]"
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshStandardMaterial color="#f7f7f7" />
    </TresMesh>
  </TresCanvas>
</template>
```

## Luces (explicación)

Como sabes, cada instancia en [ThreeJs](https://threejs.org/) está disponible en **TresJs**, por lo que todos los tipos de luces también están disponibles, solo necesitamos agregar el prefijo `Tres` para usarlos.

Pero no todas las luces pueden generar sombras, esta definición proviene directamente de ThreeJs y tiene sentido. Por ejemplo, el propósito de una [ambientLight](https://threejs.org/docs/index.html?q=ambient#api/en/lights/AmbientLight) es iluminar todos los lados de tu escena, por lo que no tiene sentido que genere sombras. En cambio, una [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/helpers/DirectionalLightHelper) que imita al sol puede y debe generar sombras.

## Sombras (explicación)

También existen muchos tipos de sombras, por ejemplo, la "sombra suave" se genera automáticamente cuando un objeto recibe más luz de un lado, pero en resumen, una "sombra predeterminada de ThreeJS" que se dirige hacia otra superficie debe ser proyectada por una malla y otra malla debe recibirla. Como vemos en nuestro ejemplo, el `Plano` está recibiendo una sombra pero no la está proyectando. Ten en cuenta que no todos los materiales pueden proyectar o recibir sombras.

Internamente, ThreeJS genera automáticamente una nueva malla con un [ShadowMaterial](https://threejs.org/docs/index.html?q=shado#api/en/materials/ShadowMaterial) que se actualiza en cada fotograma, por eso si aplicas animaciones, la sombra también se anima, pero también es por eso que debes usar las sombras con cuidado, ya que pueden ralentizar el rendimiento.

::: warning
El uso excesivo de sombras de esta manera puede afectar el rendimiento. Sin embargo, existen formas de mejorar el rendimiento. Para obtener más información, consulta [este video](https://youtu.be/WGNvVGrS0kY?si=q7XyL5eABKUh3gbS&t=1256)
:::

## Habilitando las sombras

Podemos dividir esto en tres pasos:

### Activar las sombras en el renderizador

```vue
//...

<template>
  <TresCanvas
    clear-color="#111"
    shadows
    window-size
  />
  //...
</template>
```
### Configurar la luz para proyectar sombras

Podemos simplemente agregar el booleano `cast-shadow`, Vue lo interpreta como una `prop` con valor `true`.

_La luz ambiental no genera ningún tipo de sombra aquí_

```vue
//...

<template>
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight
    cast-shadow
    :position="[0, 2, 0]"
    :intensity="1"
  />
  
  //...
</template>
```
### Establecer los objetos para proyectar o recibir sombras

De manera similar al paso anterior, configuramos la malla que queremos que proyecte sombra (nuestra esfera) con la propiedad `cast-shadow`, y configuramos el objeto para recibir sombra (nuestro plano) con la propiedad `receive-shadow`.

```vue
//...

<template>
  <TresMesh
    cast-shadow
    :position="[2, -2, 0]"
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
  <TresMesh
    receive-shadow
    :position="[0, -3, 0]"
    :rotation="[-Math.PI / 2, 0, 0]"
  >
    <TresPlaneGeometry :args="[10, 10, 10, 10]" />
    <TresMeshStandardMaterial color="#f7f7f7" />
  </TresMesh>
  //...
</template>
```

Ahora tenemos todos los pasos necesarios para agregar sombras a nuestra escena, y si aplicamos lo que aprendimos en [animaciones básicas](/examples/basic-animations), y agregamos movimiento a nuestro cubo, verás que la sombra también se anima 🤩

```vue
<script setup>
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'

const boxRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
  }
})
</script>

<template>
  //...
  <TresMesh
    ref="boxRef"
    cast-shadow
    :position="[0, 0, 0]"
  >
    <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
    <TresMeshToonMaterial color="#4F4F4F" />
  </TresMesh>
  //...
</template>
```

_Nota que intencionalmente no apliqué `cast-shadow` al `Cone` para que no proyecte ninguna sombra_ -->
