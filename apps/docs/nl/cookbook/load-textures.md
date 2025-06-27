---
title: Textures laden
description: Voeg texture maps toe aan je TresJS objects.
author: alvarosabu
thumbnail: /recipes/load-textures.png
difficulty: 1
---

# Textures laden

> Alle textures uit dit voorbeeld zijn van [ambientcg](https://ambientcg.com/).

Driedimensionale (3D) texturen zijn afbeeldingen die meerdere gegevenslagen bevatten, waardoor ze volume kunnen weergeven of driedimensionale structuren kunnen simuleren. Deze texturen worden vaak gebruikt in 3D graphics en visuele effecten om het realisme en de complexiteit van scènes en objecten te verbeteren.

<SandboxDemo url="https://play.tresjs.org/#eNq9Vm1PGzkQ/itW7gNBJbvhVVWOVBToVb2DgoBvTVU5u5PE4LUt25uQi3K/5X7L/bIb27tZB1qUfqAgRcnj8TPPjMfjWbTuNJj3SiXTElq91rHJNFOWGLClIpyKcX/QsmbQejcQrFBSW3IHj7bUkJ9SzslIy4JsJWkMOqqt31f2C+JcnFExpYYsqx0nFrF7k2ZSr9te6SGzZ1JYLfl3zBkIK43b4f6P0yAXxeEPC4Xi1AL+IuS4cep+EpJxoLqTSS41hvTb273z07PDQSssmgnN5ayypFxNaPg6YwLxjmF/QwCUnIHuKA0j0CAyQKoJG086CvRI6oIi5DidsZeBQtYjSmvY6bsGbRRklk3hjBagK6+E9JQ0zDIpkP/L7g7Z2yGHX2uxuDySU1w5WOlHiHomRHcjUGDMCHWTGBx5bLfb7dZgLQpl3ZbII0xIYoWtnXhkmz4z9lGdM+1ikoLyC8yNXY+m66M5wGhIjwmL25md48IeAhk1thPOovJznDbniMBxGh1ya6cVyqZTUJXcGymwgBdu16BawLrtEY84LK45t4BHZ60yvTTNcoH7c+BsqhMBNhWqSGPzk/3kMOmmOTM2dTBaD1o7z4hDdf4Md9iB9EcxfQWve7EzoA+Kik20r2xPDhI8/Iq5BpOCuT0x90TDRrzO7gQZD9+i3jdgijgNeO9LAxvnNzI/2e36BON1g8ekWM9uZYd1gTX4E8Rhw0vUaNjJoWAbkNamLviD5CjlbBhTOsblQCyxJq3JpBix8ZOKzGShGAd9pdxNWK9MvFdy9qfHrC5hpS+bQPbwHfzePAbJ11gsoKeY7uYoqR6DDcsfbj/j1Y0WC5mXvDqcHyzegJG8dBqD2WkpcpQd2Xm1n/wFY2J8Zz48+ltcBbUm1M4VePRL3SFWtRaArz5x3t4fx9kLWWoi20/2o4Q/fXs2e8YWBJv46oGpnqxoFSuoIt5x328AD1tfSKl++IYNBB68sUQNdbWT9AmdUWYjsrYPBxtWj2zVBafpLBkzOymHaKeRBPNpEywY3/zQAzUYiEkLygQ2QM9j0iGn2UNHy+whvcGP7v7ht72/vp0zg/0xg8JR3Kvxls8t3v8Veom+Q0p/oQAty/FEgDGv7P2m9tO4Fu5d5q/s97N38vGicUuLoeviV1nGS3c5XtP7+ye+ahXL7agsjZrgzHKDRd93pd8WJefxursQpiyw3KWo6ry/XvntYD4QwaDdXhDskpaS5TbpvwsXNU3JJxybcFDQpSDUEpiCnuONwfmG/PPfv0fdP65vSTsHHBxybB9EjshclpoUUjAr9bYjYSPSXslNppSXsF33gSd4oqWlrlckc/KmH/SgytAcnN4XZsRqXrkEM3EZwRaxInfTickodwMezk7xZLI2GeH2W7/nI8gCLEbawy5lqrENZyz/4YadZm6K3N5aKnKq80uUpBnljYn7m3aG+MQgV9NRmjEu/MUXu1ML7iY4TDV2q5HTV5Zz+2ySWv4PY68KvA==" />

Er zijn twee manieren om 3D textures te laden in TresJS:

## Middels `useLoader`

Met de  `useLoader` composable kunt u elk type three.js-lader en een URL doorgeven waaruit de bron kan worden geladen. Het returned een `Promise` met de geladen bron.

Voor een gedetailleerde uitleg over het gebruik van `useLoader`, bekijk de [useLoader](/nl/api/composables#use-loader) documentatie.

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

const texture = useLoader(TextureLoader, '/Rock035_2K_Color.jpg')
```

Dan kun je de texture naar een materiaal sturen:

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

Merk op dat we in het bovenstaande voorbeeld de component `Suspense` gebruiken om de component `TresCanvas` te wrappen. Dit komt omdat `useLoader` een `Promise` returned en we moeten wachten tot dit is resolved voordat de scène wordt weergegeven.

## `useTexture`gebruiken

Een gemakkelijkere manier om texturen te laden is het gebruik van de `useTexture` composable. Het accepteert zowel een reeks URL's als een enkel object waarvan de textuurpaden in kaart zijn gebracht.

Voor meer informatie over `useTexture`, bekijk de [useTexture](/nl/api/composables#use-texture) documentatie.

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
Net als in het vorige voorbeeld kunnen we alle texturen via props aan een materiaal doorgeven:

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
