---
title: Charger des textures
description: Ajoutez des texture à vos objets TresJS.
author: alvarosabu
thumbnail: /recipes/load-textures.png
difficulty: 1
---

# Charger des textures

> Toutes les textures utilisées dans cet exemple proviennent de [ambientcg](https://ambientcg.com/).

Les textures tridimensionnelles (3D) sont des images contenant plusieurs couches de données, leur permettant de représenter du volume ou de simuler des structures tridimensionnelles. Ces textures sont couramment utilisées dans les graphiques 3D et les effets visuels pour améliorer le réalisme et la complexité des scènes et des objets.

<SandboxDemo url="https://play.tresjs.org/#eNq9Vm1PGzkQ/itW7gNBJbvhVVWOVBToVb2DgoBvTVU5u5PE4LUt25uQi3K/5X7L/bIb27tZB1qUfqAgRcnj8TPPjMfjWbTuNJj3SiXTElq91rHJNFOWGLClIpyKcX/QsmbQejcQrFBSW3IHj7bUkJ9SzslIy4JsJWkMOqqt31f2C+JcnFExpYYsqx0nFrF7k2ZSr9te6SGzZ1JYLfl3zBkIK43b4f6P0yAXxeEPC4Xi1AL+IuS4cep+EpJxoLqTSS41hvTb273z07PDQSssmgnN5ayypFxNaPg6YwLxjmF/QwCUnIHuKA0j0CAyQKoJG086CvRI6oIi5DidsZeBQtYjSmvY6bsGbRRklk3hjBagK6+E9JQ0zDIpkP/L7g7Z2yGHX2uxuDySU1w5WOlHiHomRHcjUGDMCHWTGBx5bLfb7dZgLQpl3ZbII0xIYoWtnXhkmz4z9lGdM+1ikoLyC8yNXY+m66M5wGhIjwmL25md48IeAhk1thPOovJznDbniMBxGh1ya6cVyqZTUJXcGymwgBdu16BawLrtEY84LK45t4BHZ60yvTTNcoH7c+BsqhMBNhWqSGPzk/3kMOmmOTM2dTBaD1o7z4hDdf4Md9iB9EcxfQWve7EzoA+Kik20r2xPDhI8/Iq5BpOCuT0x90TDRrzO7gQZD9+i3jdgijgNeO9LAxvnNzI/2e36BON1g8ekWM9uZYd1gTX4E8Rhw0vUaNjJoWAbkNamLviD5CjlbBhTOsblQCyxJq3JpBix8ZOKzGShGAd9pdxNWK9MvFdy9qfHrC5hpS+bQPbwHfzePAbJ11gsoKeY7uYoqR6DDcsfbj/j1Y0WC5mXvDqcHyzegJG8dBqD2WkpcpQd2Xm1n/wFY2J8Zz48+ltcBbUm1M4VePRL3SFWtRaArz5x3t4fx9kLWWoi20/2o4Q/fXs2e8YWBJv46oGpnqxoFSuoIt5x328AD1tfSKl++IYNBB68sUQNdbWT9AmdUWYjsrYPBxtWj2zVBafpLBkzOymHaKeRBPNpEywY3/zQAzUYiEkLygQ2QM9j0iGn2UNHy+whvcGP7v7ht72/vp0zg/0xg8JR3Kvxls8t3v8Veom+Q0p/oQAty/FEgDGv7P2m9tO4Fu5d5q/s97N38vGicUuLoeviV1nGS3c5XtP7+ye+ahXL7agsjZrgzHKDRd93pd8WJefxursQpiyw3KWo6ry/XvntYD4QwaDdXhDskpaS5TbpvwsXNU3JJxybcFDQpSDUEpiCnuONwfmG/PPfv0fdP65vSTsHHBxybB9EjshclpoUUjAr9bYjYSPSXslNppSXsF33gSd4oqWlrlckc/KmH/SgytAcnN4XZsRqXrkEM3EZwRaxInfTickodwMezk7xZLI2GeH2W7/nI8gCLEbawy5lqrENZyz/4YadZm6K3N5aKnKq80uUpBnljYn7m3aG+MQgV9NRmjEu/MUXu1ML7iY4TDV2q5HTV5Zz+2ySWv4PY68KvA==" />

Il existe deux façons de charger des textures 3D dans TresJS :

## Avec `useLoader`

Le composable `useLoader` vous permet de transmettre tout type de loader three.js et une URL pour charger la ressource. Renvoie une « Promesse » avec la ressource chargée.

Pour une explication détaillée de la façon d'utiliser `useLoader`, consultez la documentation [useLoader](/api/composables#use-loader).

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

const texture = useLoader(TextureLoader, '/Rock035_2K_Color.jpg')
```

Ensuite vous pouvez passer la texture à un matériau :

```html
<Suspense>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry :args="[1,32,32]" />
      <TresMeshStandardMaterial :map="texture" />
    </TresMesh>
  </TresCanvas>
</Suspense>
```

Notez dans l'exemple ci-dessus que nous utilisons le composant `Suspense` pour envelopper le composant `TresCanvas`. En effet, `useLoader` renvoie une `Promise` et nous devons attendre qu'elle soit résolue avant de restituer la scène.

## Avec `useTexture`

Un moyen plus pratique de charger des textures consiste à utiliser le composable `useTexture`. Accepte à la fois un tableau d'URL et un seul objet avec des chemins de texture mappés.

Pour plus d'informations sur `useTexture`, consultez la documentation [useTexture](/api/composables#use-texture).

```ts
import { useTexture } from '@tresjs/core'

const pbrTexture = await useTexture({
  map: '/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap: '/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap: '/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap: '/textures/black-rock/Rock035_2K_NormalDX.jpg',
  aoMap: '/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
  metalnessMap: '/textures/black-rock/myMetalnessTexture.jpg',
  matcap: '/textures/black-rock/myMatcapTexture.jpg',
  alphaMap: '/textures/black-rock/myAlphaMapTexture.jpg'
})
```
Semblable à l'exemple précédent, nous pouvons transmettre toutes les textures à un matériau via des accessoires :

```html
<Suspense>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry :args="[1,32,32]" />
      <TresMeshStandardMaterial
        :map="pbrTexture.map"
        :displacementMap="pbrTexture.displacementMap"
        :roughnessMap="pbrTexture.roughnessMap"
        :normalMap="pbrTexture.normalMap"
        :aoMap="pbrTexture.ambientOcclusionMap"
      />
    </TresMesh>
  </TresCanvas>
</Suspense>
```
