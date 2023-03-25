# Instancias

La idea principal de **TresJs** es la de un _catálogo auto-generado_ de todos los elementos de ThreeJS. Este catálogo se genera del código fuente de ThreeJS, entonces siempre está actualizado.

Cuando usas ThreeJS, necesitas importar los elementos que quieres usar. Por ejemplo, si quieres usar un `PerspectiveCamera`, necesitas importarlo de paquete `three`:

```js
import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(45, width / height, 1, 1000)
```

Con **TresJs** no necesitas importar nada, eso es porque **Tres** genera automáticamente un **Componente de Vue basado en los objetos de ThreeJs en CamelCase con un prefijo Tres**. Por ejemplo, si quieres usar un `PerspectiveCamera` usarías el componente `<TresPerspectiveCamera />` .

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

Se significa que puedes usar la misma [documentación](https://threejs.org/docs/) que usarías cuando usas ThreeJS puro, pero con el poder de Vue.

## Declarar objetos

Si continuamos esta argumento, podrías ordenar una instancia así: ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="new THREE.Vector3(1, 2, 3)" />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

Pero con **TresJs** no es necesario, puedes definer propiedades declarativamente así: ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera visible :position="[1, 2, 3]" />
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

## Argumentos

Algunos objetos de ThreeJS tienen argumentos, por ejemplo, el constructor `PerspectiveCamera` tiene los argumentos siguientes:

- `fov` - Cámara vertical del campo de visión.
- `aspect` - Aspect-ratio de la cámara.
- `near` - Cámara plano de cercanía.
- `far` - Cámara plano de cuan lejos.

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

Todas las propiedades de los objetos 3D que se pueden configurar con un `.set()` tienen un atajo para recibir el valor como un array. Por ejemplo, el `TresPerspectiveCamera` tiene una propiedad `position`, lo cual es un objeto `Vector3`, entonces puedes pasarla al componente así:

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

### Escalar

Otro atajo que puedes usar es pasar un valor scale a una propiedad que espera un objeto `Vector3`, usando el mismo valor por el resto del vector:

```html
<TresPerspectiveCamera :scale="5" /> ✅
```

```html
<TresPerspectiveCamera :scale="[5, 5, 5]" /> ✅
```

### Colores

Puedes pasar colores a los componentes usando el `color` prop, que acepta un string con el nombre del color o un valor hex:

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### Métodos

Ademas, algunas propiedades son métodos, el `TresPerspectiveCamera` tiene un `lookAt` método heredado de [Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt), entonces le puedes pasar las coordinadas al componente así:

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
```
