# WIP
<!-- # Instancias

La idea principal de **Tres** es un _catálogo autogenerado_ de todos los elementos de ThreeJS. Este catálogo se genera a partir del código fuente de ThreeJS, por lo que siempre está actualizado.

Cuando usas ThreeJS, necesitas importar los elementos que deseas utilizar. Por ejemplo, si quieres usar una `PerspectiveCamera`, necesitas importarla desde el paquete `three`:

```js
import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(45, width / height, 1, 1000)
```

Con **Tres** no necesitas importar nada, esto se debe a que **Tres** genera automáticamente un **Componente Vue basado en el objeto Three que deseas usar en CamelCase con un prefijo Tres**. Por ejemplo, si quieres usar una `PerspectiveCamera`, puedes usar el componente `<TresPerspectiveCamera />`.

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

Esto significa que puedes utilizar la misma [documentación](https://threejs.org/docs/) que usarías al utilizar ThreeJS básico, pero con el poder de Vue.

## Declarando objetos

Si seguimos este argumento, deberías poder definir una instancia de esta manera: ❌

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="new THREE.Vector3(1, 2, 3)"
    />
  </TresCanvas>
</template>
```

Pero con **Tres** esto no es necesario, puedes definir las propiedades de forma declarativa de la siguiente manera: ✅

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      visible
      :position="[1, 2, 3]"
    />
  </TresCanvas>
</template>
```

## Argumentos

Algunos objetos de ThreeJS tienen argumentos, por ejemplo, el constructor `PerspectiveCamera` tiene los siguientes argumentos:

- `fov` - Campo de visión vertical de la cámara.
- `aspect` - Relación de aspecto del frustum de la cámara.
- `near` - Plano cercano del frustum de la cámara.
- `far` - Plano lejano del frustum de la cámara.

Para pasar estos argumentos al componente `TresPerspectiveCamera`, puedes usar la propiedad `args`:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
  </TresCanvas>
</template>
```

Esto es lo mismo que hacer esto:

```ts
const camera = new PerspectiveCamera(45, 1, 0.1, 1000)
```

## Propiedades

También puedes pasar propiedades al componente, por ejemplo, el `TresAmbientLight` tiene una propiedad `intensity`, por lo que puedes pasarla al componente de la siguiente manera:

```html
<TresAmbientLight :intensity="0.5" />
```

### Establecer

Todas las propiedades cuyo objeto subyacente tiene un método `.set()` tienen un atajo para recibir el valor como un array. Por ejemplo, el `TresPerspectiveCamera` tiene una propiedad `position`, que es un objeto `Vector3`, por lo que puedes pasarlo al componente de esta manera:

```html
<TresPerspectiveCamera :position="[1, 2, 3]" />
```

Para especificar propiedades de transformación como posición, rotación y escala, hay una forma abreviada disponible que te permite indicar directamente el eje que deseas establecer dentro de las propiedades. Una forma abreviada similar también está disponible para la propiedad de color.

```html
<TresMesh :position-x="1" :scale-y="2" :rotation-x="Math.PI * 2">
  <TresMeshBasicMaterial :color-r="0.7" :color-b="0.3" />
</TresMesh>
```

::: warning
Cuando estableces la propiedad de rotación en [three.js](https://threejs.org/docs/index.html#api/en/math/Euler), se utilizará el orden 'XYZ' de forma predeterminada.
Es importante tener en cuenta que al establecer la propiedad de rotación con la forma abreviada, el orden en el que estableces los ángulos importa. Para obtener más información sobre este tema, consulta [Ángulos de Euler](https://es.wikipedia.org/wiki/%C3%81ngulos_de_Euler)
:::

```vue
<TresMesh :rotation-x="1" :rotation-y="2" :rotation-z="Math.PI * 2" />

<TresMesh :rotation-z="Math.PI * 2" :rotation-x="1" :rotation-y="2" />
```

### Escalar

Otro atajo que puedes usar es pasar un valor escalar a una propiedad que espera un objeto `Vector3`, usando el mismo valor para el resto del vector:

```html
<TresPerspectiveCamera :position="5" /> ✅
```

```html
<TresPerspectiveCamera :position="[5, 5, 5]" /> ✅
```

### Colores

Puedes pasar colores a los componentes usando la propiedad `color`, la cual acepta un string con el nombre del color o un valor hexadecimal:

```html
<TresAmbientLight color="teal" /> ✅
```

```html
<TresAmbientLight color="#008080" /> ✅
```

### Métodos

Algunas propiedades subyacentes son en realidad métodos, el `TresPerspectiveCamera` tiene un método `lookAt` heredado de [Object3d](https://threejs.org/docs/#api/en/core/Object3D.lookAt), por lo que puedes pasarle las coordenadas al componente de esta manera:

```html
<TresPerspectiveCamera :look-at="[1, 2, 3]" />
``` -->
