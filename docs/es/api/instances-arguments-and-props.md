# Instancias

El idea principal de **Tres** es un \_catálogo auto-generado_de todos los elementos de ThreeJS. Este catálogo se genera del código fuente de ThreeJS, entonces siempre está actualizado.

Cuando usas ThreeJS, necesitas importar los elementos que quieres usar. Por ejemplo, si quieres usar un `PerspectiveCamera`, necesitas importarlo de paquete `three`:

```js
import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(45, width / height, 1, 1000)
```

Con **Tres** no necesitas importar nada, eso es porque **Tres**genera automáticamente un **Componente de Vue en base del Three Objeto quieres usar en CamelCase con un prefijo Tres**. Por ejemplo, si quieres usar un `PerspectiveCamera` usarías el componente `<TresPerspectiveCamera />` .

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

Se significa que puedes usar la misma [documentación](https://threejs.org/docs/) que usaría como cuando usas ThreeJS puro, pero con el poder de Vue.

## Declarar objetos

Si continuamos con este argumento, podrías usar una instancia así: ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="new THREE.Vector3(1, 2, 3)" />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

Pero con **Tres** no es necesario, puedes definer propiedades de forma declarativa así: ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="[1, 2, 3]" />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

## Arguments

Algunos objetos de ThreeJS tienen argumentos, por ejemplo, el constructor `PerspectiveCamera` tiene los argumentos siguientes:

- `fov` - Cámara tronco vertical campo de visión.
- `aspect` - Cámara tronco relación de aspecto.
- `near` - Cámara tronco plano cerco.
- `far` - Cámara tronco far plano extremo.

Para pasar estos argumentos al componente `TresPerspectiveCamera`, puedes usar el `args` prop:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

Es el mismo de haciendo esto:

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000)
```

## Props

También puedes pasar props al componente, por ejemplo, el `TresAmbientLight` tiene una propiedad `intensity`, entonces puedes pasarla al componente así:

```html
<TresAmbientLight :intensity="0.5" />
```

### Set

Todas las propiedades cuales objeto subyacente tiene un método `.set()` tienen un atajo para recibir el valor como un matriz. Por ejemplo, el `TresPerspectiveCamera` tiene una propiedad `position`, lo cual es un objeto `Vector3`, entonces puedes pasarla al componente así:

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

Para especificar transformaciones de las propiedades como la posición, la rotación y escalar, un atajo esta disponible, que te permite modificar directamente el eje que deseas, un atajo similar también sucede con los colores

```html
<TresMesh :position-x="1" :scale-y="2" :rotation-x="Math.PI * 2">
  <TresMeshBasicMaterial :color-r="0.7" :color-b="0.3" />
</TresMesh>
```

::: warning
Cuando usas la propiedad rotation en threejs [three.js](https://threejs.org/docs/index.html#api/en/math/Euler), usará por defecto el orden 'XYZ'.
Es importante saber que cuando configuras la rotación con los atajos, el orden importa, para mas información acerca de este tema, por favor leer [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
:::

```vue
<TresMesh :rotation-x="1" :rotation-y="2" :rotation-z="Math.PI * 2" />

<TresMesh :rotation-z="Math.PI * 2" :rotation-x="1" :rotation-y="2" />

<!-- Nota que el orden de la rotación importa, y cambiar el orden puede resultar en resultados diferentes. -->
```

### Scalar

Otro atajo puedes usar es pasar un valor escalar a una propiedad que espera un objeto `Vector3`, usando el mismo valor por el resto del vector:

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### Colors

Puedes pasar colores a los componentes usando el `color` prop, que acepta un string con el nombre del color o un valor hex:

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### Methods

En realidad, algunas propiedades subyacente son métodos, el `TresPerspectiveCamera` tiene un `lookAt` método heredado de [Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt), entonces le puedes pasar los coordinados al componente así:

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
