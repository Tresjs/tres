# Avisos 😱

Nuestro objetivo es proporcionar una forma sencilla de utilizar ThreeJS en VueJS con la mejor experiencia de desarrollo posible. Sin embargo, hay algunas advertencias de las que debes ser consciente.

## ~~HMR y ThreeJS~~

:::info

Esto se ha solucionado en **TresJS** v1.7.0 🎉. Ahora puedes utilizar HMR sin tener que recargar la página 🥹.

:::

La sustitución de módulos en caliente (HMR) es una característica que te permite actualizar tu código sin recargar la página. Esta es una gran característica que hace que el desarrollo sea mucho más rápido. **TresJS** utiliza [Vite](https://vitejs.dev/). Sin embargo, es realmente complicado hacer que funcione correctamente con ThreeJS.

¿Por qué? Porque Tres construye la escena de forma declarativa. Esto significa que crea la instancia y la añade a la escena cuando se monta el componente. La complejidad radica en saber cuándo quitar la instancia de la escena y cuándo añadirla de nuevo.

Aunque se ha implementado un flujo de eliminación mínimo, no es perfecto. Esto significa que a veces tendrás que recargar la página para ver los cambios correctamente, especialmente cuando estás haciendo referencia a instancias utilizando [Template Refs](https://v3.vuejs.org/guide/component-template-refs.html)

```vue
<script setup lang="ts">
const boxRef: Ref<TresInstance | null> = ref(null)

onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
</script>

<template>
  <TresMesh
    ref="boxRef"
    :scale="1"
    cast-shadow
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

Si realizas un cambio en el `color` del componente `TresMeshStandardMaterial`, verás que el cambio se aplica pero la rotación ya no funciona. Esto se debe a que la instancia se elimina y se crea de nuevo.

:::tip
Entonces, como **regla general**, debes recargar la página cuando no veas los cambios que has realizado.
:::

Dicho esto, estamos trabajando en una mejor solución para esto 😁. Si tienes alguna idea de cómo resolverlo, por favor avísanos.

Puedes seguir la discusión en [HMR Disposal Discussion](https://github.com/Tresjs/tres/issues/23)

## Reactividad

Todos amamos la reactividad 💚. Es una de las características más poderosas de VueJS. Sin embargo, debemos tener cuidado al usar ThreeJS.

La reactividad de Vue se basa en [Proxy](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Esto permite que Vue 3 rastree automáticamente los cambios en los objetos de datos y actualice los elementos DOM correspondientes cada vez que los datos cambien.

Dado que estamos renderizando una escena y actualizándola en cada fotograma (60FPS), eso significa que estamos actualizando la escena 60 veces por segundo. Si el objeto a actualizar es reactivo, Vue intentará actualizar ese objeto tantas veces. Esto no es una buena idea 😅 y será perjudicial para el rendimiento.

Aquí tienes una prueba de rendimiento de la diferencia entre usar un objeto Proxy y un objeto plano.

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - Ejecuciones por segundo Objeto Plano vs Proxy. </figcaption>
</figure>

Fuente: [Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

Si te ves obligado a usar reactividad, utiliza [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

A diferencia de `ref()`, el valor interno de un shallow ref se almacena y se expone tal cual, y no se hace reactividad profunda. Solo el acceso a `.value` es reactivo. Fuente [VueJS Docs](https://vuejs.org/api/reactivity-advanced.html#shallowref)

### Ejemplo

❌ Incorrecto

```vue
<script setup lang="ts">
const position = reactive({ x: 0, y: 0, z: 0 })

onLoop(({ _delta, elapsed }) => {
  position.x = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh
    :position="position"
    cast-shadow
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

✅ Correcto

```vue
<script setup lang="ts">
const position = { x: 0, y: 0, z: 0 }
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)

onLoop(({ _delta, elapsed }) => {
  boxRef.value.position.x = Math.sin(elapsed * 0.1) * 3
})
</script>

<template>
  <TresMesh
    ref="boxRef"
    :position="position"
    cast-shadow
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```
