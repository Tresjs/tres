# Basic Animations

Esta guía te ayudará a comenzar con animaciones básicas en TresJS.

Construiremos una escena simple con un cubo. Luego animaremos el cubo para que rote alrededor del eje Y y Z.

<SandboxDemo url="https://play.tresjs.org/#eNqVVF1P2zAU/StW9kAZbVI+hTqKOjo0bRofYrwRHkxy2xoc27KdtlD1v+8mTloHBipSH5rjc889vh9eBLcazHelwmkOQS84MYlmyhIDNleEUzHux4E1cXAaC5YpqS1ZEDOhnMvZDYzIkoy0zMgWRm998yiF6pCKKTVtkhu4AZGC/iOlWkUMLFIeTZRI3Qy90g/MDqWwWnLzls5AWGmKiFgkUhhLHuS8sNL3fLVEzvm2x1kQKar0/aahlqO541ZrQVLglrYJcKoMpGS5TfqnZBELQtiItFyycEp5DtsOJpUDB4ZaWmqZFOEz2ek7NczwPu0FHdXJvpJuuFeyl7FYFs5OItcRrD9+WMgUpxbwi5CTdZFJwoHqTiK51NiwL8d7P86Gh3FQlCSVM0MoVxNKZkzgV8ewF6eAGs1qRxVciV+DNgoSy6YwpBloWp8S0lPSsMI/prvbbZO9Njm8jwOPMJJTPDtAFx5ISz3EdxuwQPcIdsMmPCrR3W63u4ZfWbwAMyEaRshz5cVL90xCObgkJKHGdlwZVpFV7Jmc/wSZgdXP6EyPTXWX4od38VJ5yS6lzii/wCZoRrlvJ6oprjvlp2sPAieR17ugHbhx72RUhY9GCly9cpbi6gA3rldPVxz4u1IcxMHEWmV6UZSkAuNxyNhUhwJsJFQW+fTBfngYdqOUGRsVMLLjoP1G2G3VZ7RdBMof+fIV3MxiZ0CfFBWbeF9xBwchjkOlXINhxooYX3uiYSPdgjdAxcNj9LsDJvPLgM8XPgob19ejD3a7ZYFxs2AeZs3qVjycPg3pJ4RdwEfSSOykkLENRGtqcfmD8Cji7MGXrB8bnElr8LEcsfGriUxkphgHfaWKfW9OZvng/i4xq3NY+UsmkDz9B380c2f5GocF9BTLvW4lriBYd3z+9xLm+H91mMk051Vz3jm8ASN5Xnh0tLNcpGjb45Vuf5ULxsT41pzPLQhTX6ph1D4rKNG7er9Xs+aA+7JwJb9sx/CDKq1vth/urwq+/AdyGHHw" />

## useRenderLoop

El composable `useRenderLoop` es el núcleo de las animaciones en TresJS. Te permite registrar una función de devolución de llamada que se ejecutará cada vez que el renderizador actualice la escena con la frecuencia de actualización del navegador.

Para obtener una explicación detallada de cómo funciona, consulta la documentación de [useRenderLoop](/api/composables#userenderloop).

```ts
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  // Se ejecutará en cada fotograma ~ 60FPS (dependiendo de tu monitor)
})
```

## Obteniendo la referencia al cubo

Para animar el cubo, necesitamos obtener una referencia a él. Podemos hacerlo pasando una [Referencia de Plantilla](https://vuejs.org/guide/essentials/template-refs.html) utilizando la propiedad `ref` en el componente `TresMesh`. Esto nos devolverá la instancia de THREE.

Para mejorar el rendimiento, utilizaremos una [Referencia Superficial](https://v3.vuejs.org/guide/reactivity-fundamentals.html#shallow-reactivity) para almacenar la referencia en lugar de una referencia regular. Puedes ver por qué [aquí](../advanced/caveats.md#reactivity)

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)
</script>

<template>
  <TresCanvas>
    <TresMesh
      ref="boxRef"
      :scale="1"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## Animando el cubo

Ahora que tenemos una referencia al cubo, podemos animarlo. Utilizaremos la devolución de llamada `onLoop` para actualizar la rotación del cubo.

```ts
onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

También puedes usar el `delta` del [reloj interno de THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock) o el `elapsed` para animar el cubo.

## ¿Pero por qué no usar la reactividad?

Es posible que te preguntes por qué no estamos usando la reactividad para animar el cubo. La respuesta es simple: rendimiento.

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

Podemos sentirnos tentados a usar la reactividad para animar el cubo. Pero sería una mala idea.
La razón es que [la reactividad de Vue se basa en Proxies](https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue) y no está diseñada para ser utilizada en un bucle de renderizado que se actualiza 60 o más veces por segundo.

La página incrustada a continuación muestra la [prueba de rendimiento de un proxy frente a un objeto regular](https://measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter). Como puedes ver, el proxy es 5 veces más lento que el objeto regular.

<EmbedExperiment src="https://measurethat.net/Embed?id=399142" />

Puedes leer más sobre esto en la sección de [Caveats](../advanced/caveats.md#reactivity).
