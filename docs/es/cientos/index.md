<script setup>
    import cientos from '../../packages/cientos/package.json'
</script>

# Cientos <Badge :text="`v${cientos.version}`" type="warning" vertical="middle" />

![Cientos banner](/cientos-banner.png)

> Cientos en una colección de ayudantes y componentes útiles y listos para usar que no son parte del [core](/guide/index.md) paquete. El nombre (que es en español) hace referencia al idea de multiplicar por 100, en referencia al alcance posible de paquete para soportar abstracciones increíbles. 

El `cientos` paquete usa el modulo [`three-stdlib`](https://github.com/pmndrs/three-stdlib) fuera de vista en lugar del modulo `three/examples/jsm` module. Eso significa que no necesitas extender el catálogo de componentes usando el método `extend` del composable [useCatalogue](/api/composables#useCatalogue) , `cientos` lo hace para tí.

Simplemente funciona. 💯

::: info
Para usar la biblioteca core, no es necesario usar esa paquete, pero puede mejorar mucho tu DX, especialmente por escenas compleja.
:::

## Instalación

```bash
npm install @tresjs/cientos -D
```

## Utilización básica

```ts
import { OrbitControls } from '@tresjs/cientos'
```

Ahora puedes usar el componente `OrbitControls` en tu escena.

```html
<template>
  <TresCanvas shadows alpha>
    <OrbitControls />
    <TresScene> ... </TresScene>
  </TresCanvas>
</template>
```

::: Precaución
Nota que no necesitas escribir el prefijo `Tres` tal como `<TresOrbitControl />` para usar el componente.
:::
