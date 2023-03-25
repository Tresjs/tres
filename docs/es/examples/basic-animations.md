# Animaciones Básicas

Esta guía te ayudará a empezar con animación básica en TresJS.

Vamos a construir una escena sencilla con un cubo simple. Pués animarmos el cubo para girar de ejes Y y Z.

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

Para animar el cubo, a lo necesitamos traer una referencia. Podemos hacer eso por pasar un [Template Ref](https://vuejs.org/guide/essentials/template-refs.html) usando `ref` prop al `TresMesh` componente. Eso volverá el THREE instance.

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

Ahora que tenemos una referecia al cubo, podemos animarlo. Usaremos el `onLoop` callback para actualizar la rotación del cubo.

```ts
onLoop(({ _delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
```

También puedes usar el `delta` de la internal [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) o el `elapsed` para animar el cubo.
