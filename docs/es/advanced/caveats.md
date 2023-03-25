# Advertencias 😱

Nuestro intención es proveer una forma simple a usar ThreeJS en VueJS con la mejor experiencia posible por el desarrollador. Sin embargo, necesitas ser consiente de algunos advertencias. 

## HMR y ThreeJS

Hot module replacement (HMR) es una herramienta que te permite actualisar tu codigo sin recargar la página. Es una gran herramienta con que desarrollo está mucho más rápido. 
 **TresJS** usa [Vite](https://vitejs.dev/). Sin embargo,  que funciona correctamente con ThreeJS es difícil.

Por qué? por causa de Tres construye la escena en una forma declarativa. Eso significa que crea la instancia y la añade a la escena cuando el componente se monta. La complexidad es en conocer cuando hay que remover la instancia de la escena y cuando añadirla otra vez.

Aunque se implementa un flujo de trabajo de eliminación mínima, no es perfecto. Eso significa que algunas veces necesitarás recargar la página para correctamente ver los cambios, especialmente cuando estás haciendo referencia a una instancia que usa [Template Refs](https://v3.vuejs.org/guide/component-template-refs.html)

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
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```

Si haces un cambio en el `color` del componente `TresMeshStandardMaterial`, verás que el cambio se aplica pero ahora la rotación no está funcionando. Eso es porque la instancia es eliminada y construida otra vez.

:::consejo
Como una **regla de oro** debes recargar la página cada vez que no ves los cambios que lo has hecho.
:::

That being said
Dicho eso, por eso estamos trabajando en una solución mejor 😁. Si tienes cualquier idea como resolver eso, por favor, dinos.  


Puedes seguir la conversación en [HMR Disposal Discussion](https://github.com/Tresjs/tres/issues/23)

## Reactivad

Todos nosotros amamos reactivad 💚. Es uno de las funcionas más poderoso de VueJS. Sin embargo, de lo necesitamos ser consciente cuando usamos ThreeJS.

Al base de la reactivad Vue es [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). se permita VueJS a monitorizar cambio a los objetos de datos automáticamente y actualizar los elementos DOM que corresponde cada vez que los datos cambian.

Dado que estamos renderizando una escena y actualizándola en cada frame (60FPS), lo significa que estamos actualizando la escena 60 veces cada segundo. Si el objeto para ser actualizado es reactivo, Vue intentará actualizar el objeto está número de veces. eso no es un buen idea 😅 y estará dañino para rendimiento.

Aquí es un benchmark de la diferencia entre usar un objeto Proxy y un objeto simple.

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - Executions per second Plan Object vs Proxy. </figcaption>
</figure>

Fuente: [Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

Si hay que usar reactivad, usa [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

A diferencia de `ref()`, el valor interior de un shallow ref se guardado y revelado tal cual, y no será profundamente reactivo. Solo el .value acceso es reactivo. Fuente [VueJS Docs](https://vuejs.org/api/reactivity-advanced.html#shallowref)

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
  <TresMesh :position="position" cast-shadow>
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
  <TresMesh ref="boxRef" :position="position" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="teal" />
  </TresMesh>
</template>
```
