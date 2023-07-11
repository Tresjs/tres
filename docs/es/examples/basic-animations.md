# Animaciones Básicas

Esta guía te ayudará a empezar con animación básica en TresJS.

Vamos a construir una escena sencilla con un cubo simple. Puesto que animamos el cubo para girar de ejes Y y Z.

<StackBlitzEmbed projectId="tresjs-basic-animations" />

## useRenderLoop

El `useRenderLoop` composable es el core de TresJS animaciones. Te permites registrar un callback que se llamará cada vez el renderer actualiza la escena con el ritmo de actualizar del navegador.

Para ver una explanación en detalle de como funciona, por favor consulta al [useRenderLoop](/api/composables#userenderloop) documentación.

```ts
const { onLoop, resume } = useRenderLoop()

resume()
onLoop(({ _delta, elapsed }) => {
  // Operará a cada frame ~ 60FPS (depende de tu pantalla)
})
```

## Traer la referencia al cubo

Para animar el cubo, necesitamos traer una referencia. Podemos hacer eso al pasar un [Template Ref](https://vuejs.org/guide/essentials/template-refs.html) usando `ref` prop al `TresMesh` componente. Eso volverá el THREE instance.

Para mejorar el rendimiento, usaremos un [Shallow Ref](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) to store la referencia en lugar de un Ref regular. Ve porque [aquí](../advanced/caveats.md#reactivity)

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

## Animar el cubo

Ahora que tenemos una referencia al cubo, podemos animarlo. Usaremos el `onLoop` callback para actualizar la rotación del cubo.

```ts
onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

También puedes usar el `delta` de la internal [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) o el `elapsed` para animar el cubo.

## ¿Pero porque no usar la reactividad de vue?

la respuesta es simple, rendimiento

```vue
// This is a bad idea ❌
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRotation = reactive([0, 0, 0])

onLoop(({ delta, elapsed }) => {
  boxRotation[1] += delta
  boxRotation[2] = elapsed * 0.2
})
</script>
```

Podríamos sentirnos tentados a usar la reactividad de vue para animar el cubo. Pero eso sería una mala idea, esta es la razón [Vue's reactivity is based on Proxies](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue). Los proxies no están diseñados para ser usados en el renderloop que se actualiza cada 60 frames por segundo o mas

Adjuntamos los benchmark sobre este caso [benchmark of a proxy vs a regular object](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). Como puedes ver los proxies son 5 veces mas lentos que objetos normales
<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

Puedes leer a detalle aquí [Caveats](../advanced/caveats.md#reactivity).
