# Mise en garde 😱

Notre objectif est de fournir un moyen simple d'utiliser ThreeJS dans VueJS avec la meilleure expérience de développement possible. Cependant, vous devez être conscient de certaines mises en garde.

## ~~HMR et ThreeJS~~

:::info

Cela a été corrigé dans **TresJS** v1.7.0 🎉. Vous pouvez désormais utiliser HMR sans avoir à recharger la page 🥹.

:::

## Réactivité

Nous aimons tous la réactivité 💚. C'est l'une des fonctionnalités les plus puissantes de VueJS. Cependant, il faut être prudent lors de l’utilisation de ThreeJS.

La réactivité de Vue est basée sur [Proxy](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Cela permet à Vue 3 de suivre automatiquement les modifications apportées aux objets de données et de mettre à jour les éléments DOM correspondants chaque fois que les données changent.

Puisque nous rendons une scène et la mettons à jour à chaque image (60 FPS), cela signifie que nous mettons à jour la scène 60 fois par seconde. Si l'objet à mettre à jour est réactif, Vue tentera de mettre à jour cet objet autant de fois. Ce n'est pas une bonne idée 😅 et cela nuira aux performances.

Voici un test de performances de la différence entre l'utilisation d'un objet Proxy et d'un objet plat.

<figure>
  <img src="/proxy-benchmark.png" alt="Proxy vs Plain" style="width:100%">
  <figcaption>Fig.1 - Exécutions par seconde Objet plat vs proxy. </figcaption>
</figure>

Source: [Proxy vs Plain Object](https://www.measurethat.net/Benchmarks/Show/12503/0/object-vs-proxy-vs-proxy-setter)

Si vous êtes obligé d'utiliser la réactivité, utilisez [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

Contrairement à `ref()`, la valeur interne d'une shallowRef est stockée et exposée telle quelle, et aucune réactivité profonde n'est effectuée. Seul l'accès à `.value` est réactif.
 Source [VueJS Docs](https://vuejs.org/api/reactivity-advanced.html#shallowref)

### Exemple

❌ Incorrect

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

✅ Correct

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
