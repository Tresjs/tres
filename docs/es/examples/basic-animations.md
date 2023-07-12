# Animaciones Básicas

Esta guía te ayudará a empezar con las animación en TresJs.

Vamos a construir una escena sencilla con un simple cubo y animarlo en los ejes Y y Z.

<StackBlitzEmbed projectId="tresjs-basic-animations" />

## useRenderLoop

El `useRenderLoop` composable es el core de las animaciones en TresJs. Te permite registrar un callback que se llamará cada en cada frame.

Para ver una explicación en detalle de como funciona, por favor consulta al [useRenderLoop](/api/composables#userenderloop).

```ts
const { onLoop, resume } = useRenderLoop()

resume()
onLoop(({ _delta, elapsed }) => {
  // Operará a cada frame ~ 60FPS (depende de tu pantalla)
})
```

## Referenciando al cubo

Para animar el cubo, necesitamos usar una referencia. Podemos hacer eso al pasar un [Template Ref](https://vuejs.org/guide/essentials/template-refs.html) usando `ref` prop al `TresMesh` componente. Eso volverá la instancia THREE.

Para mejorar el rendimiento, usaremos un [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) para almacenar la referencia en lugar de un Ref regular. Mas información [aquí](../advanced/caveats.md#reactivity)

```vue
<script setup lang="ts">
const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)
</script>

<template>
  <TresMesh ref="boxRef" :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial v-bind="pbrTexture" />
  </TresMesh>
</template>
```

## Girar el cubo

Ahora que tenemos una referencia al cubo, podemos animarlo. Usaremos el `onLoop` callback para actualizar la rotación del cubo.

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

Puedes usar el `delta` [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) o el `elapsed` para animar el cubo.

## ¿Pero porque no usar la reactividad de vue?

la respuesta es simple, rendimiento

```vue
// Esto es una mala idea ❌
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRotation = reactive([0, 0, 0])

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta
  boxRotation[2] = elapsed * 0.2
})
</script>
```

Podríamos sentirnos tentados a usar la reactividad de VueJs para animar el cubo. Pero eso sería una mala idea, esta es la razón [Vue's reactivity is based on Proxies](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue). Los proxies no están diseñados para ser usados en el renderloop que se actualiza cada 60 frames por segundo o mas

Adjuntamos los benchmark sobre este caso [benchmark of a proxy vs a regular object](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). Como puedes ver los proxies son 5 veces mas lentos que objetos normales
<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

Puedes leer a detalle aquí [Caveats](../advanced/caveats.md#reactivity).
